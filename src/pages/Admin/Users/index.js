import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPlantList } from "../../../actions/dataActions"
import { getUserOptions, getUsersList } from "../../../actions/peopleActions"
import UserCard from "../../../components/Cards/UserCards/UserCard"
import DropdownChoice from "../../../components/dropdown/DropdownChoice"
import UserDetail from '../../../components/forms/UserDetail'

import { cloneJson } from "../../../utils/utils"
import './index.css'

export default function AdminUsers(){
    const {userList, userOptions} = useSelector(state=>state.people)
    const {locationTree} = useSelector(state=>state.data)
    const [options,setOption] = useState({active: true})
    const dispatch = useDispatch()
    const [userDetail,setUserDetail]=useState(null)

    useEffect(()=>{
        dispatch(getUserOptions())
        dispatch(getPlantList())
    },[dispatch])

    useEffect(()=>options&&dispatch(getUsersList(options)),[dispatch ,options])

    function setUserFilters(item, value,e){
        const newOption=cloneJson(options)
        if(value==='0'
         || value===false
         ){
            delete newOption[item]
        }else{
            newOption[item]=value
        }
        setOption(newOption)
        dispatch(getUsersList(options))
    }

    useEffect(()=>{options && dispatch(getUsersList(options))},[dispatch, options])

    return(
        <div className='adminOptionSelected'>
            <button className="newUser" onClick={()=>setUserDetail('new')}>CREAR USUARIO</button>
            <div className="title">Lista de Usuarios</div>
            <br/>
            {locationTree && DropdownChoice('plant', Object.keys(locationTree),
             (item, value)=>setUserFilters(item, value)
             )}
            {userOptions && DropdownChoice('charge', userOptions.charge, (item, value)=>setUserFilters(item, value))}
            {userOptions && DropdownChoice('access', userOptions.access, (item, value)=>setUserFilters(item, value))}
            
            <input
                type='checkbox'
                className='checkFilter'
                onChange={(e)=>setUserFilters('active',!e.target.checked)}/>
                Incluir inactivos
            <div className="cardList">
                {userList && userList.map((element,index)=>
                    <UserCard user={element}
                        key={index}
                        editButton={()=>setUserDetail(element)}
                    />)}
            </div>
            {userDetail && 
                <UserDetail 
                    user={userDetail}
                    charge={userOptions.charge}
                    access={userOptions.access}
                    plant={Object.keys(locationTree)}
                    close={()=>setUserDetail(null)}
                    />}
        </div>
    )
}