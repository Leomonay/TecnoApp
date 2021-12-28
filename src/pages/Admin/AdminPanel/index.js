import { useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import MenuOptions from '../../../components/MenuOptions'
import AdminDevices from '../Devices'
import AdminPlan from '../Plan'
import AdminPlants from '../Plants'
import AdminUsers from '../Users'
import './index.css'

export default function AdminPanel(){
    const {selected} = useParams()
    const options=[
        {caption: 'Usuarios', url: '/admin/usuarios'},
        {caption: 'Equipos', url: '/admin/equipos'},
        {caption: 'Plantas', url: '/admin/plantas'},
        {caption: 'Plan', url: '/admin/plan'},
    ]
    useEffect(() => console.log(selected), [selected])

    return(<div className='adminBackground'>
        <MenuOptions options={options}/>
        {selected==='usuarios'&&<AdminUsers/>}
        {selected==='equipos'&&<AdminDevices/>}
        {selected==='plantas'&&<AdminPlants/>}
        {selected==='plan'&&<AdminPlan/>}
    </div>)
}