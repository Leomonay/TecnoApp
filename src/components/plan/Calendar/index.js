import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDates, getPlanDevices, getStrategies } from "../../../actions/planActions.js";
import ProgramFilters from "../../filters/ProgramFilters/index.js";
import Paginate from "../../Paginate/index.js";
import CalendarPicker from "../../pickers/CalendarPicker/index.js";
import './index.css'

export default function PlanCalendar(props){
    const {programList, calendar} = useSelector(state=>state.plan)
    const [plant, setPlant] = useState(props.plant)
    const [year, setYear] = useState(props.year)
    const [page, setPage]=useState({first: 0, size:10})
    const [filteredList, setFilteredList] = useState([])
    const dispatch = useDispatch()

    //trabajar directamente con la lista de equipos
    useEffect(()=>setPlant(props.plant),[props.plant])
    useEffect(()=>setYear(props.year),[props.year])
    useEffect(()=>(year&&plant)&&dispatch(getDates({year,plant})),[year,plant,dispatch])
    // useEffect(()=>setFilteredList('calendar',calendar),[calendar])
    useEffect(()=>calendar && setFilteredList(calendar),[calendar])


    
    function applyFilters(filters){
        console.log('filters',filters)
        setFilteredList(calendar.filter(task=>{
            let check = true
            for (let key of Object.keys(filters)){
                switch (key){
                    case 'responsible':
                        if (task[key].id!==filters[key])check=false;
                        break
                    case 'dates':
                        if (task[key].length!==filters[key].length)check=false;
                        break
                    default: if(task[key]!==filters[key])check=false;
                }
            }
            return check
        }))
    }

    useEffect(()=>{
        dispatch( getStrategies({plant,year}) )
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
                filteredList.slice(page.first, page.first+page.size).map((task, index)=>
                    <CalendarPicker key={task.code+index}
                        plant={plant}
                        year={year}
                        titles={index===0}
                        task={task}
                        />)
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