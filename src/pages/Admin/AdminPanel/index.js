import { useParams } from 'react-router-dom'
import MenuOptions from '../../../components/MenuOptions'
import AdminDevices from '../Devices'
import AdminPlan from '../Plan'
import AdminPlants from '../Plants'
import AdminUsers from '../Users'
import AdminCylinders from '../Cylinders'
import './index.css'
import DeviceAdmin from '../Devices'

export default function AdminPanel(){
    const {selected} = useParams()
    const options=[
        {caption: 'Usuarios', url: '/admin/usuarios'},
        {caption: 'Equipos', url: '/admin/equipos'},
        {caption: 'Plantas', url: '/admin/plantas'},
        {caption: 'Plan', url: '/admin/plan'},
        {caption: 'Garrafas', url: '/admin/garrafas'},
    ]
    return(<div className='adminBackground'>
        <MenuOptions options={options}/>
        {selected==='usuarios'&&<AdminUsers/>}
        {selected==='equipos'&&<DeviceAdmin/>}
        {selected==='plantas'&&<AdminPlants/>}
        {selected==='plan'&&<AdminPlan/>}
        {selected==='garrafas'&&<AdminCylinders/>}
        
    </div>)
}