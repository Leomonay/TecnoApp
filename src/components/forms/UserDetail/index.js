import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser, updateUser } from '../../../actions/peopleActions'
import DropdownChoice from '../../dropdown/DropdownChoice'
import './index.css'

export default function UserDetail(props){
    //Create, View and Update
    const {user} = props
    const [newUser,setNewUser] = useState(user==='new'?{}:{...user})
    const dispatch = useDispatch()

    function UserField(props){
        return(
        <div className="formInput">
            <label className="dropdownLabel">{props.label}</label>
            <input className="textInput"
                id={`user${props.item}`}
                placeholder={props.placeholder}
                defaultValue={ props.item==='password' ? undefined: (user[props.item] || undefined)}
                onChange={(event)=>setNewUser({...newUser,[props.item]:event.target.value})}
                readOnly={false}
                />
        </div>
        )
    }

    function handleSubmit(e){
        e.preventDefault()
        if(user==='new'){
            dispatch(addUser(newUser))
        }else{
            dispatch(updateUser(user.idNumber, newUser))
        }
    }

    return(
        <div className="modal">
            <form className='userDetailForm' onSubmit={(e)=>handleSubmit(e)}>
            <button className='closeButton' onClick={()=>props.close()}>X</button>
            <div className="title">{`${user==='new'?'Nuevo':'Editar'} usuario`}</div>

            { UserField({label:'Nombre', placeholder:"Nombre y apellido", item:'name'})}
            { UserField({label:'Usuario', placeholder:"ingrese nombre de usuario", item:'username'})}
            { UserField({label:'Contraseña', placeholder:"Contraseña temporal", item:'password'})}
            { UserField({label:'N° ID', placeholder:"Ingrese DNI", item:'idNumber'})}
            { UserField({label:'Email', placeholder:"Ingrese correo electrónico", item:'email'})}
            { UserField({label:'Teléfono', placeholder:"Ingrese teléfono de contacto", item:'phone'})}	

            {DropdownChoice('charge', props.charge, (item, value)=>setNewUser({...newUser,[item]: value}), (user.charge || undefined))}
            {DropdownChoice('access', props.access, (item, value)=>setNewUser({...newUser,[item]: value}), (user.access || undefined))}
            {DropdownChoice('plant', props.plant, (item, value)=>setNewUser({...newUser,[item]: value}) , (user.plant? user.plant.name : undefined))}

            <button
                type='submit'
                className={JSON.stringify(newUser)===JSON.stringify(user)? 'disabledButton' : undefined}
                disabled={JSON.stringify(newUser)===JSON.stringify(user)}>
                GUARDAR USUARIO</button>
            </form>
        </div>
    )
}