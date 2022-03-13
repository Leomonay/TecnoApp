import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDeviceStrategy, getPlanDevices, getStrategies, 
    // updatePlan
 } from "../../../actions/planActions";
import DeviceFilters from "../../filters/DeviceFilters";
import Paginate from "../../Paginate";
import PlanDevice from "../../Cards/PlanDevice";
import './index.css'
import { getDeviceOptions } from "../../../actions/deviceActions";
import ProgramForm from "../../forms/ProgramForm";
import { cylinderActions } from "../../../actions/StoreActions";

export default function PlanTask(props){
    const {plant, year} = useSelector(state=>state.data)

    const {devicePlanList, programList} = useSelector(state => state.plan)
    const [page, setPage]=useState({first:0, size:10})
    const [selection, setSelection]=useState([])
    const [programForm, setProgramForm]=useState(false)
    const [filteredList, setFilteredList]=useState(devicePlanList)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getDeviceOptions())
        dispatch(getStrategies({plant, year}))
        dispatch(cylinderActions.getGases())
        dispatch(getPlanDevices({plant,year}))
    },[dispatch, plant, year])

    async function handleSave(json){
        dispatch(setDeviceStrategy(json))
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

    function handleSelectAll(){
        let codeList = filteredList.slice(page.first, page.first+page.size)
        let check = selection.length===codeList.length
        setSelection(check?[]:codeList)
        for (let code of codeList.map(e=>e.code)) document.getElementById(code).checked=!check
    }

    return(
        <div className="pageContent">
            <div className="filterRow">
                <b>Filtros:</b>
                <DeviceFilters select = {setFilteredList} list = {devicePlanList} plan = {true}/>
                <div className={`selectorContainer shortForm`}>
                    <button className='btn btn-primary btn-sm'
                        onClick={()=>handleSelectAll()}>
                        Seleccionar Todos
                    </button>
                </div>
                {selection[0]&&<div className={`devFilterContainer shortForm`}>
                    <button className='btn btn-primary btn-sm'
                        onClick={()=>setProgramForm(!programForm)}>
                        Asignar Programa a Selección
                    </button>
                </div>}
            </div>
            <div className="taskDeviceList" >
                    {filteredList[0] && filteredList.slice(page.first, page.first+page.size).map((device, index)=>{
                        const key = device.code + (device.strategy?
                            Object.keys(device.strategy).map(key=>JSON.stringify(device.strategy[key])[1]).join('')
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
                    {!filteredList[0] && <div className='errorMessage'>
                        No hay elementos para mostrar para esa planta y año 
                    </div>}
            </div>

            <Paginate pages={Math.ceil(filteredList.length / page.size)}
                length='10'
                min='10'
                step='10'
                select={(value)=>setPage({...page,first: (Number(value) -1) * page.size })} 
                size={(value)=>setPage({...page, size: Number(value)})}
                />

            {programForm&&selection&& <ProgramForm 
                selection={selection}
                save={(json)=>handleSave(json)}
                onClose={()=>setProgramForm(!programForm)}
                />}
        </div>
    )
}