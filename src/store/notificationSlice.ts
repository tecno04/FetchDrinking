import { StateCreator } from "zustand";
import { FavoritesSliceType } from "./favoritesSlice";

//definimos el type de la notificacion
type Notification = {
    //tiene como cuerpo , una prop 'text' del tipo string, 'error' del tipo boolean (para cuando es un error mandar un true) y un 'show' tambien como boolean para mostrar
    text:string
    error: boolean
    show: boolean
}

/*
    Definimos y exportamos el type del store para Notificaciones.
    #notification: Va a ser del tipo "Notification" (type antes definido) almacena la info de la notificacion a mostrar
    #showNotification: Fn que recibe un payload, donde con "Pick" que permite elegir de un type, que queremos obtener, que en este caso
                       elegimos obtener 'text' y 'error' (ya que show lo pasaremos como true directamente)
    #hideNotification: Fn para cerrar el modal
*/
export type NotificationSliceType = {
    notification: Notification
    showNotification: (payload: Pick<Notification, 'text' | 'error'>) => void
    hideNotification: () => void
}

/*
    Definimos y exportamos el store para las Notificaciones, tiene misma definicion de type y params a recibir (menos api) que en "favoritesSlice"
*/
export const createNotificationSlice : StateCreator<NotificationSliceType & FavoritesSliceType, [], [], NotificationSliceType> = (set, get) => ({
    
    //definimos el prop "notification" a devolver que sera un objeto con sus props vacios o definicion boolean como false
    notification: {
        text:'',
        error: false,
        show: false
    },

    /*
        Fn para mostrar la notificacion, recibe un payload (objeto Notification) donde configuramos con el set
        el objeto notification, donde el texto y error sera lo que recibimos en el mismo (el show lo pasamos directamente en true para mostrar)
    */
    showNotification: (paylaod) => {
        set({
            notification: {
                text: paylaod.text,
                error: paylaod.error,
                show: true
            }
        })

        //definimos un "timeout" para cerrar la notificacion
        setTimeout(() => {
            get().hideNotification()
        }, 5000);

    },

    //Fn para cerrar la notificacion, configuramos con el set, el objeto initial de notification
    hideNotification: () => {
        set({
            notification: {
                text:'',
                error: false,
                show: false
            } 
        })
    }
})