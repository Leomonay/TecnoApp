import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { deleteOrder, searchWO } from "../../actions/workOrderActions";
import './index.css'
import {appConfig} from "../../config"
import { Link } from "react-router-dom";
import WarningOption from "../../components/warnings/WarningOption";
const {headersRef} = appConfig

export default function WODetail(){
    const {code} = useParams()
    const {orderDetail} = useSelector(state=>state.workOrder)
    const {userData} = useSelector(state=>state.people)
    const dispatch = useDispatch()
    const [warning, setWarning]=useState(false)

    useEffect(()=>{if(code) dispatch(searchWO(code))},[dispatch,code])

    if (!orderDetail.code) return(<div className='detailBackground'>
        <div className='waiting'>Buscando</div>
    </div>)

    function orderToDelete(code){
        dispatch(deleteOrder(code))
        setWarning(false)
    }

    return(
        <div className='detailBackground'>
            <div className='Title'><b>{`${orderDetail.class} N° ${code}`}</b></div>
            <div className={`detailSection`}>
                <div className='detailCreation'>
                    <div><b>Creada: </b>
                    {`${orderDetail.creationData.date} por ${orderDetail.creationData.user.name}`}</div>
                    <div><b>Solicita: </b>
                    {`${orderDetail.creationData.solicitor.name} (${orderDetail.creationData.solicitor.phone})`}</div>
                    <div><b>Supervisor: </b>
                    {`${orderDetail.creationData.supervisor}`}</div>
                </div>

                <div className='detailStatus'>
                    {Object.keys(orderDetail.statusData).map((item,index)=>
                    <div  key={index}>
                            <b>{headersRef[item]}: </b>{orderDetail.statusData[item]}
                    </div>)}
                </div>

            </div>

            <div className='detailSection'>
                <div className='detailCol detailDescription'>
                    <b>Descripción:</b>
                    <div className='detailLongText'>{orderDetail.description}</div>
                </div>
                <div className='detailCol detailDescription'>
                    <b>Equipo:</b>
                    {orderDetail.device.map((element,index)=>
                    <div className='detailRow' key={index}>
                        <div className='itemName'>{headersRef[element.item] || element.item}</div>
                        <div className='itemValue'>{element.value}</div>
                    </div>)}
                </div>
            </div>
            {warning && <WarningOption
                message={`¿Desea eliminar la OT ${code}, con todas las intervenciones asociadas y los consumos de gas?`}
                accept={()=>orderToDelete(code)}
                cancel={()=>setWarning(false)}
                />}
                <div className='detailSection'>
                    {orderDetail.interventions?
                        <b><u>Intervenciones</u></b>
                        :'Esta OT aún no registra intervenciones'}
                </div>
                <div className='detailSection'>
                {orderDetail.interventions&&orderDetail.interventions.map((intervention, index)=>
                    <div key={index} className='interventionLi'>
                            <div className='headerDate'>
                                <b>{`${intervention.date}`}</b>
                                {intervention.workers.map((worker,index)=>
                                    <div key={index} className='headerWorker'>{worker.name}</div>)
                                }
                            </div>
                            <div className='interventionDescription'>
                                <div className='interventionLongText'>{intervention.tasks}</div>
                                {intervention.gasUsage&&<div className='interventionGas'>
                                    <b>Gas Utilizado:</b>
                                    {intervention.gasUsage.map((usage,index)=>
                                        usage.total?
                                            <div key={index} className='interventionGas' >
                                                <div>Total:</div> <div>{` ${usage.total}kg.`}</div>
                                            </div>
                                            :<div key={index} className='interventionGas' >
                                                <div>{`${usage.cylinder}: `}</div>
                                                <div>{` ${usage.consumption}kg.`}</div>
                                            </div>
                                        )}
                                    </div>}
                            </div>
                    </div>)}
                </div>
                <div className='buttonsRow'>
                    <Link to={`/ots/edit/${code}`} className='button editButton' title='Modificar'/>
                    {userData.access==='Admin' && <button className='removeButton' title='Eliminar' onClick={()=>setWarning(!warning)}/>}
          </div>
        </div>
    )
}

