import React, { useEffect, useState } from 'react'
import './index.css'
import { useDispatch, useSelector } from 'react-redux';
import { callMostRecent } from '../../actions/workOrderActions'
import { getPlan, selectTask } from '../../actions/planActions';
import TaskList from '../../components/lists/taskList';
import { getDeviceFromList } from '../../actions/deviceActions';
import WOList from '../../components/lists/WorkOrderList';

export default function Panel(){
  const dispatch = useDispatch()
  const {mostRecent} = useSelector((state) => state.workOrder);
  const {userData}=useSelector((state=>state.people))
  const {plan} = useSelector((state=>state.plan))
  const today = new Date()
  const [conditions, setConditions]=useState(null)
  const [filters, setFilters] = useState(null)
  const [pendant, setPendant] = useState([])
  const [current, setCurrent] = useState([])
  const [next, setNext] = useState([])

  useEffect(()=>setFilters( { conditions: { class : 'Reclamo'}, limit: 10 } ) , [] )
  useEffect(()=>filters&&dispatch(callMostRecent(filters)),[filters, dispatch])
  useEffect(()=>{
    if(userData && userData.user){
      const {plant, user, access} = userData
      const year = (new Date()).getFullYear()
      plant && access !== 'admin' ? setConditions({year,plant,user}) : setConditions({year})
    }
  }, [userData])

  useEffect(()=>{dispatch(selectTask(undefined))
    dispatch(getDeviceFromList({}))},[dispatch])

  useEffect(()=>{conditions&&dispatch(getPlan(conditions))},[conditions,dispatch])

  useEffect(()=>{
    //current week monday    
    const today = new Date()
    const lastMonday = today.getDay() === 1?
      today 
      :new Date ( today.setDate( today.getDate() - ( today.getDay() - 1 ) ) )
    let nextMonday = new Date (lastMonday)
    nextMonday.setDate( lastMonday.getDate() + 7)
    //set pendants, currents and netx tasks
    setPendant(plan.filter(element=> new Date(element.date) < new Date() && element.completed < 100 ))
    setCurrent(plan.filter(element=> new Date(element.date).toLocaleDateString() === lastMonday.toLocaleDateString()))
    setNext(plan.filter(element=> new Date(element.date).toLocaleDateString() === nextMonday.toLocaleDateString()))

  },[plan])

  return (
    <div className='panelBackground'>
      <div classname='container'>
        <div className='row'>
          <div className='col'>
            <TaskList pendant={pendant} current={current} next={next} access={userData.access}/>
          </div>
          {userData.access==='Admin' &&
          <div className='col'>
                <div className='title'>10 reclamos más recientes</div>
                <WOList mostRecent={mostRecent}/>
          </div>
          }
        </div>
      </div>
    </div>
  );
}