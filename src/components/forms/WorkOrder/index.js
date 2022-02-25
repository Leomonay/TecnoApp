import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getDeviceFromList, searchWODevice } from "../../../actions/deviceActions"
import { addOrdertoDate } from "../../../actions/planActions"
import { getWOOptions, newWorkOrder, searchWO, updateOrder } from "../../../actions/workOrderActions"

import {appConfig} from "../../../config"
import InterventionList from "../../lists/InterventionList"
import DevicePicker from "../../pickers/DevicePicker"
import WOProgress from "../../progress/WOProgresBar"
import AddIntervention from "../InterventionForm"
import './index.css'
const {headersRef} = appConfig

function WOFormField(props){
    const {label, defaultValue, changeInput, readOnly}=props
    return(
        <div className='WOformField'>
            <label className="WOformLabel">{label}</label>
            <input className="WOformInput" defaultValue={defaultValue} readOnly={readOnly}
                onChange={(e)=>changeInput&&changeInput(e)}/>
        </div>
    )
}

function WOFormSelector(props){
    const {label, defaultValue, valueField, captionField, options, onSelect, readOnly, disabled}=props
    return(
        <div className='WOformField'>
            <label className="WOformLabel">{headersRef[label] || label}</label>
            <select className="WOformInput" defaultValue={defaultValue} readOnly={readOnly}
                disabled={disabled}
                onChange={(e)=>onSelect&&onSelect(e)}>
                <option value=''>Seleccionar</option>
                    {options && options.map((element,index)=>
                        <option value={valueField ? element[valueField]  : element} key={index}>
                            {captionField ? element[captionField] : element}
                        </option>)}
                </select>
        </div>
    )
}

function AddTextForm(props){
    const {user, select, close} = props
    const [text, setText]=useState('')
    const today = new Date()

    function handleAddText(e){
        e.preventDefault()
        select(text)
        close()
    }

    return(
        <div className="addInterventionModal">
            <form className="addTextForm">
                <button className="closeButton" onClick={()=>close()}>X</button>
                <div className="title">Modificar Descripción</div>
                <textarea className='addTextInput' onChange={(e)=>setText(`${ today.toLocaleDateString() } - ${user}: ${e.target.value}`)}/>
                <button className="addButton" onClick={(e)=>handleAddText(e)}>Agregar</button>
            </form>
        </div>
    )
}

