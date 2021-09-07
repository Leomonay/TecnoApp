import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {getAccesos, opcionesPanel} from '../../../config'
import './index.css'

function createAccessButton(text,menu){
  const backgroundColor= {'backgroundColor':opcionesPanel[text].color}

  return(
    <div className="AccessButton" key={text} style={backgroundColor}
    onClick={(e)=>handleClick(e)}

    >
      {text}
    </div>
  )
}

function handleClick(e,menu){
  console.log(e.target.className.includes('selectedOption'))
  if(e.target.className.includes('selectedOption')){
    e.target.className+=' selectedOption'
  }
  console.log(menu)
}

export default function HomeOptions(menu) {
  const {mode} = useParams();

  return (
    <div className='HomeOptionsBackground'>
        <div className='accessesContainer'>
          {getAccesos(mode).map(text=>createAccessButton(text))}
        </div>
    </div>
  );
}
