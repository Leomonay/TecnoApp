import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getPlan } from '../../actions/planActions';
import './index.css'

export default function Plan(){
  const {plan} = useSelector(state=>state.plan)
  const {userData} = useSelector(state=>state.people)
  const [year, setYear] = useState((new Date()).getFullYear());
  const [plant, setPlant] = useState(userData.plant || undefined);
  const dispatch = useDispatch()

  useEffect(()=>console.log('userData', userData),[userData])

  function classCompleted(percent){
    const value = Number(percent)
    if(value === 0)return('pendantTask')
    if(value < 70)return('coursedTask')
    if(value <= 99)return('doneTask')
    if(value === 100)return('completedTask')
  }

  useEffect(()=>console.log('plan', plan),[plan])
  useEffect(()=>(year&&plant)&&dispatch(getPlan({year,plant})),[year,plant,dispatch])

  return (
    <div className='PanelBackground'>
      <div className='planContainer'>
        {plan.map(date=>
        <div className={`planRow ${classCompleted(date.completed)}`}>
          <div className='planDate'>
            {(new Date (date.date)).toLocaleDateString().split(' ')[0]}
          </div>
          <div className='planCard planDeviceCard'>
            <div>
              <b>{`[${date.code}] ${date.device}`}</b>
            </div>
            <div className='subTitle'>
              {`${date.plant} > ${date.area} > ${date.line}`}
            </div>
          </div>
          <div className='planCard planPeopleCard'>
            {date.responsible && <div><b>{`Responsable: `}</b>{date.responsible.name}</div>}
            <div><b>{`Supervisor: `}</b>{date.supervisor.name}</div>
          </div>        
          <div className='planCard planTaskCard'>
            <b>{'Observaciones '}</b>{date.observations}
          </div>
          <div className={`planCard percentTask bg${classCompleted(date.completed)}`}>
            <b>{'Avance '}</b>{`${date.completed}%`}
          </div>
        </div>)}
      </div>

      {/* <table className='planTable'>
        <thead>
          <th>PLANTA</th>
          <th>AREA</th>
          <th>LINEA</th>
          <th>CODIGO</th>
          <th>EQUIPO</th>

          <th>FECHA</th>
          <th>RESPONSABLE</th>
          <th>SUPERVISOR</th>
          <th>OBSERVACIONES</th>        
          <th>%</th>
        </thead>        
        <tbody className='planTableBody'>
          {plan.map(date=><tr>
            <td>{date.plant}</td>
            <td>{date.area}</td>
            <td>{date.line}</td>
            <td>{date.code}</td>
            <td>{date.device}</td>
            <td>{(new Date (date.date)).toLocaleDateString().split(' ')[0]}</td>
            <td>{date.responsible ? date.responsible.name : '-'}</td>
            <td>{date.supervisor ? date.supervisor.name : '-'}</td>
            <td>{date.observaciones}</td>
          </tr>)}
        </tbody>
      </table> */}
     </div>
  );
}