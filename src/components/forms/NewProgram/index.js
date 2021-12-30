import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUsersList } from "../../../actions/peopleActions"
import { createProgram, getPrograms, updateProgram } from "../../../actions/planActions"
import { PlantSelector } from "../../dropdown/PlantSelector.js"
import PeoplePicker from "../../pickers/PeoplePicker"
import './index.css'

export default function NewProgram(props){
    const dispatch = useDispatch()
    const {userList} = useSelector(state=>state.people)
    const [newProgram, setNewProgram]=useState({})
    const [plant, setPlant] = useState(props.plant)
    const program = props.program

    function handleSubmit(e){
        let errors = []
        props.plant && setNewProgram({...newProgram, plant: plant})
        const cloneprogram={
            plant: plant || program.plant.name,
            name: newProgram.name || program.name,
            people: newProgram.people || program.people.map(e=>({id: e.idNumber, name: e.name})),
            description: newProgram.description || program.description
        }

        e.preventDefault()
        if (!cloneprogram.name){errors.push('NOMBRE')}
        if (!cloneprogram.plant){errors.push('PLANTA')}
        if(errors.length===0){
            dispatch(program?
                updateProgram(program._id, cloneprogram)
                :createProgram(cloneprogram)
            )
            dispatch(getPrograms(props.plant))
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
                        <PlantSelector select={(value)=>setPlant(value)} defaultValue={program?program.plant.name:undefined}/>
                    </div>
                }
                <div className="formRow"><label className="formLabel">Nombre</label>
                    <input className="formText" id='nameInputForm' defaultValue={program?program.name:undefined}
                        onChange={(e)=>setNewProgram({...newProgram, [e.target.id.replace('InputForm','')]:e.target.value})}/>
                </div>

                <div className="formRow"><label className="formLabel">Personal</label>
                <PeoplePicker name='Seleccionar..'
                    options={userList}
                    update={(idArray)=>setNewProgram({...newProgram,people:idArray})}
                    idList={program?program.people.map(e=>({id: e.idNumber, name: e.name})):undefined}
                    />
                </div>

                <div className="formRow"><label className="formLabel">Descripción</label>
                    <textarea className="formText" id='descriptionInputForm' defaultValue={program?program.description:undefined}
                        onChange={(e)=>setNewProgram({...newProgram, [e.target.id.replace('InputForm','')]:e.target.value})}/>
                </div>
                <div className="submitRow">
                    <button type='submit'>GUARDAR PROGRAMA</button>
                </div>
            </form>
        </div>
    )
}