import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDeviceOptions } from "../../../actions/deviceActions"
import {appConfig} from '../../../config'
import './index.css'
const {headersRef} = appConfig

export default function DeviceFilters(){
    const {deviceOptions} = useSelector(state=>state.devices)
    const dispatch = useDispatch()

    useEffect(()=>dispatch(getDeviceOptions()),[dispatch])
    // useEffect(()=>console.log(deviceOptions),[deviceOptions])

    function DropdownOption(props){
        return(
            <select className="shortDropdown">
                <option value=''>{headersRef[props.item]}</option>
                {deviceOptions[props.item].map((element,index)=>
                    <option key={index} value={element}>{element}</option>
                )}
            </select>
        )
    }

    return(
        <div><b>Filtros de Equipo</b>
        <DropdownOption item='types'/>
        
        POWER (Units)
        {['category', 'environment', 'service', 'status'].map((item,index)=>
            <DropdownOption key={index} item={item}/>
        )}
        
        -Antigüedad-Reclamos

        antiguedad: filter directo
        reclamos: filter directo

        </div>
    )
}