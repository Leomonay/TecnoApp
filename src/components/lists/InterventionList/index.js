import './index.css'

export default function InterventionList(props){
    const {interventions, openEdit, onDelete, openAdd} = props
    return(
        <div className='interventionList'>
            <div className='gridHeaders'>
                <div className='gridHeader' id='dateField'>Fecha</div>
                <div className='gridHeader' id='workersField'>Personal</div>
                <div className='gridHeader' id='tasksField'>Tareas</div>
                <div className='gridHeader' id='refrigerantField'>Gas</div>
                <div className='gridHeader' id='buttonsField'>Quitar</div>
            </div>
        
        {interventions && interventions[0] && interventions.map((item, index)=>{
            const date = new Date (item.date)
            const time = item.time || `${date.getHours()}:${date.getMinutes()}`

            return(
                <div className="interventionItem" key={index}>
                    <div className="interventionListColumns">
                        <div className='gridField dateField'>
                            <div className='gridFieldLine'>
                                <div><b>{date.toLocaleDateString()}</b></div>
                                <div>{time}</div>
                            </div>
                        </div>
                        <div className='gridField'>{item.workers.map((worker, index)=>
                                <div className='gridFieldLine workerName' key={index}>{worker.name}</div>)}</div>
                        <div className='gridField taskField'>{item.task}</div>
                        <div className='gridField'>
                            {item.refrigerant.map((cyl, index)=>
                                <div className='gridFieldLine'>
                                    <div><b>{`${index===0 ? 'Refrigerante: ':cyl.cylinder}`}</b></div>
                                    <div>{cyl.total}kg.</div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='gridField buttonsField'>
                        <button className="editionButton" onClick={()=>openEdit}/>
                        <button className="deletionButton" onClick={()=>onDelete()}/>
                    </div>
                </div>)
        })}

        <button className='addButton' onClick={()=>{openAdd()}}>
            <b>Agregar intervención</b>
        </button>
    </div>
    )
}