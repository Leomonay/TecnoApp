import { useState } from "react"
import './index.css'

export default function ProgramFilters(props){
    const {programList} = props
    const [filters, setFilters]=useState({})

    function handleValue (item,value){
        const newFilters = {...filters}
        if(value===''){
            delete newFilters[item]
        }else{
            newFilters[item]= Number(value) || value
        }
        setFilters(newFilters)
        props.select(newFilters)
    }

    return(<div>
        <select className='programOption' onChange={(e)=>handleValue('program', e.target.value)} disabled={!programList}>
            <option value = ''>{programList?'todos los programas':'Seleccione Planta y año'}</option>
            {programList && programList.map(element=>element.name).map(name=>
                <option key={name} value={name}>{name}</option>
            )}
        </select>
        <select onChange={(e)=>handleValue('responsible', e.target.value)} disabled={!filters.program}>
            <option value = ''>{filters.program?'todos los responsables':'Seleccione Programa'}</option>
            {filters.program && programList.find(program=>program.name===filters.program).people.map(worker=>
                <option key={worker.id} value={worker.id}>{worker.name}</option>
            )}
        </select>
    </div>)
}