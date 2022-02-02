import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUsersList } from "../../../actions/peopleActions"
import { createProgram, getPrograms, updateProgram } from "../../../actions/planActions"
import { PlantSelector } from "../../dropdown/PlantSelector.js"
import PeoplePicker from "../../pickers/PeoplePicker"
import './index.css'

export default function NewProgram(props){
    const thisYear = (new Date()).getFullYear()
    const years = [thisYear-1, thisYear, thisYear+1]
    const dispatch = useDispatch()
    const {userList} = useSelector(state=>state.people)
    const [newProgram, setNewProgram]=useState({year:thisYear})
    const program = props.program || undefined
    const [plant, setPlant] = useState(props.plant||program? program.plant : undefined)
    const {selectedWorkers} = props

    function handleSubmit(e){
        e.preventDefault()
        let errors = []
        props.plant && setNewProgram({...newProgram, plant: plant})
        const cloneprogram = {
            plant: plant || program.plant,
            year: newProgram.year || program.year,
            name: newProgram.name || program.name,
            supervisor: newProgram.supervisor || program.supervisor || undefined,
            people: newProgram.people || program.people.map(e=>e.id),
            description: newProgram.description || program.description
        }

        if (!cloneprogram.name){errors.push('NOMBRE')}
        if (!cloneprogram.plant){errors.push('PLANTA')}
        if(errors.length===0){
            dispatch(program?
                updateProgram(program._id, cloneprogram)
                :createProgram(cloneprogram)
            )
            dispatch(getPrograms(props.plant, cloneprogram.year))
            props.close()
        }else{
            alert(`${errors.length===1?"Se requiere el campo":"Se requieren los campos"} ${errors}`)
        }
    }

    useEffect(()=>dispatch(
        getUsersList({plant:plant || undefined, access:['Worker','Supervisor'], active:true}))
    ,[dispatch, plant])
    
    return(
        <div className="modal">
            <form onSubmit={(e)=>handleSubmit(e)} className="modalForm">
                <button className="closeButton" onClick={()=>props.close()}>X</button>
                <div className="title">{`${program?'Editar':'Crear'} programa`}</div>
                { !props.plant &&
                    <div className="formRow">
                        <PlantSelector
                            select={(value)=>setPlant(value)} 
                            defaultValue={program?program.plant:undefined}/>
                    </div>
                }
                <div className="formRow"><label className="formLabel">Año</label>
                    <select 
                        onChange={(e)=>setNewProgram({...newProgram, year: e.target.value})}
                        defaultValue={program?program.year:thisYear}>
                        {years && years.map((year, index)=>
                            <option value={year} key={index}>{year}</option>
                        )}
                    </select>
                </div>

                <div className="formRow">
                    <label className="formLabel">Nombre</label>
                    <input className="formText" id='nameInputForm'
                        defaultValue={program ? program.name : undefined}
                        onChange={(e)=>setNewProgram({
                            ...newProgram,
                            [e.target.id.replace('InputForm','')]
                            :e.target.value})}/>
                </div>

                <div className="formRow"><label className="formLabel">Supervisor</label>
                    <select onChange={(e)=>setNewProgram({...newProgram, supervisor: Number(e.target.value)})}
                        defaultValue={program?(program.supervisor.id.toString()):undefined}>
                        <option value = ''>Seleccionar...</option>
                        {userList.filter(e=>e.access==='Supervisor').map((person, index)=>
                            <option key={index} value={person.idNumber}>
                                {`(${person.idNumber}) ${person.name}`}
                            </option>
                        )}
                    </select>
                </div>

                <div className="formRow"><label className="formLabel">Personal</label>
                <PeoplePicker name='Seleccionar..'
                    options={userList.filter(e=>e.access==='Worker')}
                    update={(idArray)=>setNewProgram({...newProgram, people: idArray.map(e=>e.id)})}
                    idList={program?program.people.map(e=>({id: e.idNumber, name: e.name})):undefined}
                    selectedWorkers={{caption:'Programa(s)', array:selectedWorkers}}
                    />
                </div>

                <div className="formRow"><label className="formLabel">Descripción</label>
                    <textarea className="formText" id='descriptionInputForm'
                    defaultValue={program?program.description:undefined}
                        onChange={(e)=>setNewProgram({...newProgram, [e.target.id.replace('InputForm','')]:e.target.value})}/>
                </div>
                <div className="submitRow">
                    <button type='submit'>GUARDAR PROGRAMA</button>
                </div>
            </form>
        </div>
    )
}