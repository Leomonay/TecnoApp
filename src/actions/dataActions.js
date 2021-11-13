export function updateData(data){
    return{
        type: 'UPDATE_DATA', // lo que activa mi acción
        payload: data // el contenido de datos que va 
    }
}

