// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router";
// import { deleteOrder, searchWO } from "../../actions/workOrderActions";
// import './index.css'
// import {appConfig} from "../../config"
// import { Link } from "react-router-dom";
// import WarningOption from "../../components/warnings/WarningOption";
// import { getSupervisors } from "../../actions/peopleActions";
// const {headersRef} = appConfig

// export default function WODetail(){
//     const {otCode} = useParams()
//     const {orderDetail} = useSelector(state=>state.workOrder)
//     const {userData, supervisors } = useSelector(state=>state.people)
//     const dispatch = useDispatch()
//     const [warning, setWarning]=useState(false)

//     useEffect(()=>{
//         if(otCode) dispatch(searchWO(otCode))
//         dispatch(getSupervisors())
//     },[dispatch,otCode])
//     useEffect(()=>console.log('orderDetail',orderDetail),[orderDetail])

//     if (!orderDetail.code) return(<div className='detailBackground'>
//         <div className='waiting'>Buscando</div>
//     </div>)

//     function orderToDelete(code){
//         dispatch(deleteOrder(code))
//         setWarning(false)
//     }

//     return(
//         <div className='detailBackground'>
//             <div className='Title'><b>{`${orderDetail.class} N° ${otCode}`}</b></div>
//             <div className={`detailSection`}>
//                 <div className='detailCreation'>
//                     <div><b>Creada: </b>
//                     {`${orderDetail.regDate} por ${orderDetail.user}`}</div>
//                     <div><b>Solicita: </b>
//                     {`${orderDetail.solicitor} (${orderDetail.phone})`}</div>
//                     <div><b>Supervisor: </b>
//                     {`${supervisors[0] && supervisors.find(supervisor=>supervisor.id===orderDetail.supervisor).name}`}</div>
//                 </div>

//                 <div className='detailStatus'>
//                     {['class','status','cause','issue'].map((item,index)=>
//                     <div  key={index}>
//                             <b>{headersRef[item]}: </b>{orderDetail[item]}
//                     </div>)}
//                 </div>

//             </div>

//             <div className='detailSection'>
//                 <div className='detailCol detailDescription'>
//                     <b>Descripción:</b>
//                     <div className='detailLongText'>{orderDetail.description}</div>
//                 </div>
//                 <div className='detailCol detailDescription'>
//                     <b>Equipo:</b>
//                     {orderDetail && Object.keys(orderDetail.device).map((element,index)=>
//                     <div className='detailRow' key={index}>
//                         <div className='itemName'>{headersRef[element]}</div>
//                         <div className='itemValue'>{orderDetail.device[element]}</div>
//                     </div>)}
//                 </div>
//             </div>
//             {warning && <WarningOption
//                 message={`¿Desea eliminar la OT ${otCode}, con todas las intervenciones asociadas y los consumos de gas?`}
//                 accept={()=>orderToDelete(otCode)}
//                 cancel={()=>setWarning(false)}
//                 />}
//                 <div className='detailSection'>
//                     {orderDetail.interventions?
//                         <b><u>Intervenciones</u></b>
//                         :'Esta OT aún no registra intervenciones'}
//                 </div>
//                 <div className='detailSection'>
//                 {orderDetail.interventions&&orderDetail.interventions.map((intervention, index)=>
//                     <div key={index} className='interventionLi'>
//                             <div className='headerDate'>
//                                 <b>{`${intervention.date}`}</b>
//                                 {intervention.workers.map((worker,index)=>
//                                     <div key={index} className='headerWorker'>{worker.name}</div>)
//                                 }
//                             </div>
//                             <div className='interventionDescription'>
//                                 <div className='interventionLongText'>{intervention.tasks}</div>
//                                 {intervention.gasUsage&&<div className='interventionGas'>
//                                     <b>Gas Utilizado:</b>
//                                     {intervention.gasUsage.map((usage,index)=>
//                                         usage.total?
//                                             <div key={index} className='interventionGas' >
//                                                 <div>Total:</div> <div>{` ${usage.total}kg.`}</div>
//                                             </div>
//                                             :<div key={index} className='interventionGas' >
//                                                 <div>{`${usage.cylinder}: `}</div>
//                                                 <div>{` ${usage.consumption}kg.`}</div>
//                                             </div>
//                                         )}
//                                     </div>}
//                             </div>
//                     </div>)}
//                 </div>
//                 <div className='buttonsRow'>
//                     <Link to={`/ots/edit/${otCode}`} className='button editButton' title='Modificar'/>
//                     {userData.access==='Admin' && <button className='removeButton' title='Eliminar' onClick={()=>setWarning(!warning)}/>}
//           </div>
//         </div>
//     )
// }

