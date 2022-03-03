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
        const cylinders = [...allCylinders]
        for (let cylinder of cylinders) cylinder.owner = workersList.find(worker=>worker.id === cylinder.user).name
        console.log('cylinders',cylinders)
        setCylinderList(cylinders)
    },[allCylinders, workersList])

    useEffect(()=>console.log('intervention', intervention),[intervention])
    useEffect(()=>console.log('gasUsages', gasUsages),[gasUsages])

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

    function refrigerant(index, field, value){
        let gas = [...intervention.refrigerant] || []
        gas[index][field]=value
        gas[index].total = gas[index].init - gas[index].final || undefined

        const consTotal = gas.filter(item => item.cylinder === gas[index].cylinder ).map(item=>item.total).reduce((prev, curr) => prev + curr, 0)
        if (consTotal>16){alert(`El consumo total (${consTotal}) no puede ser mayor que la carga inicial (${16})`)
            gas[index].total = undefined
            gas[index].final = undefined
        }
        setIntervention({...intervention, refrigerant: gas})
        checkAddButton(gas)
    }

    function checkAddButton(gas){
        const totals = gas.filter(cylinder=>cylinder.total).length
        setNewCyl (totals>=1 && totals === gas.length)
    }

    function addCylinder(){
        let gas = [...intervention.refrigerant]
        gas.push({})
        setIntervention({...intervention, refrigerant: gas})
        setNewCyl(false)
    }

    function removeCylinder(index){
        let gas = [...intervention.refrigerant]
        gas = gas.filter((e,ind)=>ind!==index)
        checkAddButton(gas)
        if (!gas[0]){
            setFreon(false)
            gas = [{}]
        }
        setIntervention({...intervention, refrigerant: gas})
    }

    function saveIntervention(){
        props.select(intervention)
        props.close()
    }

    function setCylinder(index,code){
        let gas = [...intervention.refrigerant]
        if(!code){
            gas[index] = {cylinder: '', init: '', final:''}
        }else{
            const usages = intervention.refrigerant.filter(e=>{ 
                return e.cylinder === code})
            const consumptions = usages ? usages.map(e=>e.final) : undefined
            const startStock = allCylinders.find(e=>e.code === code).currentStock


            const max = consumptions[0] ? Math.min(...consumptions) :  startStock    
            gas[index] = {cylinder: code, init: max, final:''}
            setMax(max)
        }
        console.log(gas)    
        setIntervention({...intervention, refrigerant: gas })
        
    }

    function refrigerantCharges(){
        if (!freon && !intervention.refrigerant) setIntervention({...intervention,refrigerant:[{}]})
        if (freon && !intervention.refrigerant.find(e=>e.cylinder)){
            const temp = cloneJson(intervention)
            delete temp.refrigerant
            setIntervention(temp)
        }
        setFreon(!freon)
    }

    function handlePeople(idArray){
        setIntervention({...intervention, workers: idArray})
        dispatch(getCylinderList(idArray.map(e=>e.id)))
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
            <b>GAS</b>
                <AddCylinder cylinderList={cylinderList} disabled={false} create={(cylinder)=>setGasUsages([...gasUsages,cylinder])}/>
            {gasUsages.map((cylinder, index)=>
            <div className='formListItem fr211' key={index}>
                <div className='listField'>{`${cylinder.code} (${cylinder.owner})`}</div>
                <div className='listField'>{`${cylinder.total} kg.`}</div>
                <div className='listField'>
                    <button className="removeButton delCylinder" onClick={()=>setGasUsages(gasUsages.split(index,1))}/>
                </div>
            </div>)}



            <div className='addInterventionSection'>
                <div className="addInterventionField">
                    <button className={`formOpenSection ${freon?'closeSection':'openSection'}`}
                        disabled = {!intervention.task}
                        onClick={()=>refrigerantCharges()}>
                        Gas
                    </button>
                    {(freon && intervention.refrigerant)&& 
                    <div className="addInterventionField">
                        <div className='gasAISection'>
                            {['N° Garrafa (responsable)', 'Peso Inicial', 'Peso Final', 'Total', 'Quitar'].map((label, index)=>
                                    <label key={index} className='gasLabelTitle'>{label}</label>)}
                        </div>
                        
                        {intervention.refrigerant.map((refri,index)=>{
                            const cylinder = intervention.refrigerant[index]
                            const notLast = index  !== intervention.refrigerant.length-1

                            return<div className='gasAISection' key={index}>
                                <select className='aIKGInput' key={index} defaultValue={cylinder.cylinder}
                                    onChange={(event)=>setCylinder(index, event.target.value)}
                                    readOnly={notLast}>
                                    <option value=''>Elegir garrafa</option>
                                    {allCylinders.map(cylinder=>{
                                        const owner = workersList.find(worker=>worker.id === cylinder.user).name
                                        return<option key={cylinder.code} value={cylinder.code}>
                                            {`${cylinder.code} (${owner})`}
                                        </option>})}
                                </select>
                                <KGinput select={(value)=>refrigerant(index,'init', value)}
                                    key = {intervention.refrigerant[index].init || 2}
                                    object={cylinder}
                                    defaultValue={cylinder.init || max}
                                    disabled={!cylinder.cylinder}
                                    readOnly={notLast}
                                    max={max}
                                    min='2'
                                    step='0.1'/>
                                <KGinput select={(value)=>refrigerant(index,'final', value)}
                                    key = {intervention.refrigerant[index].final || 3}
                                    object={cylinder}
                                    disabled={!cylinder.init}
                                    defaultValue={cylinder.final}
                                    readOnly={notLast}
                                    max='16'
                                    min='2'
                                    step='0.1'/>
                                <input  className='aIKGInput'
                                    key = {intervention.refrigerant[index].total || 4}
                                    readOnly={true}
                                    defaultValue={cylinder.total}
                                    placeholder='gas (kg.)'/>
                                <div className='aIKGInput'>
                                    <button className='button removeButton delCylinder' onClick={()=>removeCylinder(index)}/>
                                </div>
                            </div>})}
                        {newCyl&&<button className='button addButton' onClick={()=>addCylinder()}><b>Agregar Garrafa</b></button>}    
                    </div>}

                <div className="addInterventionField">
                    {errors  && <div className="alert alert-warning" role="alert">{errors}</div>}
                        <button className='button'
                            onClick={()=>getErrors() && saveIntervention()}>
                        AGREGAR INTERVENCIÓN
                        </button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )

}