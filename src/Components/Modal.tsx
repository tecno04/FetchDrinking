import { Dialog, Transition } from '@headlessui/react';
import { Fragment} from 'react';
import { useAppStore } from '../store/useAppStore';
import { selectDrink } from "../types/index";

export default function Modal() {

    const { modal, closeModal, selectedtRecipe, handleClickFavorite, favoriteExist } = useAppStore()

    const renderIngredients = () => {
        
        const ingredients : JSX.Element[] = []

        for (let i = 0; i <= 6; i++) {
            const ingredient = selectedtRecipe[`strIngredient${i}` as keyof selectDrink]
            const measure = selectedtRecipe[`strMeasure${i}` as keyof selectDrink]

            if(ingredient && measure){
                ingredients.push(
                    <li key={i} className='text-lg font-normal'>
                        {ingredient} - {measure}
                    </li>
                )
            }
        }

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