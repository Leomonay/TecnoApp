import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getLineServicePoints } from '../../actions/dataActions'
import {Link} from 'react-router-dom'
import { deviceByName, deviceListByLine } from '../../actions/deviceActions'
import { getSupervisors } from '../../actions/peopleActions'
import { getWOList, resetDetail } from '../../actions/workOrderActions'
import GetLocationTree from '../../components/dropdown/locationTree'
import './index.css'
import Paginate from '../../components/Paginate'
import WorkOrderListItem from '../../components/workOrders/WorkOrderListItem'
import { selectTask } from '../../actions/planActions'

//Método para editar intervención
//Asignar garrafas a personal

export default function WorkOrders(){
  const {workOrderList} = useSelector(state => state.workOrder)
  const {servicePointList} = useSelector(state => state.data)
  const {partialList} = useSelector (state => state.devices)
  const {userData, supervisors} = useSelector (state => state.people)
  const today = new Date()
  const [code, setCode]=useState('')
  const [filterList, setFilterList]=useState(false)
  const [page, setPage] = useState({first:0, size: 10})
  const [conditions, setConditions]=useState({
    from: new Date(`1/1/${(new Date()).getFullYear()}`),
    to: new Date(),
    // from: new Date((new Date()).setMonth((new Date()).getMonth()-10)),
    // to: new Date((new Date()).setMonth((new Date()).getMonth()-9)),
    plantName: userData.plant || ''
  })
  const [device, setDevice]=useState({})
  const dispatch = useDispatch()
  const isAdmin = userData.access === 'Admin'

  function setLocations(obj){
    let cond = {...conditions}
    for (let item of ['plantName', 'area', 'line']){
      !obj[item] && delete cond[item]
    }
    if (obj.line){
      dispatch(getLineServicePoints(obj.line))
      dispatch(deviceListByLine(obj.line))
    }
    setConditions({...cond,...obj})
  }

  function handleSubmit(event){
    event.preventDefault()
    code&&dispatch(getWOList({code:code}))
  }

  useEffect(()=>{
    dispatch(getSupervisors())
    dispatch(resetDetail())
  },[dispatch])

  useEffect(()=>{
    const element = document.getElementById('dateFrom')
    if (element) element.value=conditions.from.toISOString().split('T')[0]
  },[conditions.from])
  useEffect(()=>{
    const element = document.getElementById('dateTo') 
    if(element) element.value=conditions.to.toISOString().split('T')[0]
  },[conditions.to])

  useEffect(()=>{
    if (!conditions || !userData || !dispatch) return
    const {user} = userData
    dispatch(getWOList({...conditions, user}))
  },[dispatch, conditions, userData])

  function resetOrderData(){
    dispatch(resetDetail())
    dispatch(selectTask(undefined))
  }

  return(
    <div className='wOView'>
      <div className={`section centerSB`}>

        {filterList?
          <div className='button' onClick={()=>setFilterList(false)}><b>BUSCAR POR CODIGO</b></div>
        :
        <div className='column'>
          <div className='section'>
            <button className='button' onClick={()=>setFilterList(true)} style={{width:'100%'}}>
              <b>BUSCAR FILTRANDO LISTA</b>
            </button>
          </div>
          <form className='searchForm' onSubmit={(e)=>handleSubmit(e)}>
              <label><b>N° OT: </b></label>
              <input className='codeInput' type='text' onChange={(e)=>setCode(e.target.value)}/>
              <button className='button' type='submit'>BUSCAR OT</button>
            </form>
        </div>}
        
        <Link
          to='/ots/new'
          className='button createButton'
          style={{fontSize:'1.5rem'}}
          onClick={()=>resetOrderData()}>
          <b>+</b> Crear nueva OT
        </Link>
      </div>


      {filterList&&<div className='workOrderHeader'>
          <div className='column'>
            <b>Período</b>
            <div className='filterOption'><b>Desde: </b><input className='dateInput' type='date' id='dateFrom'
              defaultValue={conditions.from.toISOString().split('T')[0]}
              onChange={(e)=>{e.target.value.length>8&&setConditions({...conditions, from: new Date(e.target.value)})}}  
              /></div>
            <div className='filterOption'><b>Hasta: </b><input className='dateInput' type='date' id='dateTo'
              defaultValue={conditions.to.toISOString().split('T')[0]}
              onChange={(e)=>{setConditions({...conditions, to: new Date(e.target.value)})}}  
              /></div>
            <div className='section'>
              <button className='filter button' onClick={()=>setConditions({
                from: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
                to: new Date(today.getFullYear(), today.getMonth(), today.getDate()+1),
              })}>Hoy</button>
              <button className='filter button' onClick={()=>setConditions({
                from: new Date(today.getFullYear(), today.getMonth(), 1),
                to: new Date(today.getFullYear(), today.getMonth()+1, 1),
              })}>Este mes</button>
              <button className='filter button' onClick={()=>setConditions({
                from: new Date(today.getFullYear(), 0, 1),
                to:new Date(today.getFullYear()+1, 0, 1),
              })}>Este Año</button>
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
              <input className="textInput" type='text' placeholder='AAA-000' onChange={(e)=>setDevice({...device, code:e.target.value})}/>
              <button onClick={()=>setConditions({...conditions, device:device.code})}>OK</button>
            </div>
            <div className='section'>
              <label className='dropdownLabel'>Nombre</label>
              <input className="textInput" type='text' placeholder='coincidencia parcial' onChange={(e)=>setDevice({...device, name:e.target.value})}/>
              <button onClick={()=>{
                  dispatch(deviceByName(device.name))
                  setDevice({...device, list:true})
                  }}>OK</button>
              {device.list && <div className='deviceSelector'>
                <div className='section'
                  style={{justifyContent:'right', alignItems:'center'}}>
                    <b>Ocultar Lista</b>
                  <button title='cerrar lista' onClick={()=>setDevice({...device, list:false})}>X</button>
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
      </div>}

      {workOrderList?<div className='wOList'>
        <div className='title'>Listado de OT</div>
        <Paginate length={Math.min(7,workOrderList.length)} 
          pages={workOrderList.length/page.size}
          select={(pg)=>{setPage({...page, first: page.size*pg})}}
          size={(value)=>setPage({...page, size: value})}
          />
          {workOrderList.slice(page.first, page.first+page.size).map((order, index)=>
            <WorkOrderListItem key={index} order={order} index={index} isAdmin={isAdmin}/>)}

          </div>
          :<div className='waiting'/>}
    </div>
  )
}