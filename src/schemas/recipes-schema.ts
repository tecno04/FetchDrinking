import { z } from "zod";

/*
  exportamos y configuramos el schema para validar la respuesta de la API de las categorias para las bebidas
  tiene un un objeto que dentro tiene un array y una prop llamada "strCategory"
  al final establecemos que debe ser un array para no hacerlo dentro del z.object y que sea mas legible
*/
export const CategoriesAPIResponseSchema = z.object({
    drinks: z.object({
        strCategory: z.string()
    }).array()
})

/*
Exportamos y definimos el schema para validar la busqueda de bebidas (params a enviar)
*/
export const SearchFilterSchema = z.object({
    ingredient: z.string(),
    category: z.string()
})

/*
   Exportamos y definimos el schema que vamos a validar de la respuesta de la API al buscar bebidas 
   (solo obtenemos el id, nombre y foto)
   Este schema se usa mas que todo para el auto-completado cuando renderizamos el componente "DrinkCard"
*/
export const DrinkAPIResponse = z.object({
    idDrink: z.string(),
    strDrink: z.string(),
    strDrinkThumb: z.string()   
})

/*
    Exportamos y definimos el schema para validar aca SI la respuesta de la API de las bebidas consultadas
    definimos que ademas es del tipo array
*/
export const ResponseFilterSchema = z.object({
    drinks: z.object({
        idDrink: z.string(),
        strDrink: z.string(),
        strDrinkThumb: z.string()
    }).array()
})

/*
    Exportamos y definimos el schema para validar la respuesta de la API al consultar la informacion de la bebida consultada por ID
    En este caso validamos toda la informacion (la mayoritaria) de los ingredientes y medidas
*/
export const RecipeAPIResponseSchema = z.object({
    idDrink: z.string(),
    strDrink: z.string(),
    strDrinkThumb: z.string(),
    strInstructions: z.string(),
    strIngredient1: z.string().nullable(),
    strIngredient2: z.string().nullable(),
    strIngredient3: z.string().nullable(),
    strIngredient4: z.string().nullable(),
    strIngredient5: z.string().nullable(),
    strIngredient6: z.string().nullable(),
    strMeasure1: z.string().nullable(),
    strMeasure2: z.string().nullable(),
    strMeasure3: z.string().nullable(),
    strMeasure4: z.string().nullable(),
    strMeasure5: z.string().nullable(),
    strMeasure6: z.string().nullable(),
})