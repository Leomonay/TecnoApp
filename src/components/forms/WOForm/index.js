import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'reactstrap'
import { getDeviceFromList, searchWODevice } from '../../../actions/deviceActions'
import { getWOOptions, newWorkOrder, resetNewOrder, searchWO, updateOrder } from '../../../actions/workOrderActions'
import DevicePicker from '../../DevicePicker'
import { appConfig } from '../../../config'
import AccordOption from '../../AccordOption'
import './index.css'
import { getWorkerList } from '../../../actions/peopleActions'
import AddIntervention from '../InterventionForm'
import { cloneJson, getShortDate } from '../../../utils/utils'
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
const {headersRef} = appConfig

export default function WorkOrderCreation(){
    const {partialList, selectedWODevice} = useSelector(state=>state.devices)
    const {workOrderOptions,newOrderId, orderDetail, updateResult} = useSelector(state=>state.workOrder)
    const {userData} = useSelector(state=>state.people)
    const [viewDevPicker,setViewDevPicker]=useState(false) //devicePickerBackground
    const [intervForm, setIntervForm] = useState(false)
    const [submitable, setSubmitable] = useState(false)
    const [order, setOrder]=useState({})
    const dispatch = useDispatch()
    const {code} = useParams()
    const isAdmin = userData.access==='Admin'
    const editable = !(orderDetail.statusData && orderDetail.statusData.closed)

    useEffect(()=>code?dispatch&&
        dispatch(searchWO(code))
        :dispatch(resetNewOrder())
    ,[dispatch, code])
    useEffect(()=> {
        dispatch(getWOOptions());
        dispatch(getWorkerList());
        dispatch(resetNewOrder())
    } , [dispatch] )

    useEffect(()=>{
        let check = true;
        const keys=Object.keys(workOrderOptions).filter(e=>e!=='status').concat(['solicitor','phone','description','device'])
        keys.forEach(option => {
            if(!order[option]){check = false}
        });
        setSubmitable(check)
    },[workOrderOptions, order])

    useEffect(()=>{
        if (!order.device) return
        if( (partialList.map(e=>e.code)).includes(order.device) ){
            dispatch(getDeviceFromList(partialList.find(e=>e.code===order.device)))
        }else{
            dispatch(searchWODevice(order.device))
        }
    },[order,partialList,dispatch])

    function setInterventions(intervention){
        let intArray = order.interventions? cloneJson(order.interventions) : []
        intArray.push(intervention)
            setOrder({...order, interventions: intArray})
    }

    function addDescription(e){
        e.preventDefault()
        const index = parseInt(e.target.name)
        let editOrder = cloneJson(order)
        let adition = prompt('Ingrese el texto a agregar')
        if(adition) editOrder.interventions[index].task +=` - ${adition}`
        setOrder(editOrder)
    }

    function removeIntervention(index){
        let json = cloneJson(order)
        let newArray = json.interventions.filter((order,ind)=>ind!==index)
        if (newArray.length===0){
            delete json.interventions
        }else{
            json.interventions=newArray
        }
        setOrder(json)
    }
    
    function selectDevice(device){
        const devInput =document.getElementById('deviceInput')
        const devCode=device||devInput.value
        setOrder({...order,device:devCode})
        dispatch(searchWODevice(devCode))
        devInput.value=devCode
        viewDevPicker&&openCloseDevPicker()
    }

    function openCloseDevPicker(){
        setViewDevPicker(!viewDevPicker)
    }

    function handleSubmit(e){
        e.preventDefault()
        code?
            dispatch(updateOrder(code,order))
            :dispatch(newWorkOrder(order))
    }
    useEffect(()=>{if(orderDetail.code){
        setOrder({
            device: orderDetail.device[0].item,
            supervisor: orderDetail.creationData.supervisor,
            class: orderDetail.class,
            status: orderDetail.statusData.status,
            issue: orderDetail.statusData.issue,
            cause: orderDetail.statusData.cause,
            solicitor: orderDetail.creationData.solicitor.name,
            phone: orderDetail.creationData.solicitor.phone,
            description: orderDetail.description,
            interventions: orderDetail.interventions&&orderDetail.interventions.map(intervention=>{return{
                date: intervention.date.split(' ')[0],
                time: intervention.date.split(' ')[1],
                task: intervention.tasks,
                workers: intervention.workers,
                refrigerant: intervention.gasUsage&&
                    intervention.gasUsage.map((use, index)=>(index===0?{total: use.total}:{cylinder: use.cylinder, total: use.consumption}))
            }})
        })
        document.getElementById('deviceInput').value=orderDetail.device[0].item

    }},[orderDetail])

    return(
        <div className='workOrderBackground'>
            <Form className='workOrderCreation' onSubmit={(e)=>handleSubmit(e)}>
                <div className='formContent'>
                    <div className='formSideBar'>
                        <div className='formDeviceSearch'>
                            <label className='formLabel' id='deviceLabel'>Equipo</label>
                            <input className='formInput' id='deviceInput' placeholder='código de equipo'/>
                            <button className={orderDetail.device&&'disabledButton'} disabled={!!orderDetail.device} onClick={()=>selectDevice()}>BUSCAR</button>
                        </div>
                        <button className={`deviceAdvancedSearch ${orderDetail.device&&'disabledButton'}`} onClick={openCloseDevPicker} disabled={!!orderDetail.device}>Búsqueda avanzada...</button>
                            {viewDevPicker && 
                                <DevicePicker
                                    close={()=>setViewDevPicker(false)}
                                    select={(dev)=>selectDevice(dev)}/>}
                        <div className='deviceWODetail'>
                            {selectedWODevice && selectedWODevice.code === order.device &&
                                ['line', 'name', 'type', 'powerKcal', 'refrigerant' ].map((item, index)=>
                            <label key={index} className='detailItem'><b>{`${appConfig.headersRef[item]}: `}</b>{selectedWODevice[item]}</label>)}
                        </div>
                    </div>

                    {selectedWODevice&&<div className='workOrderDetail formColumn'>
                        <b>DETALLE DE OT</b>
                        <div className='formSection'>
                            <div className='generalWOOptions'>
                                {orderDetail.code?['supervisor', 'status', 'class', 'issue', 'cause', 'solicitor', 'phone', 'description' ].map((item,index)=>
                                    <div key={index}><b>{headersRef[item]}: </b> {order[item]}</div>
                                )
                                :workOrderOptions&&Object.keys(workOrderOptions).map((item, index)=>
                                    {return item!=='status' && 
                                        <AccordOption
                                            key={index}
                                            name={appConfig.headersRef[item]||item}
                                            options={workOrderOptions[item].map(option => option.name || option)}
                                            select={(selected)=>setOrder({...order,
                                                [item] : workOrderOptions[item].find(option => option.name === selected || option === selected)})}
                                            />}
                                    )}

                            </div>
                            {orderDetail.code?
                                <div className='longTextSection'>
                                    <label className='formLabel'>Agregar descripción:</label>
                                    <textarea className='longTextInput' id='workOrderFormDescription' maxLength='150'
                                    placeholder='Contenido a agregar a la descripción'/>
                                    {editable&&<button className='addButton' onClick={(e)=>{
                                        e.preventDefault()
                                        const extraDesc = document.getElementById('workOrderFormDescription')
                                        setOrder({...order,description: order.description +' - '+ extraDesc.value})
                                        extraDesc.value=''
                                    }}>Agregar descripción</button>}
                                    {!order.description && <div className='errorMessage'>
                                        Este campo no puede quedar vacío.
                                    </div>}    
                                </div>
                            :<div className='formColumn'>
                                <div className='formSection'>
                                    <div className='formManualInput'><label className='formLabel'>Solicitante:</label>
                                        <input className='formInput' onChange={(e)=>setOrder({...order,solicitor: e.target.value})}/>
                                        {!order.solicitor && <div className='errorMessage'>
                                            Este campo no puede quedar vacío.
                                        </div>}
                                    </div>
                                    <div className='formManualInput'><label className='formLabel'>Teléfono:</label>
                                        <input className='formInput' onChange={(e)=>setOrder({...order,phone: e.target.value})}/>
                                        {!order.phone && <div className='errorMessage'>
                                            Este campo no puede quedar vacío.
                                        </div>}                                    </div>
                                </div>
                                <div className='longTextSection'>
                                    <label className='formLabel'>Descripción:</label>
                                    <textarea className='longTextInput' id='workOrderFormDescription' maxLength='150'
                                    placeholder='Situación inicial o tareas por realizar'
                                    onChange={(e)=>setOrder({...order,description: e.target.value})}/>
                                    {!order.description && <div className='errorMessage'>
                                        Este campo no puede quedar vacío.
                                    </div>}    
                                </div>
                            </div>}
                        </div>

                        <b>Intervenciones</b>
                        {intervForm && <AddIntervention 
                            select={(data)=>setInterventions(data)}
                            close={()=>setIntervForm(false)}/>}
                        <div className='wOInterventionList'>
                            <div className='gridRow'>
                                <div className='gridHeader' id='dateField'>Fecha</div>
                                <div className='gridHeader' id='workersField'>Personal</div>
                                <div className='gridHeader' id='tasksField'>Tareas</div>
                                <div className='gridHeader' id='refrigerantField'>Gas</div>
                                <div className='gridHeader' id='buttonsField'>Quitar</div>
                            </div>
                            {order.interventions && order.interventions.map((item,index)=>
                            <div className='gridRow' key={index}>
                                <div className='gridField' id='dateField'>
                                    <div className='gridFieldLine'>{getShortDate(item.date)}</div>
                                    <div className='gridFieldLine'>{item.time}</div>
                                </div>
                                <div className='gridField' id='workersField'>{item.workers.map((worker, index)=>
                                    <div className='gridFieldLine' key={index}>{worker.name}</div>
                                )}</div>
                                <div className='gridField' id='tasksField'>
                                    <div>{item.task}
                                    {editable&&<button className='editButton upperRight' name={index} title='Añadir Descripción' onClick={(e)=>addDescription(e)}/>}
                                    </div>
                                </div>
                                <div className='gridField' id='refrigerantField'>
                                    {(item.refrigerant && item.refrigerant.length>=1)?
                                        item.refrigerant.map((cyl, index)=>
                                            <div key={index} className='gridFieldLine'>
                                                <b>{`${index===0?'Total':cyl.cylinder}: `}</b>{`${cyl.total}kg`}
                                            </div>)
                                        :''}
                                </div>
                                <div className='gridField' id='buttonsField'>
                                    <button className='removeButton' onClick={()=>removeIntervention(index)}/>
                                </div>
                            </div>)}

                                {editable&&<button className='addButton' onClick={(e)=>{e.preventDefault();setIntervForm(true)}}>
                                    <b>Agregar intervención</b>
                                </button>}

                        </div>
                    </div>}
                </div>

                {!editable && <div>La OT está cerrada, no admite edición</div>}
                
                {editable&&<button type='submit'
                        className={`addButton ${(!submitable)&&'disabledButton'}`}
                        disabled={!submitable}>
                        <b>Guardar Orden de Trabajo</b>
                    </button>}
                {!isAdmin&&editable&&<button className={submitable?'ok': 'disabledButton'}
                    disabled={!submitable}
                    onClick={(e)=>{
                        e.preventDefault()
                        dispatch(updateOrder(code, {...order, status: 'A Cerrar'}))
                        }}>
                    <b>Solicitar Cierre</b>
                </button>}
                {isAdmin&&editable&&<button className={submitable?'ok': 'disabledButton'}
                    disabled={!submitable}
                    onClick={(e)=>{
                        e.preventDefault()
                        dispatch(updateOrder(code, {...order, status: 'Cerrada'}))
                        }}>
                    <b>Cerrar OT</b>
                </button>}
                {isAdmin&&editable&&<button className={submitable?'ok': 'disabledButton'}
                    disabled={!submitable}
                    onClick={(e)=>{
                        e.preventDefault()
                        dispatch(updateOrder(code, {...order, status: 'Abierta'}))
                        }}>
                    <b>Volver a Pendiente</b>
                </button>}


            </Form>
            {newOrderId&&<div className='creationOK'>
                <div>Se ha creado la orden <b>{ newOrderId }</b></div>
                <Link className='newButton viewNew' to={`/ots/detail/${newOrderId}`}>VER</Link>
                <button className='newButton addOther' onClick={()=>window.location.reload()}>Crear OTRA</button>
            </div>}
            {updateResult&&<div className='creationOK'>
                {updateResult.ok&&<div>Se ha modificado la orden <b>{code}</b></div>}
                {updateResult.error&&<div>Ha ocurrido un error un error: <i>{updateResult.error}</i></div>}
                <Link className='newButton viewNew' to='/ots'>Aceptar</Link>
            </div>}
        </div>
    )
}