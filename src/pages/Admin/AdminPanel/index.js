import { useParams } from 'react-router-dom'
import MenuOptions from '../../../components/MenuOptions'
import AdminPlan from '../Plan'
import AdminPlants from '../Plants'
import AdminUsers from '../Users'
import AdminCylinders from '../Cylinders'
import './index.css'
import DeviceAdmin from '../Devices'
import WOList from '../../../components/lists/WorkOrderList'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { callMostRecent } from '../../../actions/workOrderActions'

export default function AdminPanel(){
    const {selected} = useParams()
    const options=[
        {caption: 'Usuarios', url: '/admin/usuarios'},
        {caption: 'Equipos', url: '/admin/equipos'},
        {caption: 'Plantas', url: '/admin/plantas'},
        {caption: 'Plan', url: '/admin/plan'},
        {caption: 'Garrafas', url: '/admin/garrafas'},
    ]
    const {mostRecent} = useSelector((state) => state.workOrder);
    const dispatch = useDispatch()
        
    useEffect(()=>dispatch(callMostRecent({ conditions: { class : 'Reclamo'}, limit: 10 })),[dispatch])

    return(<div className='adminBackground'>
        <MenuOptions options={options}/>
        {selected==='usuarios'&&<AdminUsers/>}
        {selected==='equipos'&&<DeviceAdmin/>}
        {selected==='plantas'&&<AdminPlants/>}
        {selected==='plan'&&<AdminPlan/>}
        {selected==='garrafas'&&<AdminCylinders/>}
        <div className='container-fluid p-0'>
            <div className='col-sm-6'>
                <WOList mostRecent={mostRecent}/>
            </div>
        </div>

        
    </div>)
}