import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDeviceFilters, getDeviceList, getPartialDeviceList, viewDevice } from "../../../actions/deviceActions"
import {appConfig} from "../../../config"
import { cloneJson } from "../../../utils/utils"
import JsonViewer from '../../JsonViewer.js/index.js'
import Paginate from "../../Paginate"
import Table from "../../Table"
import './index.css'

export default function DevicePicker(props){
    const {deviceFilters, partialList, deviceView , deviceFullList} = useSelector(state=>state.devices)
    const {userData} = useSelector(state=>state.people)
    const [conditions, setConditions]=useState({})
    const [page, setPage] = useState({first: 1, size:10})
    const [filteredList, setFilteredList] = useState(deviceFullList)
    const dispatch = useDispatch()

    useEffect(()=>!deviceFullList[0] && dispatch(getDeviceList(userData.plant)))
    useEffect(()=>dispatch(getDeviceFilters()),[dispatch])
    useEffect(()=>{
        console.log(deviceFullList[0])
        const filtered = deviceFullList.filter(device=>{
            let check = true
            for (let key of Object.keys(conditions)){
                if (device[key]!==conditions[key])check=false
            }
                return check})
        setFilteredList(filtered)}, [deviceFullList, conditions])

    function selectOption(e){
        const cond = e.target.className.split(' ')[1]
        const value = e.target.value
        const obj = {...conditions}
        if (cond==='area'&&cond!==conditions[cond]){
            document.getElementById(`devicePickerline`).value=''
            delete obj.line
        }
        if (value===''){
            delete obj[cond]
            console.log('obj',obj)
            setConditions(obj)
        }else{
            cond==='area'||cond==='line'?
            obj[cond] = e.target.value
            : obj[cond] = e.target.value
            console.log('obj',obj)
            setConditions(obj)
        }
    }

    useEffect(()=>console.log('filteredList',filteredList),[filteredList])
    useEffect(()=>console.log('deviceFullList',deviceFullList),[deviceFullList])
    useEffect(()=>console.log('conditions',conditions),[conditions])

    function FilterOption(props){
        const {field, options}=props
        return(<div className='devicePickerFilterOption' key={field}>
            <label className='devicePickerFilterName'>{appConfig.headersRef[field]}</label>
            <select className={`devicePickerSelect ${field}`} onChange={(e)=>selectOption(e)} id={`devicePicker${field}`} 
                defaultValue={conditions[field]||''}>
                <option value=''>{`Sin seleccionar`}</option>
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
                return<FilterOption key={index} field={ key }
                options={key==='line'?
                    (conditions.area?
                        deviceFilters.line.filter(e=>e.area===conditions.area).map(e=>e.name)
                        :deviceFilters.line.map(e=>e.name))
                    :deviceFilters[key]}/>
            })}

            {/* <button className='search' onClick={(e)=>{
                e.preventDefault();dispatch(getPartialDeviceList(conditions))
            }}>BUSCAR</button> */}
        </div>
    }

    function selectDevice(device){
        props.select(device)
        props.close()
    }

    return(
        <div className="addInterventionModal">
            <div className='devicePickerBackground'>
                <div className='devicePickerHeader'>
                    <div className='title'>BÚSQUEDA DE EQUIPOS</div>
                    <button className='closeButton' onClick={()=>props.close()}><b>X</b></button>
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
                    {/* TO IMPLEMENT: {filteredList&&filteredList.slice(page.first, page.first+page.size).map(

                    )}*/}
                    {filteredList[0]&&
                        <Table
                            firstIndex = {page.first}
                            key={filteredList.length}
                            array={filteredList.slice(page.first, page.first+page.size)}
                            headers={['code', 'name', 'type', 'powerKcal', 'powerTnRef', 'category', 'servicePoints']}
                            clickFunction={(code)=>selectDevice(code)}
                            onHover={code=>dispatch(viewDevice(code))}
                            attrib='code'
                        />}
                </div>
                
                <Paginate pages={Math.ceil(deviceFullList.length/page.size)}
                    length='7'
                    select={(value)=>setPage({...page,first: (Number(value) -1) * page.size })}
                    size={(value)=>setPage({...page, size: Number(value)})}
                    min='10'
                    step='5'
                    defaultValue={page.size}/>

            </div>
        </div>
    )
}