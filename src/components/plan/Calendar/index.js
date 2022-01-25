import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlanDevices, getPrograms } from "../../../actions/planActions.js";
import ProgramFilters from "../../filters/ProgramFilters/index.js";
import CalendarPicker from "../../pickers/CalendarPicker/index.js";
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
        <div className="calendarBody">
            <div className='rowForm'>
                <div className='title'>Filtros:</div>
                {! (props.plant && props.year) && <label className='longLabel'>Debe seleccionar Planta y Año</label>}
                { (props.plant && props.year) && <ProgramFilters
                    programList = {programList}
                    select={(json)=>setFilters(json)}/>}
            </div>
            <div className='rowForm'>
                <div className='menu column'>
                    <div className="title">Equipos</div>
                    {devicePlanList && devicePlanList.filter(device=>codeList.includes(device.code)).map(device=>
                        device.program && <div className='calendarDevItem' key={device.code} draggable='true'>
                            <div><b>{device.name}</b></div>
                            <div>{device.program.name}</div>
                            <div>{device.program.date&& (new Date (device.program.date) ).toLocaleDateString()}</div>
                            <div>{device.program.observations}</div>
                        </div>
                    )}
                </div>
                <div className='content column'>
                    <div className="calendar Grid">
                        {<CalendarPicker year={year}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}