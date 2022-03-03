import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getWorkerList } from "../../../actions/peopleActions"
import { cloneJson } from "../../../utils/utils"
import PeoplePicker from "../../pickers/PeoplePicker"
import { appConfig } from "../../../config"
import './index.css'
import { getCylinderList } from "../../../actions/adminCylindersActions"
import AddCylinder from "../AddCylinder"

const {headersRef} = appConfig

function KGinput(props){
    const {object, disabled, readOnly, defaultValue, select, min, max, step}=props
    const [errors, setErrors] = useState(!object.init)

    function validation(value){
        return !!value && value>Number(min) && value<=Number(max)
    }

    function setValue(event){
        const value = Number(event.target.value)
        const check = validation(value)
        setErrors(!check)
        select( (check && value) || undefined)
    }

    return(
    <div className='gasLabel'>
        <input type="number"
            className='aIKGInput'
            onChange={(event)=>setValue(event)}
            defaultValue={defaultValue}
            disabled={disabled}
            readOnly={readOnly}
            min={min} max={max} step={step}/>
        {!disabled && errors && <div className='errorMessage'>entre {min} y {max}</div>}
    </div>
    )
}

export default function AddIntervention(props){
    const {userData,workersList} = useSelector(state=>state.people)
    const {allCylinders} = useSelector(state=>state.adminCylinders)
    const [intervention, setIntervention] = useState({})
    const [freon, setFreon]=useState(false)
    const [errors, setErrors] = useState(false)
    const [newCyl, setNewCyl] = useState(false)
    const [user, setUser] = useState(undefined)
    const [max, setMax] = useState(undefined)
    const [cylinderList, setCylinderList] = useState([])
    const [gasUsages, setGasUsages] = useState([])
    const dispatch=useDispatch()

    useEffect(()=>{
        if (!userData || !workersList[0]) return
        if(userData.access === 'Worker'){
            setUser({
                id: userData.id,
                name: workersList.find(e=>e.idNumber === userData.id).name
            })
        }
    },[userData, workersList])

    useEffect(()=>{
        if(!allCylinders[0] || !workersList[0]){
            setCylinderList([])
        }else{
            const cylinders = [...allCylinders]
            for (let cylinder of cylinders) cylinder.owner = workersList.find(worker=>worker.id === cylinder.user).name
            console.log('cylinders',cylinders)
            setCylinderList(cylinders)
        }
    },[allCylinders, workersList])

    useEffect(()=>console.log('intervention', intervention),[intervention])
    useEffect(()=>console.log('gasUsages', gasUsages),[gasUsages])
    useEffect(()=>console.log('cylinderList', cylinderList),[cylinderList])

    function getErrors(){
        let errors = []
        let missingFields = []
        for (let key of ['date', 'time', 'workers', 'task']) if (!intervention[key]) missingFields.push(headersRef[key])
        missingFields[0] && errors.push(`Debe completar ${missingFields.join(', ')}. `)
        const {workers, refrigerant} = intervention
        if (workers && workers.length === 0) errors.push(` Los trabajadores deben ser 2 o más. `)
        if (refrigerant){
            for (let code of refrigerant){
                const missingKeys=[]
                for (let key of ['init', 'final', 'total']){
                    if (!code[key]) missingKeys.push(key)
                }
                missingKeys[0] && errors.push(` Garrafa n° ${code.cylinder} no posee campo${missingKeys[0]&&'s'} ${missingKeys.join(', ')}.`)
            }
        }
        setErrors( errors ? `Errores: ${errors.join('')}` : false )
        return !errors[0]
    }

    function saveIntervention(){
        props.select(intervention)
        props.close()
    }

    function handlePeople(idArray){
        setIntervention({...intervention, workers: idArray})
        dispatch(getCylinderList(idArray.map(e=>e.id)))
    }

    function deleteCylinder(e){
        e.preventDefault()
        const index = Number(e.target.value)
        let usages = [...gasUsages]
        setGasUsages(usages.splice(index,1))
    }

    useEffect(()=>{if(!workersList[0])dispatch(getWorkerList())},[workersList, dispatch])

    return(
        <div className='addInterventionModal'>

            <div className='addInterventionForm'>
            <div className='section'>
                <div className='formTitle aIFtitle'>AGREGAR INTERVENCIÓN</div>
                <div className='button closeButton' onClick={()=>props.close()}>X</div>
            </div>


                <div className='addInterventionSection'>
                    <div className='addInterventionField'>
                        <b>Fecha</b>
                        <input className='formInterventionItemDate'
                            type='date'
                            max={new Date().toISOString().split("T")[0]}
                            onChange={(e)=>setIntervention({...intervention, date:e.target.value})}
                        />
                        {(!intervention.date) && <div className='errorMessage'>Debe ingresarse una fecha menor o igual que hoy.</div>}
                    </div>

                    <div className='addInterventionField'>
                        <b>Hora</b>
                        <input className='formInterventionItemHour'
                        type='time'
                        disabled={!intervention.date}
                        min='00:00'
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
                            key={user?user.id:1}
                            defaultValue = {userData.access==="Worker" ? user : undefined}
                            options={workersList}
                            disabled={!intervention.time}
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
                        onChange={(e)=>setIntervention({...intervention, task:e.target.value})}
                        />
                    {(!intervention.task) &&
                        <div className='errorMessage'>Este campo no puede quedar vacío.</div>}
                </div>
            </div>

            <b>Consumos de GAS</b>
            <AddCylinder cylinderList={cylinderList} disabled={false} create={(cylinder)=>setGasUsages([...gasUsages,cylinder])}/>
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
                    {`TOTAL: ${gasUsages.map(e=>e.total).reduce((a,b)=>a+b,0)}`}
                </div>
            </div>

                <div className="addInterventionField">
                    {errors  && <div className="alert alert-warning" role="alert">{errors}</div>}
                        <button className='button'
                            onClick={()=>getErrors() && saveIntervention()}>
                        AGREGAR INTERVENCIÓN
                        </button>
                    </div>
                </div>

        </div>
    )

}