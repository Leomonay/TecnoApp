import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteOrder } from "../../../actions/workOrderActions";
import WarningOption from "../../warnings/WarningOption";
import './index.css'

export default function WorkOrderListItem(props){
    const order = props.order
    const [warning, setWarning] = useState(false)
    const dispatch = useDispatch()

    function orderToDelete(code){
      dispatch(deleteOrder(code))
      setWarning(false)
    }

    return(
      <div className='wOli' key={props.index}>
          <Link className={`wOItem ${order.close?' solved':' pendant'}`} to={`/ots/detail/${order.code}`}>
            <div className='itemRow wOLine1'>
              <div className='itemField'><b>OT: </b>{order.code}</div> 
              <div className='itemField'><b>Clase: </b>{order.class}</div> 
              <div className='itemField'><b>Equipo: </b>{`(${order.device.code})-${order.device.name} (${order.device.line})`}</div> 
              <div className='itemField'><b>Solicitada: </b>{`${order.solicitor} - ${order.date.split('T')[0]}`}</div> 
              <div className='itemField'><b>Supervisor: </b>{order.supervisor}</div>
              <div className='itemField'><b>Cierre: </b>{order.close.split('T')[0] ||'Pendiente' }</div> 
            </div>
            <div className='itemRow'>
            <div className='itemField'><b>Descripción: </b>{order.description}</div>
            </div>
          </Link>
          <div className='buttonsRow'>
            <Link to={`/ots/edit/${order.code}`} className='button editButton' title='Modificar'/>
            {props.isAdmin && <button className='removeButton' title='Eliminar' onClick={()=>setWarning(!warning)}/>}
            {warning && <WarningOption 
              message={`¿Desea eliminar la OT ${order.code}, con todas las intervenciones asociadas y los consumos de gas?`}
              accept={()=>orderToDelete(order.code)}
              cancel={()=>setWarning(false)}
              />}
          </div>
      </div>
    )
  }
  