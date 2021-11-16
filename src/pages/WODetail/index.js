import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { searchWO } from "../../actions/workOrderActions";
import './index.css'

export default function WODetail(){
    const {code} = useParams()
    const {orderDetail} = useSelector(state=>state.workOrder)
    const dispatch = useDispatch()

    console.log(orderDetail)

    useEffect(()=>{if(code) dispatch(searchWO(code))},[dispatch,code])

    if (!orderDetail.code) return(<div className='detailBackground'>
        <div className='waiting'>Buscando</div>
    </div>)

    return(
        <div className='detailBackground'>
            <div className='Title'><b>{`${orderDetail.class} N° ${code}`}</b></div>
            <div className='detailSection'>
                <div className='detailCol'>
                    <b>Creada: </b>
                    {`${orderDetail.registration.date.split('T')[0].split('-').reverse().join('/')}
                     ${orderDetail.registration.date.split('T')[1].slice(0,5)}`}
                     <b>Por: </b>{orderDetail.registration.user.name}
                </div>

            </div>

            <div className='detailSection'>
                <div className='detailCol'>
                    <b>Supervisor: </b>{orderDetail.supervisor.name}
                </div>
                <div className='detailCol'>
                    <b>Solicitante: </b>{`${orderDetail.solicitor.name}(${orderDetail.solicitor.phone})`}
                </div>    
                <div className='detailCol'>
                    <b>Lugar de Servicio: </b> <i>crear en OT</i>
                </div>    
                <div className='detailCol'>
                    <b>Estado: </b>{orderDetail.status}
                </div>                      
                <div className='detailCol'>
                    <b>Problema: </b>{orderDetail.initIssue}
                </div>
                <div className='detailCol'>
                    <b>Causa: </b>{orderDetail.cause}
                </div>   
            </div>
            <div className='detailSection'>
                <div className='detailCol detailDescription'>
                    <b>Descripción:</b>
                    <div className='detailLongText'>{orderDetail.description}</div>
                </div>
                <div className='detailCol detailDescription'>
                    <b>Equipo:</b>
                    <div className='detailRow'><b>[{orderDetail.device.code}]</b>{orderDetail.device.name}</div>
                    <div className='detailRow'>
                        <b>{orderDetail.device.type}</b> 
                        {` ${orderDetail.device.power.magnitude>15000? orderDetail.device.power.magnitude/3000 : orderDetail.device.power.magnitude}
                        ${orderDetail.device.power.magnitude>15000? 'TnRef' : "Frigorías"}`}
                    </div>
                    <div className='detailRow'>
                        <b>{orderDetail.device.service}</b> - {orderDetail.device.category}
                    </div>
                    <div className='detailRow'>
                        <b>Estado:</b> - {orderDetail.device.status}
                    </div>
                    <div className='detailRow'>
                        <b>Ambiente:</b> - {orderDetail.device.environment}
                    </div>
                    <div className='detailRow'>
                        <b>Lugar de Servicio Afectado:</b> - <i>'crear en OT'</i>
                    </div>
                </div>
            </div>
            <div className='detailSection'>
                <b>Intervenciones</b>
            </div>
            {orderDetail.interventions.map(intervention=>
                <div>
                    
                </div>)}
        </div>
    )
}



// {

//     "interventions": [
//         {
//             "_id": "618e9221a5ea24bb94721539",
//             "workOrder": "618e9221a5ea24bb94721536",
//             "workers": [
//                 "6148ee37a80392a6be309a6a",
//                 "6148ee37a80392a6be309a7f"
//             ],
//             "tasks": "Tarea Realizada",
//             "date": "2021-11-12T15:35:00.000Z",
//             "createdAt": "2021-11-12T16:11:13.386Z",
//             "updatedAt": "2021-11-15T23:36:57.610Z",
//             "__v": 2,
//             "gasUsage": [
//                 {
//                     "_id": "6192ed7cc1dda1b8bf1b551a",
//                     "code": "13A",
//                     "intervention": "618e9221a5ea24bb94721539",
//                     "consumption": 1,
//                     "createdAt": "2021-11-15T23:30:04.186Z",
//                     "updatedAt": "2021-11-15T23:30:04.186Z",
//                     "__v": 0
//                 },
//                 {
//                     "_id": "6192ef19c1dda1b8bf1b5526",
//                     "code": "154A",
//                     "intervention": "618e9221a5ea24bb94721539",
//                     "consumption": 1,
//                     "createdAt": "2021-11-15T23:36:57.608Z",
//                     "updatedAt": "2021-11-15T23:36:57.608Z",
//                     "__v": 0
//                 }
//             ]
//         }
//     ]
// }