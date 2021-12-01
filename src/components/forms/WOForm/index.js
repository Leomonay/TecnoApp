import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'reactstrap'
import { getDeviceFromList, searchWODevice } from '../../../actions/deviceActions'
import { getWOOptions, newWorkOrder, resetNewOrder } from '../../../actions/workOrderActions'
import DevicePicker from '../../DevicePicker'
import { appConfig } from '../../../config'
import AccordOption from '../../AccordOption'
import './index.css'
import { getWorkerList } from '../../../actions/peopleActions'
import AddIntervention from '../InterventionForm'
import { cloneJson, getShortDate } from '../../../utils/utils'
import {Link} from 'react-router-dom'

export default function WorkOrderCreation(){
    const {partialList, selectedWODevice} = useSelector(state=>state.devices)
    const {workOrderOptions,newOrderId} = useSelector(state=>state.workOrder)
    const [viewDevPicker,setViewDevPicker]=useState(false) //devicePickerBackground
    const [intervForm, setIntervForm] = useState(false)
    const [submitable, setSubmitable] = useState(false)
    const [order, setOrder]=useState({})
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(getWOOptions());
        dispatch(getWorkerList());
        dispatch(resetNewOrder())} , [dispatch] )

    useEffect(()=>{
        let check = true;
        const keys=Object.keys(workOrderOptions).filter(e=>e!=='status').concat(['solicitor','phone','description','device'])
        console.log('keys',keys)
        keys.forEach(option => {
            if(!order[option]){check = false}
        });
        setSubmitable(check)
    },[workOrderOptions, order])
    useEffect(()=>console.log(Object.keys(order)),[order])

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
        dispatch(newWorkOrder(order))
    }

    return(
        <div className='workOrderBackground'>
            <Form className='workOrderCreation' onSubmit={(e)=>handleSubmit(e)}>
                <div className='formContent'>
                    <div className='formSideBar'>
                        <div className='formDeviceSearch'>
                            <label className='formLabel' id='deviceLabel'>Equipo</label>
                            <input className='formInput' id='deviceInput' placeholder='código de equipo'/>
                            <div className='button' onClick={()=>selectDevice()}>BUSCAR</div>
                        </div>
                        <div className='button deviceAdvancedSearch' onClick={openCloseDevPicker}>Búsqueda avanzada...</div>
                            {viewDevPicker && 
                                <DevicePicker
                                    close={()=>setViewDevPicker(false)}
                                    select={(dev)=>selectDevice(dev)}/>}
                        <div className='deviceWODetail'>
                            {selectedWODevice && selectedWODevice.code === order.device &&['line', 'name', 'type', 'powerKcal', 'refrigerant' ].map((item, index)=>
                            <label key={index} className='detailItem'><b>{`${appConfig.headersRef[item]}: `}</b>{selectedWODevice[item]}</label>)}
                        </div>
                    </div>

                    {selectedWODevice&&<div className='workOrderDetail formColumn'>
                        <b>DETALLE DE OT</b>
                        <div className='formSection'>
                            <div className='generalWOOptions'>
                                {workOrderOptions&&Object.keys(workOrderOptions).map((item, index)=>
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
                            <div className='formColumn'>
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
                            </div>
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
                                <div className='gridField' id='tasksField'>{item.task}</div>
                                <div className='gridField' id='refrigerantField'>
                                    {(item.refrigerant && item.refrigerant.length>=1)?
                                        item.refrigerant.map((cyl, index)=>
                                            <div key={index} className='gridFieldLine'>
                                                <b>{`${cyl.cylinder}: `}</b>{`${cyl.total}kg`}
                                            </div>)
                                        :''}
                                </div>
                                <div className='gridField' id='buttonsField'>
                                    <div className='button removeButton' onClick={()=>removeIntervention(index)}/>
                                </div>
                            </div>)}

                                <div className='button addButton' onClick={()=>setIntervForm(true)}>
                                    <b>Agregar intervención</b>
                                </div>

                        </div>
                    </div>}
                </div>
                {submitable?
                    <button type='submit' className={`button addButton`}>
                        <b>Guardar Orden de Trabajo</b>
                    </button>
                    :<div  className={`button disabledButton`}>
                        <b>Guardar Orden de Trabajo</b>
                    </div>   
                    }
            </Form>
            {newOrderId&&<div className='creationOK'>
                <div>Se ha creado la orden <b>{ newOrderId }</b></div>
                <Link className='newButton viewNew' to={`/ots/detail/${newOrderId}`}>VER</Link>
                <div className='newButton addOther' onClick={()=>window.location.reload()}>Crear OTRA</div>
            </div>}
        </div>
    )
}