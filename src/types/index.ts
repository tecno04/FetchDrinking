import { z } from "zod"
import { CategoriesAPIResponseSchema, DrinkAPIResponse, RecipeAPIResponseSchema, ResponseFilterSchema, SearchFilterSchema } from "../schemas/recipes-schema";

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>

export type SearchFilters = z.infer<typeof SearchFilterSchema>

export type ResponseSearch = z.infer<typeof ResponseFilterSchema>

export type Drink = z.infer<typeof DrinkAPIResponse>

export type selectDrink = z.infer<typeof RecipeAPIResponseSchema>