import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPlan, getPlanDevices, getPrograms, updatePlan } from "../../../actions/planActions";
import DeviceFilters from "../../filters/DeviceFilters";
import LocationFilter from "../../filters/LocationFilter";
import Paginate from "../../Paginate";
import PlanDevice from "../../Cards/PlanDevice";
import './index.css'
import { getDeviceOptions } from "../../../actions/deviceActions";
import { getRefrigerants } from "../../../actions/adminCylindersActions";
import ProgramForm from "../../forms/ProgramForm";

export default function PlanTask(props){
    const [plant] = useState(props.plant)
    const [year] = useState(props.year)

    const [filters, setFilters]=useState({ valueFilters:{}, rangeFilters:{}, includeFilters: {} })

    const {devicePlanList, programList} = useSelector(state => state.plan)
    const {refrigerants} = useSelector(state=>state.adminCylinders)
    const {deviceOptions} = useSelector(state=>state.devices)
    const [page, setPage]=useState({first:0, size:10})
    const [selection, setSelection]=useState([])
    const [programForm, setProgramForm]=useState(false)
    const [filteredList, setFilteredList]=useState(devicePlanList)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getDeviceOptions())
        dispatch(getPrograms({plant, year}))
        dispatch(getRefrigerants())
    },[dispatch, plant, year])



    async function handleSave(json){
        let create = []
        let update = []
        for (let code of json.device){
            devicePlanList.find(dev=>dev.code===code).program?
                update.push(code):create.push(code)
        }
        if (update[0]) dispatch(updatePlan({...json,device:update}))
        if (create[0]) dispatch(createPlan({...json,device:create}))
    }

    function handleCheck(e){
        let check = e.target.checked
        const code = e.target.id
        let list = [...selection]
        if(check){
            list.push(devicePlanList.find(e=>e.code===code))
        }else{
            list=list.filter(e=>e.code!==code)
        }
        setSelection(list)
    }

    function setLocationFilter(json){
        const newValues = {...filters.valueFilters}
        const newInclude = {...filters.includeFilters}
        json.areaName ? newValues.area = json.areaName : delete newValues.area
        json.lineName ? newValues.line = json.lineName : delete newValues.line
        json.spName ? newInclude.servicePoints = json.spName : delete newInclude.servicePoints
        setFilters({...filters, valueFilters: newValues, includeFilters: newInclude})
    }
    function setDeviceFilter(json){
        const valueFilters = {...filters.valueFilters, ...json.valueFilters}
        const includeFilters = {...filters.includeFilters, ...json.includeFilters}
        const rangeFilters = {...filters.includeFilters, ...json.rangeFilters}
        setFilters({valueFilters, includeFilters, rangeFilters})
    }

    useEffect(()=>{
        function applyFilters(device, filters){
            const {valueFilters, rangeFilters, includeFilters} = filters
            let check = true
            if(valueFilters) for (let key of Object.keys(valueFilters)){
                if(device[key]!==valueFilters[key]) check = false
            }
            if(rangeFilters) for (let key of Object.keys(rangeFilters)){
                if(device[key]<rangeFilters[key].min || device[key]>rangeFilters[key].max)
                check = false
            }
            if(includeFilters) for (let key of Object.keys(includeFilters)){
                if( !device[key].includes(includeFilters[key]) )
                check = false
            }
            return check
        }
        setFilteredList(devicePlanList.filter(device=>applyFilters(device, filters)))
    },[devicePlanList,filters])

    function handleSelectAll(){
        let codeList = filteredList.slice(page.first, page.first+page.size)
        let check = selection.length===codeList.length
        setSelection(check?[]:codeList)
        for (let code of codeList.map(e=>e.code)) document.getElementById(code).checked=!check
    }

    useEffect(()=> dispatch(getPlanDevices({plant,year})) , [plant, year, dispatch])

    return(
        <div className="pageContent">
            <div className="filterRow">
                <b>Filtros:</b>
                <LocationFilter
                    plant={props.plant}
                    select={(json)=>setLocationFilter(json)}/>
                <DeviceFilters
                    select={(json)=>setDeviceFilter(json)}
                    programList={programList}
                    deviceOptions={deviceOptions}
                    refrigerants={refrigerants}/>
                <div className={`selectorContainer shortForm`}>
                    <button className="openFilters"
                        onClick={()=>handleSelectAll()}>
                        Seleccionar Todos
                    </button>
                </div>
                {selection[0]&&<div className={`devFilterContainer shortForm`}>
                    <button className="openFilters" 
                        onClick={()=>setProgramForm(!programForm)}>
                        Asignar Programa a Selección
                    </button>
                </div>}
            </div>
            <div className="taskDeviceList" >
                    {filteredList && filteredList.slice(page.first, page.first+page.size).map((device, index)=>{
                        const key = device.code + (device.program?
                            Object.keys(device.program).map(key=>JSON.stringify(device.program[key])[1]).join('')
                            :'')

                        return <PlanDevice
                            key={key}
                            year={year}
                            plant={plant}
                            device={device}
                            programs={programList}
                            checked={selection.includes(device.code)}
                            onCheck={(e)=>handleCheck(e)}
                            onSave={(json)=>handleSave(json)}
                            />
                    })}
            </div>

            <div className="paginate">
                <Paginate pages={Math.ceil(filteredList.length / page.size)}
                    length='10'
                    min='10'
                    step='10'
                    select={(value)=>setPage({...page,first: (Number(value) -1) * page.size })} 
                    size={(value)=>setPage({...page, size: Number(value)})}
                    />
            </div>

            {programForm&&selection&& <ProgramForm 
                selection={selection}
                programList={programList}
                year={year}
                plant={plant}
                save={(json)=>handleSave(json)}
                onClose={()=>setProgramForm(!programForm)}
                />}
        </div>
    )
}