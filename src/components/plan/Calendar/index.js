import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlanDevices, getPrograms } from "../../../actions/planActions.js";
import ProgramFilters from "../../filters/ProgramFilters/index.js";
import './index.css'

export default function PlanCalendar(props){
    const {devicePlanList,programList} = useSelector(state=>state.plan)
    const [plant, setPlant] = useState(props.plant)
    const [year, setYear] = useState(props.year)
    const [filters, setFilters] = useState({})
    const [codeList, setCodeList] = useState([])
    const dispatch = useDispatch()

    //trabajar directamente con la lista de equipos
    useEffect(()=>console.log('plant', plant, 'year', year),[plant, year])
    useEffect(()=>setPlant(props.plant),[props.plant])
    useEffect(()=>setYear(props.year),[props.year])

    useEffect(()=>{
            const programs = filters.program?
                programList.filter(program=>program.name===filters.program)
                :programList
            let devices = []
            for (let program of programs){
                const devList = filters.responsible ?
                    program.deviceList.filter(element=>element.responsible.id === filters.responsible)
                    :program.deviceList           
                devices = [...devices, ...devList.map(element=>element.device)]
            }
            setCodeList(devices)
    },[programList,filters])
        
    useEffect(()=>{
        dispatch( getPrograms({plant,year}) )
        dispatch(getPlanDevices({plant,year}))    
    },[plant,year, dispatch])

    return(
        <div>
            <div className='section'>
                <div className='title'>Filtros:</div>
                {! (props.plant && props.year) && <label className='longLabel'>Debe seleccionar Planta y Año</label>}
                { (props.plant && props.year) && <ProgramFilters
                    programList = {programList}
                    select={(json)=>setFilters(json)}/>}
            </div>
            <div className='section'>
                <div className='column'>
                    <div className="title">Equipos</div>
                    {devicePlanList && devicePlanList.filter(device=>codeList.includes(device.code)).map(device=>
                        <div className='calendarDevItem' key={device.code} draggable='true'>
                            <div><b>{device.name}</b></div>
                            <div>{device.program.name}</div>
                            <div>{device.program.date}</div>
                            <div>{device.program.observations}</div>
                        </div>
                    )}
                </div>
                <div className='column'>
                    Calendario
                    <div className="calendar Grid">
                        {<div></div>}
                    </div>
                </div>
            </div>
        </div>
    )
}