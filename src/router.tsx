import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IndexPage } from "./pages/IndexPage";
import { Layout } from "./layouts/Layout";
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'))

/*
  Lazy y Suspense son herramientas de React para , que al momento de buildear el proyecto, generara un archivo encriptado por separado
  por cada componente que este cubierto por esto, para que al cargar la pagina y visite, solo descarga ese js, y no todo la pagina
  lo cual renderiza y optimiza su funcionamiento.

  Como observamos, empezamos el arbol de componentes con "<BroswerRouter></BroswerRouter>", todo lo que envuelva esto nos permitira
  configurar rutas para que el usuario pueda moverse por la app web (por eso consiguiente, tiene "<Routes></Routes>")

  Dentro de "Routes" ya empezamos a definir cada Ruta que el usuario podra moverse, ahora, para no repetir codigo constantemente con
  (ejemplo) un header o similar, en el "Route Padre" le decimos que su elemento (component) sera "Layout", donde aqui esta el header
  De esta forma, todo cambio que hagamos en el header, se replicara en las subsiguientes rutas que envuelven al Route Padre.

  El sub route que renderiza el index, fijarse que al final tiene la prop "index", esto sirve para avisarle a react, que esa ruta es el 
  index de la app

  En el otro, fijarse que en vez de empezar como "Route" sino que empieza con "Suspense", que ademas recibe un prop llamado
  "fallback" que es para que hasta que no cargo (en caso de que la red este lenta) muestre un mensaje o componente hasta que cargue
  Posteriormente, como children dentro del Suspense colocamos el Componente de FavoritePage
*/

export const AppRouter = () => {
  return (
    
    <BrowserRouter>
        <Routes>
            <Route element={ <Layout /> } >
                <Route path="/" element={ <IndexPage /> } index />
                <Route path="/favoritos" element={ 
                  <Suspense fallback="Cargando ...">
                    <FavoritesPage />
                  </Suspense>
                 } />
            </Route>
        </Routes>
    </BrowserRouter>


  )
}













