import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPrograms } from "../../../actions/planActions.js";
import ProgramFilters from "../../filters/ProgramFilters/index.js";

export default function PlanCalendar(props){
    const {programList} = useSelector(state=>state.plan)
    const [plant, setPlant] = useState(props.plant)
    const [year, setYear] = useState(props.year)
    const [filters, setFilters] = useState({})
    const [deviceList, setDeviceList] = useState([])
    const dispatch = useDispatch()

    //trabajar directamente con la lista de equipos
    useEffect(()=>console.log('plant', plant, 'year', year),[plant, year])
    useEffect(()=>setPlant(props.plant),[props.plant])
    useEffect(()=>setYear(props.year),[props.year])

    function applyFilters(filters){
        const programs = filters.program?
            programList.filter(program=>program.name===filters.program)
            :programList
        
        let devices = []
        programs.map(program=>devices=[...devices,program.deviceList])


    }
        
    useEffect(()=>dispatch( getPrograms({plant,year}) ),[plant,year, dispatch])

    return(
        <div>
            <div className='section'>
                <div className='title'>Filtros:</div>
                {! (props.plant && props.year) && <div>Debe seleccionar Planta y Año</div>}
                { (props.plant && props.year) && <ProgramFilters
                    programList = {programList}
                    select={(json)=>applyFilters(json)}/>}
            </div>
            <div className='section'>
                <div className='column'>
                    {/* {programList.filter(program=>
                        filters.name?program.name===filters.program:!!program.name).map(program=>
                            program.deviceList.map(=>))} */}
                </div>
                <div className='column'>Calendario</div>
            </div>
        </div>
    )
}