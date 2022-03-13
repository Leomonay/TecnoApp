import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getStrategies } from "../../../actions/planActions"
import ProgramCard from "../../Cards/ProgramCards"
import NewProgram from '../../forms/NewProgram'
import './index.css'

export default function ProgramManagement(props){
    const [create, setCreate]=useState(false)
    const {programList} = useSelector(state => state.plan)
    const dispatch = useDispatch()

    useEffect(()=>dispatch(getStrategies(props.plant, props.year)),[dispatch,props.plant, props.year])

    let programmedWorkers = []
    programList.map(program=>
        program.people.map(worker=>
            programmedWorkers.push({id:worker.id, program:program.name})
        )
    )

    return(
        <div className="allSpaceFrame">
            <button className="button addButton" onClick={()=>setCreate(!create)}>Crear Programa</button>
            {create && <NewProgram
                close={()=>setCreate(!create)}
                plant={props.plant}
                selectedWorkers = {programmedWorkers}
                />}
            {programList && 
            <div>
                <div className="title">Programas</div>
                <div className='cardList'>
                    {programList.map((element, index)=>
                        <ProgramCard key={index}
                            program={element}
                            selectedWorkers = {programmedWorkers}/>
                        )
                    }
                </div>
            </div>}
        </div>
    )
}