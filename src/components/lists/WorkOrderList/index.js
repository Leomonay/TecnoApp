import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './index.css'


export default function WOList(props){
    const [selectedWO, selectWO]=useState(null)
    const [mostRecent, setMostRecent]=useState(props.mostRecent)
    useEffect(()=>setMostRecent(props.mostRecent),[props.mostRecent])

    return(
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

      </div>
    )
}