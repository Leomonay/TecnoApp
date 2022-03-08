import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getDeviceFromList, searchWODevice } from "../../../actions/deviceActions"
import { addOrdertoDate, selectTask } from "../../../actions/planActions"
import { getWOOptions, newIntervention, newWorkOrder, searchWO, updateOrder } from "../../../actions/workOrderActions"

import InterventionList from "../../lists/InterventionList"
import DevicePicker from "../../pickers/DevicePicker"
import WOProgress from "../../progress/WOProgresBar"
import AddTextForm from "../AddText"
import {FormInput, FormSelector} from "../FormInput"
import AddIntervention from "../InterventionForm"
import './index.css'

export default function WorkOrder(){
    const {otCode} = useParams()
    const {userData} = useSelector(state=>state.people)
    const {selectedWODevice} = useSelector(state=>state.devices)
    const {plan, selectedTask} = useSelector((state=>state.plan))
    const {workOrderOptions, orderDetail} = useSelector(state=>state.workOrder)
    const dispatch = useDispatch()
    const [planDates, setPlanDates] = useState([])
    const [selectDate, setSelectDate] = useState(false)
    const [interventions, setInterventions] = useState([])
    const [pickDevice, setPickDevice] = useState(false)

    const [device, setDevice] = useState({})
    const [deviceCode, setDeviceCode] = useState('')
    const [power, setPower] = useState(undefined)
    const [order,setOrder] = useState({})
    const [intForm, setIntForm] = useState(false)
    const [editDesc, setEditDesc] = useState(false)

    const [update, setUpdate] = useState({})
    const [task, setTask] = useState({})

    const [permissions, setPermissions]=useState({woData:false,woDescription:false,editInterventions:true})

    useEffect(()=> setPlanDates(
        plan.filter(task=>{
            const today = new Date()
            return task.code===device.code && (new Date (task.date)) <= today.setDate(today.getDate()+7)
        }).map(task=> (new Date (task.date)))
    ) , [plan, device ])

    useEffect(()=>console.log('task', task),[task])

    useEffect(()=>{
    if(!order.code)return    
    console.log('!order.code',!order.code)
    console.log("userData.access==='Admin'",userData.access==='Admin')
    
    setPermissions({
        woData: !!order.code && userData.access!=='Admin',
        woDescription: order.code&&!order.closed&&(userData.id===order.userId || order.supervisor===userData.id || userData.access==='Admin'),
        editInterventions: 
            !order.code
            || userData.access==='Admin'
            || (!order.closed && (order.supervisor===userData.id || order.userId===userData.id) )
    })},[order,userData])

    useEffect(()=>console.log('order',order),[order])


    useEffect(()=>{
        if(!selectedTask)return
        setSelectDate(!!selectedTask.date)
        setTask(selectedTask)
    },[selectedTask])

    useEffect(()=>otCode && dispatch(searchWO(otCode)),[otCode, dispatch])
    
    useEffect(()=>{
        setOrder(orderDetail)
        if(!orderDetail.code)return
        const {device} = orderDetail 
        setDevice(device || [])
        setPower(device && device.power ?
            `${device.type} (${ device.power+' '+ device.unit } ${device.refrigerant})`
            : undefined)
        const code = device ? device.code : undefined
        if(code) dispatch(searchWODevice(code))
        setOrder(orderDetail)
        setInterventions(orderDetail.interventions)
    },[orderDetail, dispatch])

    useEffect(()=>{
        // setDevice(selectedWODevice || [])
        if (selectedWODevice && selectedWODevice.powerKcal){
            let power = selectedWODevice.powerKcal
            power =  power>=9000 ? selectedWODevice.powerTnRef + ' TR' : selectedWODevice.powerKcal + ' Kcal'
            setPower(`${selectedWODevice.type} (${ power }) - Refrigerante: ${selectedWODevice.refrigerant}`)
        }else{
            setPower(undefined)
        }
        setDeviceCode( selectedWODevice ? selectedWODevice.code : '')
        setDevice(selectedWODevice || {})
        selectedWODevice && selectedWODevice.code && dispatch(getWOOptions())
    },[selectedWODevice, dispatch])

    function searchCode(e){
        e.preventDefault()
        dispatch(searchWODevice(deviceCode))
    }

    function handleDevCode(e){
        e.preventDefault()
        selectedWODevice && dispatch(getDeviceFromList(null))
        setDeviceCode(e.target.value)
    }

    function handleValue(e, item){
        e.preventDefault()
        let object = otCode ? {...update} : {...order}
        const {value} = e.target
        if (!value){
            otCode ? delete object[item] : object[item] = null
        }else{
            object[item]=value
        }
        otCode ? setUpdate ({object}) : setOrder(object)
    }

    function handleSave(){
        if(otCode){
            dispatch(updateOrder(otCode,update))
            if(task.date) dispatch(addOrdertoDate(otCode, task.date))
        }else{
            const sendOrder = {...order, user:userData.user, interventions, device:deviceCode}
            if(task.date) sendOrder.task = task
            dispatch(newWorkOrder(sendOrder))
        }
    }

    function selectTaskDate(date){
        const planDate = planDates.find(planDate=>{ return(new Date (planDate)).toLocaleDateString() === date})
        dispatch(selectTask(date? planDate : {}))

        // !date ? setTask({})
        // :setTask({
        //     device:deviceCode,
        //     date : planDate,
        //     plant:device.plant,
        //     strategy:plan.find(task=>task.code===device.code).strategy})
    }

    function createIntervention(data){
        if(otCode){
            dispatch(newIntervention(otCode,data))
        }else{
            setInterventions([...interventions,data])
        }
    }

    function getDate(date){
        const newDate = new Date(date)
        return `${newDate.toLocaleDateString()} ${newDate.getHours()}:${newDate.getMinutes()}`
    }

    return(
        <div className="WOBackground">
            <div className='WOupperSection'>
                
                <div className="WOcolumn">

                    <section className="WOsection">

                    {(otCode || planDates[0]) && <section>
                        {otCode && <div className="WOrow">
                            <FormInput label='N° OT' defaultValue={otCode} readOnly={true}/>
                            <FormInput label='Estado' defaultValue={orderDetail.status} readOnly={true}/>
                        </div>}

                        {planDates[0]&&<div className={`WOformField WOformImportant ${selectDate?'bg-darkRed':'bg-grey'}`}>
                            <div className="WOformField">
                                <input className='WOcheck' type='checkBox' defaultChecked={!!selectedTask.date}
                                    onChange={(e)=>setSelectDate(e.target.checked)}/>
                                <label>{`${selectDate?'TAREA DE PLAN':'¿TAREA DE PLAN?'}`}</label>
                            </div>
                            {selectDate?
                                <FormSelector label='Fecha Plan'
                                    defaultValue={task.date? (new Date (task.date)).toLocaleDateString():undefined}
                                    options={planDates.map(e=>e.toLocaleDateString())}
                                    onSelect={(e)=>{selectTaskDate(e.target.value)}}/>
                                :<label className='WOformInput'/>}
                        </div>}

                    </section>}

                        {pickDevice && <DevicePicker
                            close={()=>setPickDevice(false)}
                            select={(value)=>dispatch(searchWODevice(value))}/>}


                        <div className='formTitle'>Datos del equipo</div>
                        <div className="WOrow">
                            <FormInput label='Cod.Eq.' defaultValue={deviceCode} placeholder={'Ingrese equipo'} readOnly={!!otCode} changeInput={(e)=>handleDevCode(e)}/>
                            {!selectedWODevice && <button className='WOsearchButton button' onClick={(e)=>searchCode(e)}> BUSCAR </button>}
                            {!selectedWODevice && <button className='WOsearchButton button' onClick={()=>setPickDevice(true)}>BÚSQUEDA AVANZADA</button>}
                            {selectedWODevice &&  <button className='WOsearchButton button'
                                disabled={permissions.woData} 
                                onClick={(e)=>handleDevCode(e)} value=''>
                                <i className="fas fa-backspace"/>
                            </button>}
                        </div>
                            <FormInput label='Equipo' defaultValue={device.name} readOnly={true}/>
                        <div className="section">
                            <FormInput label='Planta' defaultValue={device.plant} readOnly={true}/>
                            <FormInput label='Area' defaultValue={device.area} readOnly={true}/>
                        </div>
                            <FormInput label='Linea' defaultValue={device.line} readOnly={true}/>
                            <FormInput label='Tipo' defaultValue={power} readOnly={true}/>
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
                            {workOrderOptions.supervisor&&
                            <FormSelector key={order.supervisor} label='Supervisor' 
                                defaultValue={order.supervisor}
                                options={workOrderOptions.supervisor}
                                valueField='id'
                                captionField='name'
                                onSelect={(e)=>handleValue(e,'supervisor')}
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
                                    disabled={permissions.woData || !order.supervisor}/>))}
                        <div className="section">
                            <FormInput label='Solicitó' defaultValue={order.solicitor}
                                readOnly={permissions.woData || !order.cause || !order.issue || !order.class}
                                changeInput={(e)=>handleValue(e,'solicitor')}/>
                            <FormInput label='Teléfono' defaultValue={order.phone}
                                readOnly={permissions.woData || !order.cause || !order.issue || !order.class}
                                changeInput={(e)=>handleValue(e,'phone')}/>
                        </div>
                        {!!otCode&&<FormInput label='Creación' key={order.user}
                            defaultValue={`${ getDate(order.regDate) } por ${order.user}`}
                            readOnly={permissions.woData}
                            />}

                        <FormSelector key={device.servicePoints} label='L. Servicio' 
                            defaultValue={order.servicePoint ? order.servicePoint
                                :(device.servicePoints && device.servicePoints.length===1?
                                    device.servicePoints[0]
                                    :undefined)}
                            options={device.servicePoints}
                            onSelect={(e)=>handleValue(e,'servicePoint')}
                            disabled={permissions.woData}/>
                    </section>
                </div>

                <div className="WOcolumn">
                    <section className="WOsection">
                        <div className="WODescriptionSection">
                            <div className='formTitle'>Observaciones</div>
                            <textarea className="WODescription" 
                                onChange={(e)=>handleValue(e,'description')}
                                readOnly={(!!otCode && userData.access!=='Admin')|| !order.solicitor}
                                defaultValue={order.description}/>
                            {permissions.woDescription&&<button className='button addButton' onClick={()=>setEditDesc(true)}>Agregar comentario</button>}
                            {editDesc&&<AddTextForm user={userData.user} 
                                select={(text)=>setOrder({...order,description: order.description+' || '+text})}
                                close={()=>setEditDesc(false)}
                                />}
                            {/* bloquear para OT Cerradas */}
                        </div>
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

            <section  className="WOsection">
                <button className = 'button' onClick={handleSave}>Guardar Cambios</button>
                {otCode&&<button className='button' onClick={()=>{}}>Solicitar Cierre</button>}                
            </section>

        </div>
    )

}