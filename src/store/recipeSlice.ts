import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService"
import { Categories, Drink, ResponseSearch, SearchFilters, selectDrink } from "../types"

/*
    generamos un type (el cual exportamos ya que usaremos en otros archivos) 
    donde definimos:
    #categories: Es donde se almacenan las categorias consultadas (que será) del tipo "Categories"
    #drinks: Es donde se almacena la informacion de las bebidas consultadas , que es del tipo de schema "ResponseSearch"
    #selectedRecipe: Guarda la informacion de la bebida clickeada para ver su informacion - es del tipo de Schema de "selectDrink"
    #modal: Es la variable booleana para mostrar (o no) el modal con la informacion de la bebida
    #fetchCategories: Fn Que devuelve una Promesa donde devuelve las categorias de Bebidas desde la API
    #searchRecipes: Fn que devuelve una promesa y ademas recibe el objeto con los datos para consultar en la API la bebida buscadas
    #selectRecipe: Fn que devuelve una promesa y recibe un param del tipo "Drink['idDrink']" (lookup) para obtener la info de la bebida
    #closeModal: Fn que no devuelve nada para cerrar el modal
*/
export type RecipesSliceType = {
    categories : Categories
    drinks: ResponseSearch
    selectedtRecipe: selectDrink
    modal: boolean
    fetchCategories: () => Promise<void>
    searchRecipes : (search: SearchFilters) => Promise<void>
    selectRecipe: (id: Drink['idDrink']) => Promise<void>
    closeModal: () => void
}

/*Definimos y exportamos el store que manejara todo lo referido a las consultas hacia la API 
  Se usa el "StateCreator" para crearlo y se le define que sera del type antes definido y se recibe el param "set" de zustand
  para configurar en el state los valores a devolver
*/
export const createRecipeSlice : StateCreator<RecipesSliceType> = (set) => ({
    
    //categories recordar, es donde se almacenan las categorias recibidas por la API, definimos que en un principio, devuelve un array vacio
    categories: {
        drinks: []
    },

    //drinks, recordar, es donde se almacenan los resultados de la busqueda de bebidas por nombre y categoria, devolvemos en un principio, un array vacio
    drinks: {
        drinks: []
    },

    /*
        En esta variable recordar que es donde se almacena, la info de la bebida clickeada, en un principio, declaramos como objeto vacio, pero, lo casteamos
        como del tipo "selectDrink" ya que sino da un error porque sino dara que es del tipo "any" (y para TS 'any es veneno')
        establecemos que la variable modal sera del tipo false (para que no aparezca)
        instanciamos la Fn "fetchCategories" y definimos que sera una fn async (no recibe param) y como cuerpo guardamos lo que devuelva la fn
        "getCategories()" (para obtener las categorias que devuelva la API)
        Finalmente, con "set" configuramos en el state, lo que devuelva "categories"
        (devolvemos directamente "categories" en vez de "categories:categories" ya que es redundante, 
         y la variable que almacena la fn async que obtiene las categorias, tiene el mismo nombre
        )
    */
    selectedtRecipe: {} as selectDrink,
    modal: false,
    fetchCategories : async() => {
        const categories = await getCategories()
        set({
           categories 
        })
    },

    /*
        Fn que es del tipo async (recibe como param un objeto con los datos para buscar [ingredientes-categorias])
        guardamos en una variable, la instancia de obtener las bebidas en base al param recibido
        definimos en el state con "set" la variable "drinks" 
        (que a su vez como antes como "categories" no ponemos "drinks:drinks")
    */
    searchRecipes: async(search) => {
        const drinks = await getRecipes(search)
        set({
            drinks
        })
    },

    /*
        Fn del tipo async que recibe un id (que ya definimos en la firma del store anteriormente - arriba de todo - que es del tipo Drink lookup [Drink['idDrink']])
        guardamos en una variable, la instancia de la fn de obtener info de bebida por ID
        luego, como anteriormente, configuramos con "set", tanto la instancia anteriormente realizada como la variable del modal como "true" (para que se muestre)
    */
    selectRecipe: async(id) => {
        const selectedtRecipe = await getRecipeById(id)
        set({
            selectedtRecipe,
            modal: true
        })
    },

    //Fn para cerrar el modal, pasamos al set los valores de modal como "false" (para que se cierre) y "selectedRecipe" como objeto vacio para que quite la info del mismo
    closeModal : () => {
        set({
            modal: false,
            selectedtRecipe: {} as selectDrink
        })
    }
})