import { StateCreator } from "zustand";
import { selectDrink } from "../types";
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";
import { RecipesSliceType } from "./recipeSlice";

/*
  Definimos el Type de este store para usar (tambien se usa en los otros store, por eso se exporta)
  #favorites: Es del tipo "selectDrink" que es del tipo array (almacena las bebidas marcadas como favoritas)
  #handleClickFavorite: Fn para agregar o eliminar el objeto de bebida marcado como fav
  #favoriteExist: Fn que devuelve true o false para saber si esa bebida YA esta marcada como fav (para no repetirla)
  #loadFromLocalStorage: Fn que devuelve (en caso de haber datos) del LocalStorage, las bebidas en fav
*/
export type FavoritesSliceType = {
    favorites : selectDrink[]
    handleClickFavorite : (recipe: selectDrink) => void
    favoriteExist: (id:selectDrink['idDrink']) => boolean
    loadFromLocalStorage: () => void
}

/*
   Definimos y exportamos el store de Favoritos, donde, con "StateCreator" lo instanciamos, y, en este caso se expande de una forma diferente:
   Establecemos que es del tipo "FavoritesSliceType", "RecipesSliceType" y "NotificationSliceType" 
   (que es para comunicar y poder utilizar las fn y propiedades de los otros store), pero ademas, vemos dos arrays vacios, esto es para ignorar o marcar
   como opcionales parametros que puede recibir, y en el cuerpo de params, recibimos los tres parametros que acepta zustand:
   *api
   *set
   *get
*/
export const createFavoriteSlice: StateCreator<FavoritesSliceType & RecipesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    
    //Al igual que en los otros store, aqui se almacenan las bebidas que se me arcan como fav, y sera del tipo array
    favorites: [],

    /*
      Fn para marcar/desmarcar como fav una bebida (recibe el objeto de la bebida elegida)
    */
    handleClickFavorite: (recipe) => {
        if(get().favorites.some(favorite => favorite.idDrink === recipe.idDrink)){
            
            /*
                Lo primero que vamos a hacer, es verificar con "get()" [sirve para acceder a todas las fn y props del store] y accedemos a la propiedad "favorites"
                y con el metodo "some" vamos a iterar cada favorito almacenado donde vamos a ver si alguno de los guardados con su ID, 
                coincide con el ID del objeto recibido
                En caso de alguno coincida, vamos a configurar en el set, con el state, que nos devuelva todos aquellos que NO coincida (elimina el que coincide)
            */
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink),
                modal: false
            }))

            /*
                y cerramos el modal pasando como prop "modal:false", y ademas instanciamos el store de Notificaciones (pasandole los tres params de zustand -- sino da error)
                y accedemos a la fn de "showNotification" para avisar al usuario que paso (recibe un objeto con dos props 'text' y 'error')
            */
            createNotificationSlice(set, get, api).showNotification(
                {
                    'text': 'Se descarto de Favoritos', 
                    'error' : false
                }
            )

        //Caso contrario no coincida con ninguno
        }else{
            //Lo que esta aca es otra forma de guardar los fav en el "favorites" (menos usado)
            // set({
            //     favorites: [...get().favorites, recipe]
            // })

            /*
              configuramos en el state en "favorites", primero, una copia con spread operator de lo que hay en favorites (por si hay mas guardados -- sino los pisaria)
              y luego adicionamos despues de la coma, lo recibido
              tambien pasamos el modal a false para que se cierre
            */
            set((state) => ({
                favorites: [...state.favorites, recipe],
                modal:false
            }))

            //Tambien mandamos la notificacion para avisar al usuario
            createNotificationSlice(set, get, api).showNotification(
                {
                    'text': 'Se adiciono a Favoritos', 
                    'error' : false
                }
            )

        }

        //agregamos al localStorage SOLO los favoritos que vamos adicionando al estado
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },

    /*
        Fn para validar si un favorito a agregar, YA esta adicionado (recibe un ID como param)
        Vamos a retornar con "get()" accediendo a "favorites", y la iteracion con "some" si alguno de los ya guardados, su id, coincide con el id recibido
        si devuelve true es que ya esta guardado, si devuelve false es que se puede adicionar
    */
    favoriteExist : (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },

    /*
        Fn para cargar desde el localStorage (si es que hay algo) los fav almacenados (los parseamos ya que fueron guardados como stringify)
    */
    loadFromLocalStorage: () => {
        const storeFavorites = localStorage.getItem('favorites')
        if(storeFavorites){
            set({
                favorites: JSON.parse(storeFavorites)
            })
        }
    }
})