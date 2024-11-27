import { z } from "zod";

export const CategoriesAPIResponseSchema = z.object({
    drinks: z.object({
        strCategory: z.string()
    }).array()
})

export const SearchFilterSchema = z.object({
    ingredient: z.string(),
    category: z.string()
})

export const DrinkAPIResponse = z.object({
    idDrink: z.string(),
    strDrink: z.string(),
    strDrinkThumb: z.string()   
})

export const ResponseFilterSchema = z.object({
    drinks: z.object({
        idDrink: z.string(),
        strDrink: z.string(),
        strDrinkThumb: z.string()
    }).array()
})