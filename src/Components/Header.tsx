import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../store/useAppStore"
import { ErrorMessage } from "./ErrorMessage"

export const Header = () => {

    const { pathname } = useLocation()

    const isHome = useMemo(() => {
        return pathname === '/'
    }, [pathname])

    const { fetchCategories, searchRecipes, categories} = useAppStore()

    useEffect(() => {
        fetchCategories()

    }, [fetchCategories])

    const SearchInitialValue = {
        ingredient: "",
        category: ""        
    }

    const [searchFilters, setsearchFilters] = useState(SearchInitialValue)


    const [Error, setError] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>| ChangeEvent<HTMLSelectElement>) => {

        const { name, value } = e.target

        setsearchFilters({
            ...searchFilters,
            [name]: value
        })

    }

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        if(Object.values(searchFilters).includes('')){
            setError('Todos los campos son obligatorios')
            return
        }

        setError('')
        searchRecipes(searchFilters)

    }

    return (

        
        <header className={ isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800' }>

            <div className="mx-auto container px-5 -y-16 py-5">

                <div className="flex justify-between items-center">

                    <div>
                        <img className="w-32 py-10" src="/logo.svg" alt="logotipo" />
                    </div>

                    <nav className="flex gap-4">
                        
                        <NavLink 
                            to="/" 
                            className={({isActive}) => isActive ? "text-orange-500 uppercase font-bold" : "text-white uppercase font-bold"}>
                                Inicio
                        </NavLink>

                        <NavLink 
                            to="/favoritos" 
                            className={({isActive}) => isActive ? "text-orange-500 uppercase font-bold" : "text-white uppercase font-bold"}>
                                Favoritos
                        </NavLink>

                    </nav>
                    
                </div>

                { isHome && (
                    <form className="md:w-1/2 2xl:2-1/3 bg-orange-400 my-10 p-10 rounded-lg shadow space-y-6" onSubmit={handleSubmit}>

                        { Error && (<ErrorMessage>{Error}</ErrorMessage>) }

                        <div className="space-y-4">
                            <label htmlFor="ingredient" className="block text-white uppercase font-extrabold text-lg">Nombre o Ingredientes:</label>
                            <input 
                                type="text"
                                name="ingredient"
                                id="ingredient"
                                placeholder="Nombre ó Ingrediente"
                                className="p-3 rounded-lg w-full focus:outline-none"
                                value={searchFilters.ingredient}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-4">
                            <label htmlFor="ingredient" className="block text-white uppercase font-extrabold text-lg">Categoría:</label>
                            <select
                                name="category"
                                id="category"
                                className="p-3 rounded-lg w-full focus:outline-none"
                                onChange={handleChange}
                            >
                                <option value="">-- Seleccione --</option>
                                {
                                    Object.values(categories).length
                                    ?
                                    categories.drinks.map(category => (
                                        <option key={category.strCategory} value={category.strCategory} >
                                            {category.strCategory}
                                        </option>
                                    ))
                                    :
                                    <option value="">No se pudieron obtener las categorias, aguarde 3 minutos para recargar la pagina</option>
                                }
                            </select>

                        </div>

                        <input 
                            type="submit"
                            className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold uppercase w-full p-2 rounded-lg"
                            value="BUSCAR RECETAS"
                        />

                    </form>
                )}

            </div>

        </header>
    )
}
