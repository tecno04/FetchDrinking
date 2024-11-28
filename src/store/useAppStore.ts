import { create } from "zustand";
import { devtools } from "zustand/middleware"
import { createRecipeSlice, RecipesSliceType } from "./recipeSlice";
import { createFavoriteSlice, FavoritesSliceType } from "./favoritesSlice";
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";

/*
    exportamos y definimos el store principal, donde vemos que en el "create" recibimos un "...args" (que en los docs se coloca como "...a")
    estea argumento es una copia de todos los argumentos que recibe (o puede ) zustand:
    *set
    *get
    *api

    Como en el cuerpo del store Principal, estamos teniendo una copia de los stores "hijos" y a estos mismos, le estamos pasando los params
    antes mencionados (y no los esperan), va a dar error, por ende, lo que hacemos es, en el "create", le decimos que será del tipo
    "RecipesSliceType", "FavoritesSliceType" y "NotificationSliceType", para comunicarlos entre si y evitar el error

    Ademas envolvemos al store principal con devtools para poder usar las redux toolkit desde navegador para debugging
*/
export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationSliceType>()(devtools((...args) => ({
  
    ...createRecipeSlice(...args),
    ...createFavoriteSlice(...args),
    ...createNotificationSlice(...args)

})))