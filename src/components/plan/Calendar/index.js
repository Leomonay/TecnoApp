import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlanDevices, getPrograms } from "../../../actions/planActions.js";
import ProgramFilters from "../../filters/ProgramFilters/index.js";
import Paginate from "../../Paginate/index.js";
import CalendarPicker from "../../pickers/CalendarPicker/index.js";
import './index.css'

export default function PlanCalendar(props){
    const {devicePlanList,programList} = useSelector(state=>state.plan)
    const [plant, setPlant] = useState(props.plant)
    const [year, setYear] = useState(props.year)
    const [page, setPage]=useState({first: 0, size:10})
    const [filteredList, setFilteredList] = useState(devicePlanList.filter(device=>!!device.program))
    const dispatch = useDispatch()

    //trabajar directamente con la lista de equipos
    useEffect(()=>setPlant(props.plant),[props.plant])
    useEffect(()=>setYear(props.year),[props.year])

    function applyFilters(filters){
        const list = devicePlanList.filter(device=>!!device.program)
        setFilteredList(list.filter(device=>{
            let check = true
            for (let key of Object.keys(filters)){
                switch (key){
                    case 'responsible':
                        if (device.program[key].id!==filters[key])check=false;
                        break
                    case 'planned':
                        if (device.program[key].length!==filters[key].length)check=false;
                        break
                    default: if(device.program[key]!==filters[key])check=false;
                }

                // if (key === 'responsible'){
                //     if (device.program[key].id!==filters[key])check=false
                // }else{
                //     if(device.program[key]!==filters[key])check=false
                // }
            }
            return check
        }))
    }

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
                    select={(json)=>applyFilters(json)}/>}
            </div>
            
            <div>
            <div className='section'>
                <div className='deviceColumn title'>Equipos</div>
                <div className='calendarColumn title'>Calendario {year}</div>
            </div>
            {filteredList[0]?
                filteredList.slice(page.first, page.first+page.size).map((device, index)=>
                    <CalendarPicker key={index} 
                        year={year}
                        titles={index===0}
                        device={device}/>)
                :<div className="errorMessage">No hay equipos que coincidan con la búsqueda</div>}
            </div>

            <Paginate pages={Math.ceil(filteredList.length / page.size)}
                length='10'
                min='5'
                step='5'
                defaultValue={page.size}
                select={(value)=>setPage({...page,first: (Number(value) -1) * page.size })} 
                size={(value)=>setPage({...page, size: Number(value)})}
                />
        </div>
    )
}