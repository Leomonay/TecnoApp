import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlantLocationTree } from "../../../actions/dataActions";

export default function LocationFilter(props){
    const {locationTree} = useSelector(state=>state.data)
    const dispatch = useDispatch()
    const plant = props.plant
    const [filter, setFilter] =useState({plantName: null, areaName:null, lineName:null})
    const [areas, setAreas]=useState([])
    const [lines, setLines]=useState([])

    useEffect(()=>setFilter({plantName: plant}),[plant])

    function handleLocation (location){
        const {areaName} = location
        let newFilter ={...filter,...location} 
        if(areaName){
            document.getElementById('lineSelector').value=''
            setLines(locationTree[plant][areaName])
            newFilter={plantName: plant, areaName:areaName}
        }
        setFilter(newFilter)
        props.select && props.select(newFilter)
    }

    useEffect(()=>{
        if(plant){
            dispatch(getPlantLocationTree(plant))
            setFilter({plantName:plant})
        }
            document.getElementById('areaSelector').value=''
            document.getElementById('lineSelector').value=''
    },[dispatch, plant])

    useEffect(()=>{locationTree[plant] && setAreas(Object.keys(locationTree[plant]))},[locationTree,plant])

    return(
        <div className='formRow'>
            <div>
                <select disabled={!plant} id='areaSelector' onChange={(e)=>{handleLocation({areaName: e.target.value})}}>
                    <option value=''>{plant?'Area':'Seleccione Planta'}</option>
                    {areas && areas.map((area, index)=>
                        <option key={index} value={area}>{area}</option>
                    )}
                </select>
            </div>

            <div>
                <select id='lineSelector' disabled={!filter.areaName} onChange={(e)=>{handleLocation({lineName: e.target.value})}}>
                    <option value=''>Línea</option>
                    {lines && lines.map((line, index)=>
                        <option key={index} value={line}>{line}</option>
                    )}
                </select>
            </div>


        </div>
    )
}