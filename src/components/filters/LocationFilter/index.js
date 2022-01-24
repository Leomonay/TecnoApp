import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLineServicePoints, getPlantLocationTree } from "../../../actions/dataActions";
import './index.css'

export default function LocationFilter(props){
    const {locationTree} = useSelector(state=>state.data)
    const {servicePointList} = useSelector(state=>state.data)
    const dispatch = useDispatch()
    const plant = props.plant
    const [filter, setFilter] =useState({plantName: undefined, areaName:undefined, lineName:undefined, spName:undefined})
    const [areas, setAreas]=useState([])
    const [lines, setLines]=useState([])
    const [view, setView]=useState(false)

    function deleteFields(json,fields){
        for(let field of fields){
            delete json[`${field}Name`]
            const element = document.getElementById(`${field}Selector`)
            if(element) element.value=''
        }
        return json
    }

    function handleLocation(item,name){
        let newFilter = {...filter}
        switch (item){
            case 'area':
                newFilter = deleteFields(newFilter, name===''?['area','line','sp']:['line','sp'])
                name!=='' && setLines(locationTree[plant][name])
            break;
            case 'line':
                newFilter = deleteFields(newFilter, name===''?['line','sp']:['sp'])
                name!=='' && dispatch(getLineServicePoints(name))
            break;
            case 'sp':
                if(name==='') newFilter = deleteFields(newFilter, ['sp'])
            break;
            default: break;
        }
        if(name!=='') newFilter[`${item}Name`]=name
        setFilter(newFilter)
        props.select && props.select(newFilter)
    }

    useEffect(()=>{
        if(plant){
            dispatch(getPlantLocationTree(plant))
            setFilter({plantName:plant})
            deleteFields({}, ['area', 'line', 'sp'])
        }
    },[dispatch, plant])

    useEffect(()=>setFilter({plantName: plant}),[plant])
    
    useEffect(()=>{locationTree[plant] && setAreas(Object.keys(locationTree[plant]))},[locationTree,plant])

    function LocationSelect(title, array, item, parent){
        return(
            <select id={`${item}Selector`}
                className='locationOption'
                disabled={!filter[`${parent}Name`]}
                onChange={(e)=>handleLocation(item,e.target.value)}
                defaultValue={filter[`${item}Name`]}>
                <option value='' >{title}</option>
                {array && array.map((element, index)=>
                    <option key={index} value={element}>{element}</option>
                )}
            </select>
        )
    }

    return(
        <div className={`selectorContainer ${view?'longForm':'shortForm'}`}>
            <button className={`openFilters ${view && 'pressed'}`}
                onClick={()=>setView(!view)}>Ubicación</button>
            {view&&LocationSelect('Area', areas, 'area', 'plant')}
            {view&&LocationSelect('Linea', lines, 'line', 'area')}
            {view&&LocationSelect('Lugar de Servicio', servicePointList, 'sp', 'line')}
        </div>
    )
}