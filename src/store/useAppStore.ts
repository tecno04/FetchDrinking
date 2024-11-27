import { create } from "zustand";
import { createRecipeSlice, RecipesSliceType } from "./recipeSlice";
import { createFavoriteSlice, FavoritesSliceType } from "./favoritesSlice";

/*
    exportamos y definimos el store principal, donde vemos que en el "create" recibimos un "...args" (que en los docs se coloca como "...a")
    estea argumento es una copia de todos los argumentos que recibe (o puede ) zustand:
    *set
    *get
    *api

    Como la fn de "createRecipeSlice" no recibe argumentos, le decimos al create de zustand que sera 
    del tipo "RecipesSliceType" y con ello se soluciona la
    alerta del error
*/
export const useAppStore = create<RecipesSliceType & FavoritesSliceType>((...args) => ({
  
    ...createRecipeSlice(...args),
    ...createFavoriteSlice(...args)

}))