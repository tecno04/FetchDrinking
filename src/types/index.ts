import { z } from "zod"
import { CategoriesAPIResponseSchema, DrinkAPIResponse, RecipeAPIResponseSchema, ResponseFilterSchema, SearchFilterSchema } from "../schemas/recipes-schema";

/* exportamos el type para Categorias donde con zod inferimos el tipo con el schema de Categorias */
export type Categories = z.infer<typeof CategoriesAPIResponseSchema>

/* exportamos el type para la busqueda de bebidas donde con zod inferimos el schema de Filtros de busqueda */
export type SearchFilters = z.infer<typeof SearchFilterSchema>

/* exportamos el type para la respuesta de la API de las bebidas consultadas, donde le inferimos con zod
   que sera del tipo de schema
*/
export type ResponseSearch = z.infer<typeof ResponseFilterSchema>

/* exportamos el type para el auto-completado mas que todo al renderizar la bebida, sera inferido su tipo con zod del schema (objeto) */
export type Drink = z.infer<typeof DrinkAPIResponse>

/* exportamos  el type donde vamos a inferir con zod que sera del tipo de schema para validar lo que devuelva al API
   al consultar la bebida seleccionada por ID
*/
export type selectDrink = z.infer<typeof RecipeAPIResponseSchema>