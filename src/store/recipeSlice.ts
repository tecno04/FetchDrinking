import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService"
import { Categories, Drink, ResponseSearch, SearchFilters, selectDrink } from "../types"

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


export const createRecipeSlice : StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedtRecipe: {} as selectDrink,
    modal: false,
    fetchCategories : async() => {
        const categories = await getCategories()
        set({
           categories 
        })
    },
    searchRecipes: async(search) => {
        const drinks = await getRecipes(search)
        set({
            drinks
        })
    },
    selectRecipe: async(id) => {
        const selectedtRecipe = await getRecipeById(id)
        set({
            selectedtRecipe,
            modal: true
        })
    },
    closeModal : () => {
        set({
            modal: false,
            selectedtRecipe: {} as selectDrink
        })
    }
})