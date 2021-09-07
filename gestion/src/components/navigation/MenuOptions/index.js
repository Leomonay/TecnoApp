import React from 'react'
import './index.css'

var options=[]
const data=JSON.parse(localStorage.getItem('tecnoApp'))
if(data.options){options = data.options}
console.log(options)

function buildOption(option){
  return(
    <div className='menuOption'>
      {option}
    </div>
  )
}

export default function MenuOptions() {

  return (
    <div className='menuOptionsBackground'>
      {options.map(buildOption)}
    </div>
  );
}
