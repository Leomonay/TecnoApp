import { useState } from "react"
import NewProgram from "../../forms/NewProgram"
import './index.css'

export default function ProgramCard (props){
    const {program} = props
    const [edit, setEdit]=useState(false)

    return(
        <div className="programCard">
            <div className="title">{program.name}</div>
            <h6>{program.people.length} personas</h6>
            <div className="miniText">{program.description}</div>
            <div className='cardRow'>
                <button className='editButton' title='Editar' 
                    onClick={()=>{setEdit(!edit)} }/>
                <button className='removeButton' title='Eliminar' 
                    onClick={()=>{} }/>
            </div>
            {edit && <NewProgram
                program={program}
                close={()=>setEdit(!edit)}/>}
        </div>
    )
}