import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getLineServicePoints } from '../../actions/dataActions'
import {Link} from 'react-router-dom'
import { deviceByName, deviceListByLine } from '../../actions/deviceActions'
import { getSupervisors } from '../../actions/peopleActions'
import { getWOList } from '../../actions/workOrderActions'
import GetLocationTree from '../../components/dropdown/locationTree'
import { cloneJson } from '../../utils/utils'
import './index.css'

function workOrderListItem(order, index){
  return(
    <Link to={`/ots/detail/${order.code}`} className='wOli' key={index}>
        <div className={`wOItem${order.close?' solved':' pendant'}`}>
          <div className='itemRow wOLine1'>
            <div className='itemField'><b>OT: </b>{order.code}</div> 
            <div className='itemField'><b>Clase: </b>{order.class}</div> 
            <div className='itemField'><b>Equipo: </b>{`(${order.device.code})-${order.device.name} (${order.line})`}</div> 
            <div className='itemField'><b>Solicitada: </b>{`${order.solicitor} - ${order.date.split('T')[0]}`}</div> 
            <div className='itemField'><b>Supervisor: </b>{order.supvervisor}</div>
            <div className='itemField'><b>Cierre: </b>{order.close.split('T')[0] ||'Pendiente' }</div> 
          </div>
          <div className='itemRow'>
          <div className='itemField'><b>Descripción: </b>{order.description}</div>
          </div>
        </div>
        <div className='buttonsRow'>
          <div className='button editButton' title='Modificar'/>
          <div className='button removeButton' title='Eliminar'/>
        </div>
    </Link>
  )
}

