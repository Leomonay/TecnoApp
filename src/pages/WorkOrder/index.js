import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { dateOrder, selectTask } from "../../actions/planActions"
import { deviceActions } from "../../actions/StoreActions"
import { getWOOptions, newIntervention, newWorkOrder, searchWO, updateOrder } from "../../actions/workOrderActions"

import InterventionList from "../../components/lists/InterventionList"
import WOProgress from "../../components/progress/WOProgresBar"
import { ErrorModal } from "../../components/warnings"
import WarningErrors from "../../components/warnings/WarningErrors"
import AddTextForm from "../../components/forms/AddText"
import {FormInput, FormSelector} from "../../components/forms/FormInput"
import AddIntervention from "../../components/forms/InterventionForm"
import './index.css'
import DeviceList from "../../components/lists/DeviceList"

function buildDevice(device){
//order detail
    if (!device) return {}
    if(device.power){
        device.powerAndType=`${device.type} (${ device.power+' '+ device.unit }) ${device.refrigerant}`
    }
    return device
}

export default function WorkOrder(){
//global variables
    const {otCode} = useParams()
    const {userData} = useSelector(state=>state.people)
    const {selectedDevice, deviceResult} = useSelector(state=>state.devices)
    const {plan, selectedTask} = useSelector((state=>state.plan))
    const {workOrderOptions, orderDetail} = useSelector(state=>state.workOrder)

//openers
    const [selectDate, setSelectDate] = useState(false)
    const [pickDevice, setPickDevice] = useState(false)
    const [intForm, setIntForm] = useState(false)
    const [editDesc, setEditDesc] = useState(false)
    const [errors, setErrors]=useState(false)
    const [warnings, setWarnings]=useState(false)

//local data states
    const [planDates, setPlanDates] = useState([])
    const [interventions, setInterventions] = useState([])
    const [device, setDevice] = useState({})
    const [deviceCode, setDeviceCode] = useState('')
    const [order,setOrder] = useState({})
    const [update, setUpdate] = useState({})
    const [supervisor, setSupervisor] = useState(undefined)

    const [permissions, setPermissions] = useState({woData:false,woDescription:false,editInterventions:true})
    const dispatch = useDispatch()


    useEffect(()=>console.log('order',order),[order])

    useEffect(()=> setPlanDates(
        plan.filter(task=>{
            const today = new Date()
            return task.code===device.code && (new Date (task.date)) <= today.setDate(today.getDate()+7)
        }).map(task=>({...task, localDate: (new Date (task.date)).toLocaleDateString()}))
    ) , [plan, device ])

    useEffect(()=>{
    if(!order.code)return
    setPermissions({
        woData: (order.code && userData.access!=='Admin'),
        woDescription: order.code && !order.closed 
            && (userData.id===order.userId || supervisor===userData.id || userData.access==='Admin'),
        editInterventions: 
            !order.code
            || userData.access==='Admin'
            || (!order.closed && (supervisor===userData.id || order.userId===userData.id) )
    })},[order,userData, supervisor])

    useEffect(()=>{
        if(!selectedTask)return
        setSelectDate(!!selectedTask.date)
        if(!supervisor) setSupervisor(selectTask.supervisor)
    },[selectedTask, supervisor])

    useEffect(()=>otCode && dispatch(searchWO(otCode)),[otCode, dispatch])
    
    useEffect(()=>{
        setOrder(orderDetail)
        if(!orderDetail.code)return
        const {device} = orderDetail
        setDevice( device?buildDevice(device):{})
        setDeviceCode(device.code) 
        setSupervisor(orderDetail.supervisor)
        dispatch(selectTask(plan.find(date=>date.id === orderDetail.taskDate)))
        setOrder(orderDetail)
        setInterventions(orderDetail.interventions)
    },[orderDetail, dispatch, plan])

    useEffect(()=>{
        if(!selectedDevice.code)return
        if (!otCode && selectedDevice.servicePoints && selectedDevice.servicePoints.length === 1){ 
            setOrder({servicePoint: selectedDevice.servicePoints[0]})
        }
        setDeviceCode( selectedDevice.code || '')
        setDevice( buildDevice(selectedDevice) ) 
    },[selectedDevice, dispatch, otCode])

    useEffect(()=>dispatch(getWOOptions()),[dispatch])

    function searchCode(e){
        e.preventDefault()
        dispatch(deviceActions.getDetail(deviceCode))
    }

    function handleDevCode(e){
        e.preventDefault()
        const {value} = e.target
        value && setDeviceCode(value)
        setDevice({})
        // if(!value)dispatch(deviceActions.resetDevice())
    }

    function handleValue(e, item){
        e.preventDefault()
        let object = otCode ? {...update} : {...order}
        const {value} = e.target
        if (!value){
            otCode ? object[item]=null : delete object[item]
        }else{
            object[item]=value
        }
        otCode ? setUpdate ({object}) : setOrder(object)
    }

    function checkErrors(){
        const errors = []
        const warnings = []
        // if (!supervisor && selectedTask) setSupervisor(selectedTask.supervisor)
        
        if(!deviceCode) errors.push('Debe seleccionar un equipo') 
        if(!supervisor) errors.push('Debe seleccionar un supervisor')
        if(!order.clientWO) warnings.push('¿Seguro que desea guardar la orden sin una OT Cliente?')
        if(!order.class) errors.push('Debe indicar la clase de la orden')
        if(!order.issue) errors.push('Debe indicar el problema')
        if(!order.cause) errors.push('Debe indicar la causa')
        if(!order.solicitor) errors.push('Debe indicar quién solicitó la orden')
        if(!order.phone) warnings.push('¿Seguro que desea guardar la orden sin un teléfono asociado?')
        if(!order.servicePoint) warnings.push('¿Seguro que desea guardar la orden sin un lugar de servicio asociado?')
        if(!order.description) errors.push('Debe asignar una descripción')
        if(!interventions || !interventions[0]) warnings.push('¿Seguro que desea guardar la orden sin intervenciones?')
        if(!order.completed || order.completed === 0 || (!!order.Detail && order.completed === orderDetail.completed)) warnings.push('¿Seguro que desea guardar la orden sin modificar el avance?')

        if (errors[0]){
            setErrors(errors)
        }else{
            setErrors(false)
            if (warnings[0]){
                setWarnings(warnings)
            }else{
                handleSave()
            }
        }
    }

    function handleAdvancedSearch(e){
        e.preventDefault()
        setPickDevice(true)
    }

    
    function handleSave(){
        //dipatch update taskDate if otCode, add or remove if not
        if(otCode){
            dispatch(updateOrder(otCode,{...update, supervisor}))
            dispatch(dateOrder(otCode,update.taskDate))
        }else{
            const sendOrder = {...order, user:userData.user, interventions, device:deviceCode, supervisor}
            dispatch(newWorkOrder(sendOrder))
        }
    }

    function selectTaskDate(e){
        e.preventDefault()
        const id = e.target.value
        otCode?
            setUpdate({...update, taskDate: id})
            :setOrder({...order,taskDate: id})
    }

    function createIntervention(data){
        otCode?
            dispatch(newIntervention(otCode,data))
            :setInterventions([...interventions,data])
    }

    function getDate(date){
        const newDate = new Date(date)
        return `${newDate.toLocaleDateString()} ${newDate.getHours()}:${newDate.getMinutes()}`
    }

    return(
        <div className="WOBackground">
            {warnings && <WarningErrors warnings={warnings} close={()=>setWarnings(false)} proceed={()=>handleSave()}/>}
            <div className='WOupperSection'>
                
                <div className="WOcolumn">

                    <section className="WOsection">

                    {(otCode || planDates[0]) && <section>
                        {otCode && <div className="WOrow">
                            <FormInput label='N° OT' defaultValue={otCode} readOnly={true}/>
                            <FormInput label='Estado' defaultValue={orderDetail.status} readOnly={true}/>
                        </div>}

                        {(planDates[0] || order.taskDate )&& <div className={`WOformField text-center WOformImportant ${(selectDate || order.taskDate)?'bg-nav':'bg-grey'}`}>
                                <input className='WOcheck' type='checkBox'
                                    defaultChecked={(selectedTask && selectedTask.date) || order.taskDate }
                                    onChange={(e)=>setSelectDate(e.target.checked)}
                                    disabled={permissions.woData}/>
                                <label>{`${selectDate?'TAREA DE PLAN':'¿TAREA DE PLAN?'}`}</label>
                                {selectDate || order.taskDate?
                                    <FormSelector key={selectedTask} label='Fecha Plan'
                                        defaultValue={selectedTask ? selectedTask.id :undefined }
                                        options={planDates}
                                        valueField='id'
                                        captionField='localDate'
                                        onSelect={(e)=>{selectTaskDate(e)}}/>
                                    :<label className='WOformInput'/>}
                        </div>}

                    </section>}

                        {pickDevice && <div className='formModal'>
                            <div className="container bg-light m-2" style={{maxHeight: '100%', overflowY:'auto'}}>
                                <DeviceList close={()=>setPickDevice(false)}/>
                                </div>
                            </div>}

                        <div className='formTitle'>Datos del equipo</div>
                        <form className="WOrow" onSubmit={searchCode}>
                                <FormInput label='Cod.Eq.'
                                    defaultValue={deviceCode}
                                    placeholder={'código completo'}
                                    readOnly={!!otCode}
                                    changeInput={(e)=>handleDevCode(e)}/>
                                {!device.code &&
                                    <button type='submit' className='WOsearchButton button' disabled={!deviceCode}> BUSCAR </button>}
                                {!device.code && <button className='WOsearchButton button' onClick={handleAdvancedSearch}>BÚSQUEDA AVANZADA</button>}
                                {device.code &&  <button className='WOsearchButton button'
                                    disabled={permissions.woData} 
                                    onClick={handleDevCode}>
                                    <i className="fas fa-backspace"/>
                                </button>}
                            {deviceResult.error && <ErrorModal message={`Equipo código '${deviceCode}' no encontrado`} close={()=>dispatch(deviceActions.resetResult())}/>}
                        </form>
                            <FormInput label='Equipo' defaultValue={device.name} readOnly={true}/>
                        <div className="section">
                            <FormInput label='Planta' defaultValue={device.plant} readOnly={true}/>
                            <FormInput label='Area' defaultValue={device.area} readOnly={true}/>
                        </div>
                            <FormInput label='Linea' defaultValue={device.line} readOnly={true}/>
                            <FormInput label='Tipo' defaultValue={device.powerAndType} readOnly={true}/>
                        <div className="section">
                            <FormInput label='Categoría' defaultValue={device.category} readOnly={true}/>
                            <FormInput label='Servicio' defaultValue={device.service} readOnly={true}/>
                        </div>
                    </section>
                </div>

                <div className="WOcolumn">
                    <section className="WOsection">
                        <div className='formTitle'>Detalle de la orden de trabajo</div>
                        <div className="WOrow">
                            {(workOrderOptions.supervisor || order.supervisor )&&
                            <FormSelector key={supervisor} label='Supervisor' 
                                defaultValue={supervisor}
                                options={workOrderOptions.supervisor}
                                valueField='id'
                                captionField='name'
                                onSelect={(e)=>setSupervisor(e.target.value)}
                                disabled={permissions.woData || !deviceCode}/>
                            }
                            <FormInput label='OT Cliente' defaultValue={order.clientWO}
                                readOnly={permissions.woData}
                                changeInput={(e)=>handleValue(e,'clientWO')}/>
                        </div>
                        {workOrderOptions&& Object.keys(workOrderOptions).map( (option,index)=>
                            (option!=='supervisor' &&
                                <FormSelector key={order[option] || index} label={option} 
                                    defaultValue={order[option]}
                                    options={workOrderOptions[option].sort((a,b)=>a>b?1:-1)}
                                    onSelect={(e)=>handleValue(e,option)}
                                    disabled={permissions.woData}/>))}
                        <div className="section">
                            <FormInput label='Solicitó' defaultValue={order.solicitor}
                                readOnly={permissions.woData || !order.cause || !order.issue || !order.class}
                                changeInput={(e)=>handleValue(e,'solicitor')}/>
                            <FormInput label='Teléfono' defaultValue={order.phone}
                                readOnly={permissions.woData || !order.cause || !order.issue || !order.class}
                                changeInput={(e)=>handleValue(e,'phone')}/>
                        </div>
                        {!!otCode&&<FormInput label='Creación' key={order.user}
                            defaultValue={`${ getDate(order.regDate)} por ${order.user}`}
                            readOnly={permissions.woData}
                            />}

                        <FormSelector key={device.servicePoints} label='L. Servicio' 
                            defaultValue={order.servicePoint}
                            options={device.servicePoints}
                            onSelect={(e)=>handleValue(e,'servicePoint')}
                            disabled={permissions.woData}/>
                    </section>
                </div>

                <div className="WOcolumn">
                    <section className="WOsection">
                            <div className='formTitle'>Observaciones</div>
                            <textarea className="WODescription" 
                                onChange={(e)=>handleValue(e,'description')}
                                readOnly={(!!otCode && userData.access!=='Admin')|| !order.solicitor}
                                defaultValue={order.description}/>
                            {permissions.woDescription&&
                                <button className='button addButton' onClick={()=>setEditDesc(true)}>Agregar comentario</button>}
                            {editDesc&&<AddTextForm user={userData.user} 
                                select={(text)=>setOrder({...order,description: order.description+' || '+text})}
                                close={()=>setEditDesc(false)}
                                />}
                            {/* bloquear para OT Cerradas */}
                    </section>
                </div>

            </div>

            <section className='WOsection interventionSection'>
                <div className='formTitle'>Intervenciones</div>
                <div className='WOformField woInterventionField' >
                    
                    <InterventionList
                        key={interventions.length}
                        interventions={ update.interventions?[...interventions,...update.interventions]:interventions }
                        permission={permissions.editInterventions && order.description}
                        onDelete={()=>{}}
                        openAdd={()=>setIntForm(true)}/>
                    
                    {intForm&& <AddIntervention
                        select={(data)=>createIntervention(data)}
                        close={()=>setIntForm(false)}/>}

                </div>
            </section>

            <section  className="WOsection wOProgress">
                <label className="formLabel longWord">Avance OT</label>
                <WOProgress key={`${orderDetail.completed}`||1}
                    errorCond = {order.interventions && order.interventions.length>0}
                    defaultValue={`${orderDetail.completed || 0}`}
                    disabled={permissions.woData}
                    select={(e)=>handleValue(e,'completed')}/>
            </section>

            {errors && <div className="alert alert-danger" role="alert">
                <b>Ooops! Ocurrieron errores:</b>
                <ul>{errors.map((e,index)=><li key={index}>{e}</li>)}</ul>
            </div>}

            {!permissions.woData && <section  className="formField">
                <button className = 'button' onClick={checkErrors}>Guardar Cambios</button>
                {otCode&&<button className='button' onClick={()=>{}}>Solicitar Cierre</button>}                
            </section>}

        </div>
    )

}