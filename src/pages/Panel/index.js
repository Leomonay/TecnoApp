import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import './index.css'
import { useDispatch, useSelector } from 'react-redux';
import { callMostRecent } from '../../actions/workOrderActions'

export default function Panel(){
  const dispatch = useDispatch()
  const {mostRecent} = useSelector((state) => state.workOrder);
  const [selectedWO, selectWO]=useState(null)
  const [filters, setFilters] = useState(null)

  useEffect(()=>setFilters( { conditions: { class : 'Reclamo'}, limit: 10 } ) , [] )
  useEffect(()=>filters&&dispatch(callMostRecent(filters)),[filters, dispatch])
  
  return (
    <div className='PanelBackground'>
        <div className='panelContainer'>
            <div className='panelWoResume'>
              <div className='title'>10 reclamos más recientes</div>
 
                <div className='wOData'>
                  <div className='wOList'>
                    {mostRecent[0]&&mostRecent.map((ot, index)=>
                      <div className='liContainer' key={index}>
                        <div className={`workOrderLi ${ot.status.toLowerCase()}`} onClick={()=>selectWO(ot)}>
                          <div className='liHeader'>
                            <div><b>OT {ot.code}</b> - {ot.status}</div>
                            <div><b>Problema: </b>{ot.initIssue}</div>
                            {ot.cause && <div><b>Causa: </b>{ot.cause}</div>}
                          </div>
                          <div className='workOrderRow'>
                            <div><b>Línea: </b>{ot.area} - {ot.line}</div>
                            <div><b>Equipo: </b>{ot.device}</div>
                            </div>
                          <div className='workOrderRow'>
                            <div><b>Solicita: </b>{`${ot.solicitor.name} (${ot.solicitor.phone})`}</div>
                            <div><b>Fecha: </b>{ot.registration.split("T")[0]}</div>
                            {ot.closed&&<div><b>Cierre: </b>{ot.closed.split("T")[0]}</div>}
                          </div>
                        </div>
                        {(selectedWO && ot && selectedWO.code === ot.code) &&<div className='liDetail'>
                          <div><b>Descripción: </b>
                          {ot.description}</div>
                          <Link to={`/ots/detail/${ot.code}`}>ver detalle</Link>
                        </div>}
                      </div>
                    )}
                  </div>
                  {/* <div className='tableViewer'>
                    {selectedWO&&<JsonViewer
                      json={selectedWO}
                      title={`Detalle OT ${selectedWO.code}`}
                    />}
                  </div> */}
                </div>

            </div>
        </div>
    </div>
  );
}