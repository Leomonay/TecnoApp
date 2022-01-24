import { useState } from "react"
import './index.css'

export default function PeoplePicker(props){
    const title = `${props.name}`
    const [enableOptions, setEnableOptions]=useState(false)
    const [idList,setIDList]=useState(props.idList || [])
    const {options,selectedWorkers} = props
    // const selectedWorkers = props.selectedWorkers || []

    function updateList(worker){
        const list = idList.find(element=>element.id===worker.id)?
            idList.filter(element=>element.id!==worker.id)
            :[...idList, worker]
        setIDList(list)
        props.update(list)
    }

    if(selectedWorkers && selectedWorkers.array[0]){
    const addedKey = Object.keys(selectedWorkers.array[0])[1]
    options.filter(option=>
        selectedWorkers.array.map(e=>e.id).includes(option.idNumber)).map(option=>
            option[selectedWorkers.caption] = selectedWorkers.array.filter(worker=>
                worker.id===option.idNumber
            ).map(element=>element[addedKey])
        )
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
                <button className='close' onClick={()=>setEnableOptions(!enableOptions)}>X</button>
                <div className='peoplePickerList'>
                {options.map((option, index)=>
                    <div className='peopleCard' key={index} onClick={()=>updateList({id: option.idNumber, name: option.name})}>
                        <div className={`notImage ${selectedWorkers&&'tiny'}`}>Foto Pendiente</div>
                        <div className='PeoplePickerName'><b>{option.name}</b></div>
                        <div className='PeoplePickerCharge'>{option.charge}</div>
                        {selectedWorkers && selectedWorkers.caption && option[selectedWorkers.caption] &&
                            <div className='selection'>
                                <div className="selectionTitle">{selectedWorkers.caption}</div>
                                {option[selectedWorkers.caption].map((element, index)=>
                                    <div key={index} className='selectionField'>{element}</div>
                                )}
                            </div>                        
                        }
                    </div>)}
                </div>
            </div>}
        </div>
    )
}