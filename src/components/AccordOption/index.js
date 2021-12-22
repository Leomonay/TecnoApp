import { useState } from 'react'
import './index.css'

export default function AccordOption(props){
    const [option, setOption]=useState('')
    const [expansion, setExpansion]=useState(false)

    function selectOption(choice){
        setOption(`: ${choice}`)
        document.getElementById(`accordTitle${props.name}`).className='accordTitleOK'
        props.select(choice)
        setExpansion(!expansion)
    }

    return(
        <div className='accordOption'>
            <div className='accordTitle' id={`accordTitle${props.name}`} onClick={()=>setExpansion(!expansion)}>
                {`${props.name}${option}`}
            </div>
            {expansion&&<div className='accordChoiceContainer'>
                {props.options.map((choice, index)=>
                    <div className='accordChoice'
                    onClick={()=>selectOption(choice)}
                    key={index}>
                    {choice}
                </div>)}
            </div>}
            {!option && <div className='errorMessage'>
                Debe seleccionar {props.name}.
            </div>}

        </div>
    )
}