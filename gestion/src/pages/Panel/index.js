import React, { useEffect, useState } from 'react'
import './index.css'
import MenuOptions from '../../components/MenuOptions'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { callMostRecent, selectWorkOrder } from '../../actions/workOrderActions'
import Table from '../../components/Table';
import JsonViewer from '../../components/JsonViewer.js';
import { getShortDate, cloneJson } from '../../utils/utils';

export default function Panel(){
  const dispatch = useDispatch()
  const {mostRecent,selected, tableHeaders} = useSelector((state) => state.workOrder);
  const [filters, setFilters] = useState(null)
  const [otList,setOTList]=useState([])

  useEffect(()=>setFilters( { conditions: { class : 'Reclamo'}, limit: 10 } ) , [] )
  
  useEffect(()=>{
      let list = cloneJson(mostRecent)
      list.map(ot=>
        ot.closed = ot.closed? getShortDate(ot.closed):'')
      setOTList(list)
  },[mostRecent])

  const {option} = useParams()

  useEffect(()=>filters&&dispatch(callMostRecent(filters)),[filters, dispatch])
  
  return (
    <div className='PanelBackground'>
        {option&&<MenuOptions/>}
        <div className='panelContainer'>
            <div className='panelWoResume'>
              <div className='title'>10 reclamos más recientes</div>
                <div className='wOData'>
                <div className='wOTable'>
                {mostRecent[0]&&<Table
                  array={otList}
                  headers={tableHeaders}
                  clickFunction={(element)=>dispatch(selectWorkOrder(element))}
                  name = {`recTable`}
                  attrib = 'code'
                  />}
                </div>
                <div className='tableViewer'>
                  {selected&&<JsonViewer
                    json={mostRecent.find(e=>e.code===selected)}
                    title={`Detalle OT ${selected}`}
                  />}
                </div>
              </div>
            </div>
        </div>
    </div>
  );
}