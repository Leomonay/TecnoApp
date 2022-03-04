import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPlantList, setPlantName } from "../../../actions/dataActions"
import { FormSelector } from "../../forms/FormInput"
import './index.css'

export function PlantSelector(props){
    const {disabled, onSelect}=props
    const {locationTree, plant} = useSelector(state=>state.data)
    const [plantList, setPlantList] = useState([])
    const [value, setValue] = useState(undefined)
    const dispatch = useDispatch()

    useEffect(()=>dispatch(getPlantList()),[dispatch])
    useEffect(()=>setPlantList(Object.keys(locationTree)),[locationTree])
    useEffect(()=>setValue(plant),[plant])

    function handleSelect(e){
        e.preventDefault()
        const {value} = e.target
        dispatch(setPlantName(value))
        onSelect && onSelect(value)
    }

    return(
        <FormSelector key={value} label={'Planta'}
            options={plantList}
            onSelect={(e)=>handleSelect(e)}
            defaultValue={value}
            disabled={disabled}/>
    )
}