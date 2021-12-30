import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPlantList } from "../../../actions/dataActions"

export function PlantSelector(props){
    const {locationTree} = useSelector(state=>state.data)
    const [plantList, setPlantList] = useState([])
    const dispatch = useDispatch()

    useEffect(()=>dispatch(getPlantList()),[dispatch])
    useEffect(()=>setPlantList(Object.keys(locationTree)),[locationTree])

    return(
    <div className='formRow'>
        <label className='formLabel'>Planta:</label>
        {plantList[0] &&
        <select onChange={(e)=>props.select(e.target.value)} defaultValue={props.defaultValue || undefined}>
            <option value=''>Sin Seleccionar</option>
            {plantList.map( (plant,index)=>
            <option key={index} value={plant}>{plant}</option>)}
        </select>}
    </div>
    )
}