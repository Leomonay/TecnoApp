import { useState } from "react"
import './index.css'

export default function PeoplePicker(props){
    const title = `${props.name}`
    const [enableOptions, setEnableOptions]=useState(false)
    const [idList,setIDList]=useState([])

    function updateList(worker){
        let list = []
        if( (idList.map(e=>e.id)).includes(worker)){
            list = idList.filter(e=>e.id!==worker.id)
        }else{
            list = [ ...idList, worker ]
        }
        setIDList(list)
        props.update(list)
    }

    return(
        <div className='peoplePicker'>
            <div className='peoplePickerSelected'
                id='OptionPickerVisibleOption'
                onClick={()=>setEnableOptions(!enableOptions)}>{
                    idList.length>=1?
                    idList.map((worker, index)=><div key={index} className='selectedWorker'>{worker.name}</div>)
                    :title
                    }</div>
            {enableOptions&&<div className='peoplePickerListContainer'>
                <div className='button close' onClick={()=>setEnableOptions(!enableOptions)}>X</div>
                <div className='peoplePickerList'>
                {props.options.map((option, index)=>
                    <div className='peopleCard' key={index} onClick={()=>updateList({id: option.idNumber, name: option.name})}>
                        <div className='notImage'>Foto Pendiente</div>
                        <div className='PeoplePickerName'><b>{option.name}</b></div>
                        <div className='PeoplePickerCharge'>{option.charge}</div>
                    </div>)}
                </div>
            </div>}
        </div>
    )
}