export default function WorkOrders(){
  const {workOrderList} = useSelector(state => state.workOrder)
  const {userData, servicePointList} = useSelector(state => state.data)
  const {partialList} = useSelector (state => state.devices)
  const {supervisors} = useSelector (state => state.people)
  const today = new Date()
  const [conditions, setConditions]=useState({
    // from: new Date((new Date()).setMonth((new Date()).getMonth()-1)),
    // to: new Date(),
    from: new Date((new Date()).setMonth((new Date()).getMonth()-7)),
    to: new Date((new Date()).setMonth((new Date()).getMonth()-6)),
    plantName: userData.plant ||''
  })
  const [device, setDevice]=useState({})
  const dispatch = useDispatch()

  useEffect(()=>dispatch(getSupervisors()),[dispatch])

  function setLocations(obj){
    let cond = cloneJson(conditions)
    for (let item of ['plantName', 'area', 'line']){
      !obj[item] && delete cond[item]
    }
    if (obj.line){
      dispatch(getLineServicePoints(obj.line))
      dispatch(deviceListByLine(obj.line))
    }
    setConditions({...cond,...obj})
  }
  useEffect(()=>{
    document.getElementById('dateFrom').value=conditions.from.toISOString().split('T')[0]
  },[conditions.from])
  useEffect(()=>{
    document.getElementById('dateTo').value=conditions.to.toISOString().split('T')[0]
  },[conditions.to])

  useEffect(()=>console.log('conditions',conditions),[conditions])
  useEffect(()=>dispatch(getWOList(conditions)),[dispatch, conditions])
  useEffect(()=>console.log('userData',userData),[userData])

  return(
    <div className='wOView'>
      <div className='section'style={{justifyContent:'right', alignItems:'center', fontSize:'1.5rem'}}>
                  <Link to='/ots/new' className='button'><b>+</b> Crear nueva OT</Link>
      </div>
      <div className='workOrderHeader'>
        <div className='column'>
          <b>Período</b>
          <div className='filterOption'><b>Desde: </b><input type='date' id='dateFrom'
            defaultValue={conditions.from.toISOString().split('T')[0]}
            onChange={(e)=>{console.log('value', e.target.value);e.target.value.length>8&&setConditions({...conditions, from: new Date(e.target.value)})}}  
            /></div>
          <div className='filterOption'><b>Hasta: </b><input type='date' id='dateTo'
            defaultValue={conditions.to.toISOString().split('T')[0]}
            onChange={(e)=>{console.log('value', e.target.value);setConditions({...conditions, to: new Date(e.target.value)})}}  
            /></div>
          <div className='section'>
            <div className='button fifth' onClick={()=>setConditions({
              from: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
              to: new Date(today.getFullYear(), today.getMonth(), today.getDate()+1),
            })}>Hoy</div>
            <div className='button fifth' onClick={()=>setConditions({
              from: new Date(today.getFullYear(), today.getMonth(), 1),
              to: new Date(today.getFullYear(), today.getMonth()+1, 1),
            })}>Este mes</div>
            <div className='button fifth' onClick={()=>setConditions({
              from: new Date(today.getFullYear(), today.getMonth()-1, 1),
              to: new Date(today.getFullYear(), today.getMonth(), 1),
            })}>Mes pasado</div>
            <div className='button fifth' onClick={()=>setConditions({
              from: new Date(today.getFullYear(), 0, 1),
              to:new Date(today.getFullYear()+1, 0, 1),
            })}>Este Año</div>
            <div className='button fifth' onClick={()=>setConditions({
              from: new Date(today.getFullYear()-1, 0, 1),
              to:new Date(today.getFullYear(), 0, 1),
            })}>Año Anterior</div>
          </div>
        </div>
        <div className='column'>
          <b>Ubicación</b>
          <GetLocationTree
            plant={(!userData.plant || userData.access==='Admin')? '' : userData.plant}
            pickerFunction={obj=>setLocations(obj)}
            />
            {conditions.line&&<div className='section'>
              <label className='dropdownLabel'>Lugar de Servicio</label>
              <select className="dropdownInput" onChange={(e)=>setConditions({...conditions, servicePoint:e.target.value})}>
                <option value=''>Sin seleccionar</option>
                {servicePointList[0]&& servicePointList.map((sp, index)=>
                <option key={index} value={sp}>
                  {sp}
                </option>)}
              </select>
            </div>}
        </div>
        <div className='column'>
          <section><b>Equipo: </b>{conditions.device&&`${conditions.device}`}</section>
          <div className='section'>
            <label className='dropdownLabel'>Código</label>
            <input type='text' placeholder='AAA-000' onChange={(e)=>setDevice({...device, code:e.target.value})}/>
            <div className='button' onClick={()=>setConditions({...conditions, device:device.code})}>OK</div>
          </div>
          <div className='section'>
            <label className='dropdownLabel'>Nombre</label>
            <input type='text' placeholder='coincidencia parcial' onChange={(e)=>setDevice({...device, name:e.target.value})}/>
            <div className='button' 
              onClick={()=>{
                dispatch(deviceByName(device.name))
                setDevice({...device, list:true})
                }}>OK</div>
            {device.list && <div className='deviceSelector'>
              <div className='section'
                style={{justifyContent:'right', alignItems:'center'}}>
                  <b>Ocultar Lista</b>
                <div className='button' title='cerrar lista' onClick={()=>setDevice({...device, list:false})}>X</div>
              </div>
              {partialList&&partialList.map(dev=>
                <div className='deviceLi' onClick={()=>{
                  setConditions({...conditions, device: dev.code})
                  setDevice({...device, list:false})
                  }}>
                  {`(${dev.code}) (${dev.name})`}
                </div>)}
            </div>}
          </div>
          <div className='section'>
            <label className='dropdownLabel'>Lista</label>
            <select className="dropdownInput" type='text' disabled={!conditions.line} onChange={(e)=>setConditions({...conditions, device: e.target.value})}>
              <option value=''>{conditions.line?'Sin Seleccionar':'Seleccionar Línea'}</option>
              {conditions.line && partialList[0] && partialList.map((device,index)=>
                <option key={index} value={device.code}>
                    {`(${device.code}) ${device.name}`}
                </option>)}
            </select>
          </div>
        </div>
        <div className='column'>
            <label className='dropdownLabel'>Solicitó</label>
            <input placeholder='coincidencia parcial' onChange={(e)=>setConditions({...conditions, solicitor: e.target.value})}/>
            <br/>
            <label className='dropdownLabel'>Supervisor</label>

            <select className="dropdownInput" type='text' disabled={!supervisors} onChange={(e)=>setConditions({...conditions, supervisor: e.target.value})}>
              <option value=''>{'Sin Seleccionar'}</option>
              {supervisors[0] && supervisors.map((supervisor,index)=>
                <option key={index} value={supervisor.idNumber}>
                    {supervisor.name}
                </option>)}
            </select>

        </div>
      </div>

      {userData.access==="Admin" && <div className='filterOption'><b>Plant: </b></div>}
      <div className='wOList'>
        <div className='title'>Listado de OT</div>
        {workOrderList[0]?workOrderList.map((order, index)=>
          workOrderListItem(order, index))
          :<div className='waiting'/>}
      </div>
    </div>
  )
}