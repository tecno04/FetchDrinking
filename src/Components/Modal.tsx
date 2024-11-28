import { Dialog, Transition } from '@headlessui/react';
import { Fragment} from 'react';
import { useAppStore } from '../store/useAppStore';
import { selectDrink } from "../types/index";

export default function Modal() {

  //desestructuramos las variables y fn necesarias desde el store Principal de Zustand
  const { modal, closeModal, selectedtRecipe, handleClickFavorite, favoriteExist } = useAppStore()

  //Fn para renderizar los ingredientes y medidas de la bebida seleccionada
  const renderIngredients = () => {
        
    //generamos una variable que sera del tipo array que a su vez es un JSX.Element del tipo array
    const ingredients : JSX.Element[] = []

    //vamos a recorrer un bucle, donde siga hasta que el indice sea menor o igual a 6 (ya que traemos 6 items de ingredientes o medidas)
    for (let i = 0; i <= 6; i++) {
        
      /*
        en la variable instanciada, usamos el type "selectedRecipe" donde en su indice vamos a colocar de forma estatica tal como
        viene en la API, pero el numero del mismo vamos a hacerlo de forma dinamica con el indice recorrido del bucle, y, a esto,
        vamos a decirle que sera de tipo llave como "selectDrink" (lo mismo hacemos con las medidas)
      */
      const ingredient = selectedtRecipe[`strIngredient${i}` as keyof selectDrink]
        
      const measure = selectedtRecipe[`strMeasure${i}` as keyof selectDrink]

      //SI, en ambas variables, hay datos (que no devuelvan un null)
      if(ingredient && measure){
          
        //vamos a agregar al array primeramente declarado, un <li></li> donde dentro ponemos el valor de ingredient y measure
        ingredients.push(
          <li key={i} className='text-lg font-normal'>
            {ingredient} - {measure}
          </li>
        )
      }
    }

    //Finalmente, retornamos el array
    return ingredients

  }

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => closeModal() }>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                  <Dialog.Title as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                      {selectedtRecipe.strDrink}
                  </Dialog.Title>

                    <img
                        src={selectedtRecipe.strDrinkThumb}
                        alt={selectedtRecipe.strDrink}
                        className='mx-auto w-96'
                    />

                  <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                    Ingredientes y Cantidades
                    
                    { renderIngredients() }

                  </Dialog.Title>
                  <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                    Instrucciones
                  </Dialog.Title>

                  <p className='text-lg'>{ selectedtRecipe.strInstructions }</p>

                  <div className='mt-5 flex justify-between gap-4'>
                    <button 
                        type='button' 
                        className='w-full rounded bg-gray-500 p-2 text-white hover:bg-gray-600 uppercase shadow'
                        onClick={() => closeModal()}
                    >
                        Cerrar
                    </button>
                    <button
                        type='button' 
                        className={ favoriteExist(selectedtRecipe.idDrink) ? "w-full rounded bg-red-500 p-2 text-white hover:bg-red-600 uppercase shadow" : "w-full rounded bg-orange-500 p-2 text-white hover:bg-orange-600 uppercase shadow" }
                        onClick={ () => handleClickFavorite(selectedtRecipe) }
                    >
                        { favoriteExist(selectedtRecipe.idDrink) 
                            ? 
                            "Eliminar de Favoritos " 
                            : 
                            "Agregar a Favoritos"
                        }
                    </button>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}