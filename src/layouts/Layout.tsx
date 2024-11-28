import { Outlet } from "react-router-dom"
import { Header } from "../Components/Header"
import Modal from "../Components/Modal"
import { useAppStore } from "../store/useAppStore"
import { useEffect } from "react"
import Notification from "../Components/Notification"

/*
    Outlet => Permite compartir todo lo que este en este archivo en lo que este envolviendo en el Route de Browser 
              En Components/router.tsx, en la parte de "<Route></Route>" tiene como prop "element={ <Layout /> }"
              esto significa que lo que este envuelto en este Route y todo lo que contenga layout, todas las demas paginas lo
              van a tener
*/

export const Layout = () => {

  //importamos con desestructuracion , la fn de carga de LS desde zustand
  const { loadFromLocalStorage } = useAppStore()

  //con useEffect, hacemos que al renderizar el component, se instancie dicha funcion
  useEffect(() => {
    loadFromLocalStorage()
  }, [loadFromLocalStorage])

  //Al final instanciamos los componentes de Modal y Notification, mostrar no se mostraran hasta que el usuario interactue con los datos

  return (
    <>
        <Header />
        <main className="container mx-auto py-16">
            <Outlet />
        </main>

        <Modal />

        <Notification />
        
    </>
  )
}
