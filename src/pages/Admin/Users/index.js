import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPlantList } from "../../../actions/dataActions"
import { getUserOptions, getUsersList } from "../../../actions/peopleActions"
import UserCard from "../../../components/Cards/UserCards/UserCard"
import DropdownChoice from "../../../components/dropdown/DropdownChoice"
import { cloneJson } from "../../../utils/utils"
import './index.css'

export default function AdminUsers(){
    const {userList, userOptions} = useSelector(state=>state.people)
    const {locationTree} = useSelector(state=>state.data)
    const [plant, setPlant]=useState('')
    const [option,setOption]=useState({active:true})
    const [active, setActive]=useState(true)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getUserOptions())
        dispatch(getPlantList())},[dispatch])

    useEffect(()=>console.log({option,plant}),[option, plant])

    useEffect(()=>dispatch(getUsersList(option,plant)),[dispatch, option, plant])

    function setUserFilters(item, value){
        const newOption=cloneJson(option)
        if(value==='0' || value===false){
            delete newOption[item]
        }else{
            newOption[item]=value
        }
        setOption(newOption)
    }
    function clickActive(){
        setUserFilters('active',!active)
        setActive(!active)
    }

    return(
        <div className='adminOptionSelected'>
            <div className="title">Lista de Usuarios</div>
            {locationTree && DropdownChoice('plant', Object.keys(locationTree), (item, value)=>setPlant({name: value}))}
            {userOptions && DropdownChoice('charge', userOptions.charge, (item, value)=>setUserFilters(item, value))}
            {userOptions && DropdownChoice('access', userOptions.access, (item, value)=>setUserFilters(item, value))}
            <input type='checkbox' className='checkFilter' onClick={()=>clickActive(!active)}/>Incluir inactivos
            <div className="cardList">
                {userList&&userList.map(UserCard)}
            </div>
        </div>
    )
}