export default function WorkOrder(){
    const {otCode} = useParams()
    const {userData} = useSelector(state=>state.people)
    const {selectedWODevice} = useSelector(state=>state.devices)
    const {plan, selectedTask} = useSelector((state=>state.plan))
    const {workOrderOptions,newOrderId, orderDetail, updateResult} = useSelector(state=>state.workOrder)
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

    useEffect(()=> setPlanDates(
        plan.filter(task=>{
            const today = new Date()
            return task.code===device.code && (new Date (task.date)) <= today.setDate(today.getDate()+7)
        }).map(task=> (new Date (task.date)))
    ) , [plan, device ])

    useEffect(()=>console.log('planDates', planDates),[planDates])

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
        const sendOrder = {...order, user:userData.user, interventions, device:deviceCode}
        otCode?
            dispatch(updateOrder(otCode,update))
            :dispatch(newWorkOrder(sendOrder))
        if(task.date) dispatch(addOrdertoDate(otCode, task.date))
    }

    function selectTaskDate(date){
        const planDate = planDates.find(planDate=>{ 
            return(new Date (planDate)).toLocaleDateString() === date})
        console.log('planDate', planDate)

        !date ? setTask({})
        :setTask({
            device:deviceCode,
            date : planDate,
            plant:device.plant,
            strategy:plan.find(task=>task.code===device.code).strategy})
    }

    return(
        <div className="WOBackground">
            <div className='WOupperSection'>
                
                <div className="WOcolumn">

                    <section className="WOsection">

                    {(otCode || planDates[0]) && <section>
                        {otCode && <div className="WOrow">
                            <WOFormField label='N° OT' defaultValue={otCode} readOnly={true}/>
                            <WOFormField label='Estado' defaultValue={orderDetail.status} readOnly={true}/>
                        </div>}
                        {planDates[0]&&<div className={`WOformField WOformImportant ${selectDate?'bg-darkRed':'bg-grey'}`}>
                            <div className="WOformField">
                                <input className='WOcheck' type='checkBox' defaultChecked={!!selectedTask}
                                    onChange={(e)=>setSelectDate(e.target.checked)}/>
                                <label>{`${selectDate?'TAREA DE PLAN':'¿TAREA DE PLAN?'}`}</label>
                            </div>
                            {selectDate?
                                <WOFormSelector label='Fecha Plan' options={planDates.map(e=>e.toLocaleDateString())} onSelect={(e)=>{selectTaskDate(e.target.value)}}/>
                                :<label className='WOformInput'/>}
                        </div>}
                    </section>}

                        {pickDevice && <DevicePicker
                            close={()=>setPickDevice(false)}
                            select={(value)=>dispatch(searchWODevice(value))}/>}


                        <div className='formTitle'>Datos del equipo</div>
                        <div className="WOrow">
                            <WOFormField label='Cod.Eq.' defaultValue={deviceCode} readOnly={!!otCode} changeInput={(e)=>handleDevCode(e)}/>
                            {!selectedWODevice && <button className='WOsearchButton' onClick={(e)=>searchCode(e)}>BUSCAR</button>}
                            {!selectedWODevice && <button className='WOsearchButton' onClick={()=>setPickDevice(true)}>BÚSQUEDA AVANZADA</button>}
                            {selectedWODevice &&  <button className='WOsearchButton' onClick={(e)=>handleDevCode(e)} value=''><i className="fas fa-backspace"></i></button>}
                        </div>
                            <WOFormField label='Equipo' defaultValue={device.name} readOnly={true}/>
                        <div className="section">
                            <WOFormField label='Planta' defaultValue={device.plant} readOnly={true}/>
                            <WOFormField label='Area' defaultValue={device.area} readOnly={true}/>
                        </div>
                            <WOFormField label='Linea' defaultValue={device.line} readOnly={true}/>
                            <WOFormField label='Tipo' defaultValue={power} readOnly={true}/>
                        <div className="section">
                            <WOFormField label='Categoría' defaultValue={device.category} readOnly={true}/>
                            <WOFormField label='Servicio' defaultValue={device.service} readOnly={true}/>
                        </div>
                    </section>
                </div>

                <div className="WOcolumn">
                    <section className="WOsection">
                        <div className='formTitle'>Detalle de la orden de trabajo</div>
                        <div className="WOrow">
                            {workOrderOptions.supervisor&&
                            <WOFormSelector key={order.supervisor} label='Supervisor' 
                                defaultValue={order.supervisor}
                                options={workOrderOptions.supervisor}
                                valueField='id'
                                captionField='name'
                                onSelect={(e)=>handleValue(e,'supervisor')}
                                readOnly={false}/>
                            }
                            <WOFormField label='OT Cliente' defaultValue={order.clientWO} changeInput={(e)=>handleValue(e,'clientWO')}/>
                        </div>
                        {workOrderOptions&& Object.keys(workOrderOptions).map( (option,index)=>
                            (option!=='supervisor' &&
                                <WOFormSelector key={order[option]} label={option} 
                                    defaultValue={option==='status'? (order.status || 'Abierta') : order[option]}
                                    options={ ( option!=='status' || userData.access==='admin') ? workOrderOptions[option]:['Abierta']}
                                    onSelect={(e)=>handleValue(e,option)}
                                    readOnly={false}/>))}
                        <div className="section">
                            <WOFormField label='Solicitó' defaultValue={order.solicitor} changeInput={(e)=>handleValue(e,'solicitor')}/>
                            <WOFormField label='Teléfono' defaultValue={order.phone} changeInput={(e)=>handleValue(e,'phone')}/>
                        </div>
                        <WOFormSelector key={device.servicePoints} label='L. Servicio' 
                            defaultValue={order.servicePoint ? order.servicePoint
                                :(device.servicePoints && device.servicePoints.length===1?
                                    device.servicePoints[0]
                                    :undefined)}
                            options={device.servicePoints}
                            onSelect={(e)=>handleValue(e,'servicePoint')}
                            readOnly={!!otCode}/>
                    </section>
                </div>

                <div className="WOcolumn">
                    <section className="WOsection">
                        <div className="WODescriptionSection">
                            <div className='formTitle'>Observaciones</div>
                            <textarea className="WODescription" 
                                onChange={(e)=>handleValue(e,'description')}
                                readOnly={!!otCode && userData.access!=='admin'}
                                defaultValue={order.description}/>
                            {otCode&&<button className='addButton' onClick={()=>setEditDesc(true)}>Agregar comentario</button>}
                            {editDesc&&<AddTextForm user={userData.user} 
                                select={(text)=>setOrder({...order,description: order.description+' || '+text})}
                                close={()=>setEditDesc(false)}
                                />}
                        </div>
                    </section>
                </div>

            </div>

            <section className='WOsection interventionSection'>
                <div className='formTitle'>Intervenciones</div>
                <div className='WOformField woInterventionField' >
                    <InterventionList interventions={interventions}
                        openEdit={()=>{}}
                        onDelete={()=>{}}
                        openAdd={()=>setIntForm(true)}/>
                    {intForm&& <AddIntervention
                        select={(data)=>setInterventions([...interventions,data])}
                        close={()=>setIntForm(false)}/>}
                </div>
            </section>                                
            <section  className="WOsection wOProgress">
                <label className="formLabel longWord">Avance OT</label>
                <WOProgress key={`${orderDetail.completed}`||1}
                    errorCond = {order.interventions && order.interventions.length>0}
                    defaultValue={`${orderDetail.completed || 0}`}
                    select={(e)=>handleValue(e,'completed')}/>
            </section>
            <section  className="WOsection">
                <button onClick={handleSave}>Guardar</button>
            </section>

        </div>
    )

}