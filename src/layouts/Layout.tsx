import { Outlet } from "react-router-dom"
import { Header } from "../Components/Header"

/*
    Outlet => Permite compartir todo lo que este en este archivo en lo que este envolviendo en el Route de Browser 
              En Components/router.tsx, en la parte de "<Route></Route>" tiene como prop "element={ <Layout /> }"
              esto significa que lo que este envuelto en este Route y todo lo que contenga layout, todas las demas paginas lo
              van a tener
*/

export const Layout = () => {
  return (
    <>
        <Header />
        <main className="container mx-auto py-16">
            <Outlet />
        </main>
    </>
  )
}
