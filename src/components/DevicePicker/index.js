import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDeviceFilters, getPartialDeviceList, viewDevice } from "../../actions/deviceActions"
import {appConfig} from "../../config"
import { cloneJson } from "../../utils/utils"
import JsonViewer from '../JsonViewer.js'
import Table from "../Table"
import './index.css'

export default function DevicePicker(props){
    const {deviceFilters, partialList, deviceView} = useSelector(state=>state.devices)
    const [conditions, setConditions]=useState({filters:{}})
    const dispatch = useDispatch()

    useEffect(()=>dispatch(getDeviceFilters()),[dispatch])

    function selectOption(e){
        const cond = e.target.className.split(' ')[1]
        const value = e.target.value
        const obj = cloneJson(conditions)
        if (cond==='area'&&cond!==conditions[cond]){
            document.getElementById(`devicePickerline`).value='none'
            delete obj.line
        }
        if (value==='none'){
            const obj = cloneJson(conditions)
            delete obj[cond]
            setConditions(obj)
        }else{
            cond==='area'||cond==='line'?
            obj[cond]=e.target.value
            : obj.filters[cond]=e.target.value
            setConditions(obj)
        }
    }

    function FilterOption(props){
        const {field, options}=props
    return(<div className='devicePickerFilterOption' key={field}>
        <label className='devicePickerFilterName'>{appConfig.headersRef[field]}</label>
        <select onChange={(e)=>selectOption(e)}
            id={`devicePicker${field}`}
            className={`devicePickerSelect ${field}`}
            value={conditions[field]||''}>
        <option value='none'>{conditions[field]||conditions.filters[field]||`Sin seleccionar`}</option>
            {options&&options.map((filterOption, index)=>
                <option key={index} value={filterOption}>
                    {filterOption}
                </option>)}
        </select>
    </div>)
    }

    function DeviceFilters(){
        return<div className='devicePickerFilters'>
            {Object.keys(deviceFilters).map((key,index)=>{
                return<FilterOption key={index} field={ key } options={key==='line'?
                (conditions.area?
                    deviceFilters.line.filter(e=>e.area===conditions.area).map(e=>e.name)
                    :deviceFilters.line.map(e=>e.name))
                :deviceFilters[key]}/>
            })}
            <button className='search' onClick={(e)=>{
                e.preventDefault();dispatch(getPartialDeviceList(conditions))
            }}>BUSCAR</button>
        </div>
    }

    function selectDevice(device){
        props.select(device)
        props.close()
    }

    return(
        <div className='devicePickerBackground'>
            <div className='devicePickerHeader'>
                <div className='title'>BÚSQUEDA DE EQUIPOS</div>
                <button className='close' onClick={()=>props.close()}><b>X</b></button>
            </div>
            <div className='devicePickerUpperSection'>
                {Object.keys(deviceFilters).length>0&&<DeviceFilters/>}
                <div className='devicePickerDetail'>
                    {deviceView&&<b>Detalle de Equipo</b>}
                    <div className='devicePickerViewer'>
                        <JsonViewer json={partialList.find(e=>e.code===deviceView)}/>
                    </div>
                </div>
                <div className='devicePickerImage'><b>Foto</b><i>(Función pendiente)</i></div>
            </div>
            <div className='deviceList'>
                {partialList[0]&&
                    <Table 
                        array={partialList}
                        headers={['code', 'name', 'type', 'powerKcal', 'powerTnRef', 'category', 'servicePoints']}
                        clickFunction={(code)=>selectDevice(code)}
                        onHover={code=>dispatch(viewDevice(code))}
                        attrib='code'
                    />}
            </div>
        </div>
    )
}