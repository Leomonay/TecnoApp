import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AddIntervention from '../../forms/InterventionForm'
import './index.css'

export default function InterventionList(props){
    const {onDelete, openAdd, permission} = props
    const {userData}=useSelector(state=>state.people)
    const [edit, setEdit] = useState(false)
    const [interventionList, setInterventionList]=useState(props.interventions)

    useEffect(()=>setInterventionList(props.interventions), [props.interventions])

    return(
        <div className='interventionList'>
            <div className='gridHeaders'>
                <div className='gridHeader' id='dateField'>Fecha</div>
                <div className='gridHeader' id='workersField'>Personal</div>
                <div className='gridHeader' id='tasksField'>Tareas</div>
                <div className='gridHeader' id='refrigerantField'>Gas</div>
                <div className='gridHeader' id='buttonsField'>Quitar</div>
            </div>
        
        {interventionList && interventionList[0] && interventionList.map((item, index)=>{
            const date = new Date (item.date)
            const itemDate = date.toISOString().split('T')[0]
            const time = item.time || `${date.getHours()}:${date.getMinutes()}`

            return(
                <div className="interventionItem" key={index}>
                    <div className="interventionListColumns">
                        <div className='gridField dateField'>
                            <div className='gridFieldLine'>
                                <div><b>{itemDate}</b></div>
                                <div>{time}</div>
                            </div>
                        </div>
                        <div className='gridField'>{item.workers.map((worker, index)=>
                            <div className='gridFieldLine workerName' key={index}>{worker.name}</div>)}
                        </div>
                        <div className='gridField taskField'>{item.task}</div>
                        <div className='gridField'>
                            {item.refrigerant.map((cyl, index)=>
                                <div className='gridFieldLine' key={index}>
                                    <div><b>{`${index===0 ? 'Refrigerante: ':cyl.code}`}</b></div>
                                    <div>{cyl.total}kg.</div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='gridField buttonsField'>
                        {permission&&<button className="button editionButton" onClick={()=>setEdit(item)}/>}
                        {userData.access==='Admin'&&<button className="button deletionButton" onClick={()=>onDelete()}/>}
                        {edit && 
                            <AddIntervention select={()=>{}}
                                close={()=>setEdit(false)}
                                data={edit}
                                key={index}/>}
                    </div>
                </div>)
        })}

        {permission&&<button className='button addButton' onClick={()=>{openAdd()}}>
            <b>Agregar intervención</b>
        </button>}
    </div>
    )
}