import { useState } from "react"
import DeviceOptions from "../../dropdown/DeviceOptions"
import {appConfig} from "../../../config"
import './index.css'
const {headersRef} = appConfig

function RangeInput(props){
    const {title, field, equivalency, select, actualJson} = props
    const units = equivalency?Object.keys(equivalency):undefined
    const [unit, setUnit] = useState( units ? (units[0] || units) : undefined)
    
    function setNewJson(field, keys, values){
        const newJson = actualJson? {...actualJson} : {}
        for (let i =0; i<keys.length; i++){
            if(!newJson[field])newJson[field]={}
            newJson[field][keys[i]] = values[i]
        }
        select(field,newJson[field])
    }

    function updateUnit(field, newEquiv, actualEquiv){
        const newJson = {...actualJson}
        if(newJson[field]){
            const keys = Object.keys(newJson[field])
            for (let key of keys){
                newJson[field][key] = newJson[field][key] * newEquiv/actualEquiv
            }
            select(field,newJson[field])
        }
    }

    return(
        <div className="rangeField">
            <b>{title}: </b>
            <input className='numberInput'
                type='number'
                placeholder='min'
                min='0'
                id={`${field}Min`}
                max={ (actualJson[field] && actualJson[field].max) / (equivalency? equivalency[unit]:1) || undefined}
                defaultValue={actualJson[field]?actualJson[field].min:undefined}
                onChange={(e)=>{
                    setNewJson(field,[ 'min' ],[ e.target.value * (equivalency? equivalency[unit] : 1) ])
                    }}/>
            -
            <input className='numberInput'
                type='number'
                placeholder="max"
                id={`${field}Max`}
                min={ (actualJson[field] && actualJson[field].min)/(equivalency? equivalency[unit]:1) || undefined}
                defaultValue={actualJson[field]?actualJson[field].max:undefined}
                onChange={(e)=>{
                    setNewJson(field,[ 'max' ],[ e.target.value * (equivalency? equivalency[unit] : 1) ])
                    }}/>
            {units&&<button className='unitButton'
                onClick={()=>{
                    let newUnit = units[units.findIndex(e=>e===unit)+1] || units[0]
                    updateUnit(field, equivalency[newUnit], equivalency[unit])
                    setUnit(newUnit)
                    }}>{unit}</button>}
        </div>
    )
}

export default function DeviceFilters(props){
    const {deviceOptions, programList, refrigerants} = props
    const [view, setView]=useState(false)
    const [name, setName] = useState('')
    // const [valueFilters, setValueFilters] = useState({})
    // const [rangeFilters, setRangeFilters] = useState({})

    const [filters, setFilters] = useState({valueFilters:{}, rangeFilters:{},includeFilters:{}}) 

    function inputRange(field,values){
        const newRange = {...filters.rangeFilters}
        newRange[field] = newRange[field]?
            {...newRange[field],...values}
            :values
        const newFilters = {...filters,rangeFilters: newRange}
        props.select(newFilters)
        setFilters(newFilters)
    }

    function inputValue(item, value){
        let newValues = {...filters.valueFilters}
        if(value==='SIN ASIGNAR') value='unassigned'
        if(value===''){
            delete newValues[item]
        }else{
            newValues[item]=value
        }
        const newFilters = {...filters,valueFilters: newValues}
        props.select(newFilters)
        setFilters(newFilters)
    }

    function includeFilter (item, value, event){
        event && event.preventDefault()
        const newFilter = {...filters.includeFilters}
        if (value === '' || value === undefined){
            delete newFilter[item]
        }else{
            newFilter[item]=value
        }
        const newFilters = {...filters,includeFilters: newFilter}
        props.select(newFilters)
        setFilters(newFilters)    
    }

    function deleteFilter(subJson, key){
        let newJson = {...filters[subJson]}
        delete newJson[key]
        const newFilters = {...filters, [subJson]:newJson}
        setFilters(newFilters);
        for (let cond of ['Value','Min','Max']){
            const input = document.getElementById(`${key}${cond}`)
            if(input) input.value=''
        }
        props.select(newFilters)
    }

    return(
            <div className={`selectorContainer ${view?'longForm':'shortForm'}`}>
                <button className={`openFilters`} onClick={()=>setView(!view)}>Equipo</button>
                {view&&<DeviceOptions item='types' select={
                    (item,event)=>inputValue('type', event.target.value)//
                    } 
                    options={deviceOptions['types']}/>}

                {view && <RangeInput 
                    title='Potencia'
                    field='power'
                    equivalency={{Frig:1,TR:3000}}
                    select={(field,json)=>inputRange(field,json)}
                    actualJson={filters.rangeFilters}
                    /> }

                {view && ['category', 'environment', 'service', 'status'].map((item,index)=>
                    <DeviceOptions key={index} item={item} select={
                        (item,event)=>inputValue(item, event.target.value)//
                        } 
                        options={deviceOptions[item]} />
                )}

                {view && <RangeInput 
                    title='Antigüedad(años)'
                    field='age'
                    select={(field,json)=>inputRange(field,json)}
                    actualJson={filters.rangeFilters}
                    /> }
                
                {view && <RangeInput 
                    title='Reclamos'
                    field='reclaims'
                    select={(field,json)=>inputRange(field ,json)}
                    actualJson={filters.rangeFilters}
                    /> }

                {programList[0]&&view&&<DeviceOptions item='program'
                    options={['SIN ASIGNAR',...programList.map(e=>e.name)]}
                    select={
                        (item,event)=>inputValue(item, event.target.value)//
                    }/>}
                {view&&<DeviceOptions item='refrigerant'
                    options={refrigerants.map(e=>e.refrigerante)}
                    select={
                        (item,event)=>inputValue(item, event.target.value)//
                    }/>}
                {view && <form className="rangeField">
                    <label><b>Nombre:</b></label>
                    <input placeholder='nombre total o parcial' onChange={(e)=>setName(e.target.value)}/>
                    <button onClick={(event)=>includeFilter('name',name, event)}>BUSCAR</button>
                </form>}
                {view&&<div className='filterList'> <b>Filtros:</b>
                    {Object.keys(filters.rangeFilters).map((key, index)=>{
                        const {rangeFilters} = filters
                        return<div key={index} className='selectedFilter' title='Borrar Filtro'>
                            {`${headersRef[key]||key}: ${
                                rangeFilters[key].min && !rangeFilters[key].max ? `más de ${rangeFilters[key].min}`
                                :!rangeFilters[key].min && rangeFilters[key].max ? `menos de ${rangeFilters[key].max}`
                                :rangeFilters[key].min === rangeFilters[key].max ? `${rangeFilters[key].max}`
                                :`${rangeFilters[key].min} a ${rangeFilters[key].max}`} `}
                            <button className='deleteFilter' onClick={(e)=>deleteFilter('rangeFilters',key)}>X</button>
                        </div>}
                    )}
                    {Object.keys(filters.valueFilters).map((key,index)=>
                        <div key={index} className='selectedFilter' title='Borrar Filtro'>
                            {`${headersRef[key]}: ${filters.valueFilters[key]}`}
                            <button className='deleteFilter' onClick={(e)=>deleteFilter('valueFilters',key)}>X</button>
                        </div>
                    )}
                    {Object.keys(filters.includeFilters).map((key,index)=>
                        <div key={index} className='selectedFilter' title='Borrar Filtro'>
                            {`${headersRef[key]}: incluye ${filters.includeFilters[key]}`}
                            <button className='deleteFilter' onClick={(e)=>deleteFilter('includeFilters',key)}>X</button>
                        </div>
                    )}
                </div>}
        </div>
    )
}