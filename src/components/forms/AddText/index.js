import { useState } from "react"
import './index.css'

export default function AddTextForm(props){
    const {user, select, close} = props
    const [text, setText]=useState('')
    const today = new Date()

    function handleAddText(e){
        e.preventDefault()
        select(text)
        close()
    }

    return(
        <div className="addInterventionModal">
            <form className="addTextForm" onSubmit={(e)=>handleAddText(e)}>
                <button className="closeButton" onClick={()=>close()}>X</button>
                <div className="title">Agregar Texto</div>
                <textarea className='addTextInput' onChange={(e)=>setText(`(${ today.toLocaleDateString() } ${user}) ${e.target.value}`)}/>
                <div className="flex centerH">
                    <button className="addButton" type='submit'>Agregar</button>
                </div>
            </form>
        </div>
    )
}