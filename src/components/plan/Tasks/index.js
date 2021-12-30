import { useEffect, useState } from "react";
import DeviceFilters from "../../filters/DeviceFilters";
import LocationFilter from "../../filters/LocationFilter";

export default function PlanTask(props){
    const [location, setLocation] = useState({plantName: props.plant})
    
    useEffect(()=>setLocation({plantName: props.plant}), [props.plant])
    useEffect(()=>console.log('location', location), [location])

    return(
        <div>
            <div className="formRow">
                <b>Ubicación:</b>
                <LocationFilter plant={props.plant} select={(json)=>setLocation({...location,...json})}/>
            </div>
            <div>
            <DeviceFilters/>
            </div>
            <div>Lista de Equipos || Programa a asignar || Detalle de tarea</div>
            <div>Paginado</div>
            Ver de poner casillas de selección y un sólo botón de asignación abajo
        </div>
    )
}