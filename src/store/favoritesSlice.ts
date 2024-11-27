import { StateCreator } from "zustand";
import { selectDrink } from "../types";

export type FavoritesSliceType = {
    favorites : selectDrink[]
    handleClickFavorite : (recipe: selectDrink) => void
    favoriteExist: (id:selectDrink['idDrink']) => boolean
    loadFromLocalStorage: () => void
}

export const createFavoriteSlice: StateCreator<FavoritesSliceType> = (set, get) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        if(get().favorites.some(favorite => favorite.idDrink === recipe.idDrink)){
            
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink),
                modal: false
            }))

        }else{
            // set({
            //     favorites: [...get().favorites, recipe]
            // })
            set((state) => ({
                favorites: [...state.favorites, recipe],
                modal:false
            }))
        }

        //agregamos al localStorage SOLO los favoritos que vamos adicionando al estado
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExist : (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    loadFromLocalStorage: () => {
        const storeFavorites = localStorage.getItem('favorites')
        if(storeFavorites){
            set({
                favorites: JSON.parse(storeFavorites)
            })
        }
    }
})