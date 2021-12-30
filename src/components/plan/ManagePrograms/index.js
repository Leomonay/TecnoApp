import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPrograms } from "../../../actions/planActions"
import ProgramCard from "../../Cards/ProgramCards"
import NewProgram from '../../forms/NewProgram'
import './index.css'

export default function ProgramManagement(props){
    const [create, setCreate]=useState(false)
    const {programList} = useSelector(state => state.plan)
    const dispatch = useDispatch()

    useEffect(()=>dispatch(getPrograms(props.plant)),[dispatch,props.plant])

    return(
        <div className="allSpaceFrame">
            <button className="addButton" onClick={()=>setCreate(!create)}>Crear Programa</button>
            {create && <NewProgram close={()=>setCreate(!create)} plant={props.plant}/>}
            {programList && 
            <div>
                <div className="title">Programas</div>
                <div className='cardList'>
                    {programList.map((element, index)=>
                        <ProgramCard key={index} program={element} />
                        )
                    }
                </div>
            </div>}
        </div>
    )
}