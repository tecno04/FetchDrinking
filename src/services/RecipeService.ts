import axios from "axios";
import { CategoriesAPIResponseSchema, RecipeAPIResponseSchema, ResponseFilterSchema } from "../schemas/recipes-schema";
import { Drink, SearchFilters } from "../types";

//Fn para obtener desde la API, las categorias de bebidas (es async)
export const getCategories = async() => {

    //guardamos en una variable, el endpoint que vamos a consultar
    const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"

    //desestructuramos data (que es parte de lo que va a devolver el ednpoint),de lo que devuelva axios de consultar la API
    const {data} = await axios(url)

    //guardamos en result, el parseo con el schema defininido en "../schemas" la data recibida
    const result = CategoriesAPIResponseSchema.safeParse(data)
    
    //SI, la validacion con zod, su prop "success" resuelve un true (significa que recibimos tal cual como esta en el schema)
    if(result.success){
        //retornamos la data
        return result.data
    }

}


/*
    exportamos y definimos la Fn del tipo async , que recibira el objeto con los datos para la busqueda
    (que serán del tipo "SearchFilters" definidos en "/types")
*/
export const getRecipes = async(filters: SearchFilters) => {
    
    //Guardamos en una variable el endpoint donde reemplazamos los params por los recibidos
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`

    //mismo que antes, desestructuramos la respuesta devolvida con axios
    const { data } = await axios(url)

    //validamos con el schema realizado con zod de la respuesta de "data"
    const response = ResponseFilterSchema.safeParse(data)

    //SI nos devuelve "true"
    if(response.success){

        //retornamos la data
        return response.data
    }

}

/*
  Fn para obtener desde la API info sobre una bebida en base a un ID (que sera del tipo lookup de Drink)
*/
export const getRecipeById = async(id:Drink['idDrink']) => {
    
    //guardamos en una variable, el endpoint a consultar, donde usamos template string para injectar el id recibido
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`

    //como siempre,desestructuramos de la respuesta de axios, "data"
    const { data } = await axios(url)
    
    //guardamos en result, la validacion con zod con el schema definido con data, pero, aca,accedemos a la prop "drinks" y su primer posicion (ya que se busca por ID, mas de un resultado no habrá) 
    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])

    //Si, la validacion da true
    if(result.success){
        
        //retornamos la data
        return result.data
    }

}