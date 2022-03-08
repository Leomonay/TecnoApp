import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getWorkerList } from "../../../actions/peopleActions"
import PeoplePicker from "../../pickers/PeoplePicker"
import './index.css'
import { getCylinderList, resetCylinderList } from "../../../actions/adminCylindersActions"
import AddCylinder from "../AddCylinder"
import AddTextForm from "../AddText"
import { addCylinderUsage, deleteCylinderUsage, updateIntervention } from "../../../actions/workOrderActions"


export default function AddIntervention(props){
    const {data, select, close} = props
    const {userData,workersList} = useSelector(state=>state.people)
    const {allCylinders} = useSelector(state=>state.adminCylinders)
    const [intervention, setIntervention] = useState({})
    const [user, setUser] = useState(undefined)
    const [cylinderList, setCylinderList] = useState([])
    const [gasUsages, setGasUsages] = useState([])
    const [addText, setAddText]=useState(false)
    const dispatch=useDispatch()

    // useEffect(()=>console.log('intervention',intervention),[intervention])

    useEffect(()=>{
        if(data){
            const editable = {...data}
            const date = new Date (editable.date)
            editable.date = date.toISOString().split('T')[0]
            editable.time = editable.time || `${date.getHours()}:${date.getMinutes()}`
            setIntervention({...editable})
            dispatch(getCylinderList(data.workers.map(e=>e.id)))
            setGasUsages(editable.refrigerant.filter(e=>!!e.code))
    }},[data, dispatch])

    useEffect(()=>{
        if (!userData || !workersList[0]) return
        if(userData.access === 'Worker'){
            setUser({
                id: userData.id,
                name: workersList.find(e=>e.id === userData.id).name
            })
        }
    },[userData, workersList])

    useEffect(()=>{
        if(!allCylinders[0] || !workersList[0]){
            setCylinderList([])
        }else{
            const cylinders = [...allCylinders]
            for (let cylinder of cylinders) cylinder.owner = workersList.find(worker=>worker.id === cylinder.user).name
            setCylinderList(cylinders)
        }      
    },[allCylinders, workersList])

    useEffect(()=>dispatch(resetCylinderList()),[dispatch])

    function saveIntervention(){
        if(intervention.id){
            let update={}
            const dataWorkers = data.workers.map(e=>e.id)
            const newWorkers = intervention.workers.map(e=>e.id)
            if(newWorkers.filter(id=>dataWorkers.includes(id)).length !== newWorkers.length){
                update.workers=intervention.workers
            }
            if(intervention.task !== data.task) update.task = intervention.task
            const date = intervention.date+' '+intervention.time
            if(date !== data.date) update = {...update, date: intervention.date, time:intervention.time}
            if(Object.keys(update).length>=1)dispatch(updateIntervention(intervention.id, update))

            const newGases = gasUsages.filter(e=>!e.id && !!e.code)
            if(newGases[0])dispatch(addCylinderUsage(intervention.id, userData.id, newGases))
            
            const keptGases = gasUsages.map(gas=>gas.id)
            const deletedGases = data.refrigerant.filter(e=>!!e.code && !keptGases.includes(e.id))
            if(deletedGases[0])dispatch(deleteCylinderUsage(intervention.id,userData.id,deletedGases))

        }else{
            select({...intervention,refrigerant:gasUsages})
        }
        close()
    }

    function handlePeople(idArray){
        setIntervention({...intervention, workers: idArray})
        dispatch(getCylinderList(idArray.map(e=>e.id)))
    }

    function deleteCylinder(e){
        e.preventDefault()
        const index = Number(e.target.value)
        let usages = [...gasUsages]
        usages.splice(index,1)
        setGasUsages(usages)
    }

    useEffect(()=>{if(!workersList[0])dispatch(getWorkerList())},[workersList, dispatch])

    return(
        <div className='formModal'>

            <div className='formBody'>
            <div className='section'>
                <div className='formTitle aIFtitle'>AGREGAR INTERVENCIÓN</div>
                <div className='button closeButton' onClick={()=>close()}>X</div>
            </div>

            {data && data.task}



                <div className='addInterventionSection'>
                    <div className='addInterventionField'>
                        <b>Fecha</b>
                        <input className='formInterventionItemDate'
                            type='date'
                            max={new Date().toISOString().split("T")[0]}
                            onChange={(e)=>setIntervention({...intervention, date:e.target.value})}
                            defaultValue={intervention.date}
                        />
                        {(!intervention.date) && <div className='errorMessage'>Debe ingresarse una fecha menor o igual que hoy.</div>}
                    </div>

                    <div className='addInterventionField'>
                        <b>Hora</b>
                        <input className='formInterventionItemHour'
                        type='time'
                        disabled={!intervention.date}
                        min='00:00'
                        defaultValue={intervention.time}
                        max={intervention.date===(new Date().toISOString().split("T")[0])?
                            Date().toString().split(' ')[4].substring(0,5)
                            :'23:59'}
                        onChange={(e)=>setIntervention({...intervention, time:e.target.value})}
                        />
                        {(intervention.time)?
                            ( (intervention.date===(new Date().toISOString().split("T")[0]) && 
                                intervention.time > Date().toString().split(' ')[4].substring(0,5))?
                                <div className='errorMessage'>No puede indicar un horario futuro.</div>:
                                ''
                            )
                            :<div className='errorMessage'>Debe ingresar la hora.</div>
                            }
                    </div>
            </div>

            <div className='addInterventionSection'>
                    <div className='addInterventionField'>
                        <b>Personal</b>
                        <PeoplePicker name='Intervinientes'
                            key={(user?user.id:1)+(intervention.id?intervention.id:1)}
                            mandatory = {userData.access==="Worker" ? user : false}
                            options={workersList}
                            disabled={!intervention.time || (intervention.id && userData.access!=="Admin")}
                            idList = {intervention.workers || (user && userData.access==='Worker') ? [user] : []}
                            update={(idArray)=>handlePeople(idArray)}
                            />
                        {( (!intervention.workers) || intervention.workers.length<2) &&
                            <div className='errorMessage'>Debe ingresar al menos 2 personas.</div>}
                    </div>
                </div>

            <div className='addInterventionSection'>
                <div className='addInterventionField'>
                    <b>Tarea Realizada</b>
                    <textarea className='longTextInput'
                        id='addInterventionTask'
                        disabled={!intervention.workers || !intervention.workers[0]}
                        defaultValue={intervention.task}
                        onChange={(e)=>setIntervention({...intervention, task:e.target.value})}
                        />
                    {(!intervention.task) &&
                        <div className='errorMessage'>Este campo no puede quedar vacío.</div>}

                    {intervention.id&&<button className='addButton' onClick={()=>setAddText(true)}>Agregar comentario</button>}
                            {addText&&<AddTextForm user={userData.user} 
                                select={(text)=>setIntervention({...intervention, task: intervention.task+' || '+text})}
                                close={()=>setAddText(false)}
                                />}


                </div>
            </div>

            <b>Consumos de GAS</b>
            <AddCylinder 
                cylinderList={cylinderList}
                disabled={false}
                stored={gasUsages}
                create={(cylinder)=>setGasUsages([...gasUsages,{...cylinder, user:userData.id}])}/>
            <div className="addInterventionField">
            {gasUsages.map((cylinder, index)=>
                <div className='formListItem fr211' key={index}>
                    <div className='listField'>{`${cylinder.code} (${cylinder.owner})`}</div>
                    <div className='listField'>{`${cylinder.total} kg.`}</div>
                    <div className='listField'>
                        <button className="removeButton delCylinder" value={index} onClick={(e)=>deleteCylinder(e)}/>
                    </div>
                </div>)}
            </div>
            <div className="addInterventionField">
                <div className='listField'>
                    <b>{`TOTAL: ${Number(gasUsages.map(e=>e.total).reduce((a,b)=>a+b,0))} kg.`}</b>
                </div>
            </div>

            <div className="addInterventionField">
                    <button className='button'
                        onClick={()=>saveIntervention()}>
                    GUARDAR INTERVENCIÓN
                    </button>
                </div>
            </div>

        </div>
    )

}