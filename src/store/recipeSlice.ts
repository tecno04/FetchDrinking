import { StateCreator } from "zustand"
import { getCategories, getRecipes } from "../services/RecipeService"
import { Categories, Drink, ResponseSearch, SearchFilters } from "../types"

export type RecipesSliceType = {
    categories : Categories
    drinks: ResponseSearch
    fetchCategories: () => Promise<void>
    searchRecipes : (search: SearchFilters) => Promise<void>
    selectRecipe: (id: Drink['idDrink']) => Promise<void>
}


export const createRecipeSlice : StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
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
        console.log(id)
    }
})