import { useState } from "react"
import { useSelector } from "react-redux"
import './index.css'

export default function PeoplePicker(props){
    const {options,selectedWorkers, disabled} = props
    const {userData} = useSelector(state=>state.people)
    const title = `${props.name}`
    const [enableOptions, setEnableOptions]=useState(false)
    const [idList,setIDList]=useState(props.idList || [])


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
        selectedWorkers.array.map(e=>e.id).includes(option.id)).map(option=>
            option[selectedWorkers.caption] = selectedWorkers.array.filter(worker=>
                worker.id===option.id
            ).map(element=>element[addedKey])
        )
    
    }

    function handleOptions(e){
        e.preventDefault()
        setEnableOptions(!enableOptions)
    }

    return(
        <div className='peoplePicker'>
            <button className='peoplePickerSelected'
                id='OptionPickerVisibleOption'
                disabled={disabled}
                onClick={(e)=>handleOptions(e)}>{
                        idList[0] && idList[0].name?
                        idList.map((worker, index)=>{
                            return<div key={index} className='selectedWorker'>{worker.name}</div>
                            })
                        :title
                    }</button>
            {enableOptions&&<div className='peoplePickerListContainer'>
                <button className='button closeButton' onClick={()=>setEnableOptions(!enableOptions)}>X</button>
                <div className='peoplePickerList'>
                {options.sort((a,b)=>a.name>b.name?1:-1).map((option, index)=>
                    <div className={`peopleCard${idList.map(e=>e.id).includes(option.id)?' selectedCard':''}`}
                        key={index}
                        onClick={()=>(option.id !== userData.id) && updateList({id: option.id, name: option.name})}>

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