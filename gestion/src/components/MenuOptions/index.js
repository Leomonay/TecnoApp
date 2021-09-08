import React from 'react'
import { useSelector } from 'react-redux';
import './index.css'

export default function MenuOptions() {
  const {data} = useSelector((state) => state.data);

  var options= data? data.options : JSON.parse(localStorage.getItem('tecnoApp')).options
  console.log('menuOptions',options)


  function buildOption(option){
    return(
      <div className='menuOption'>
        {option}
      </div>
    )
  }


  return (
    <div className='menuOptionsBackground'>
    {options&&options.map(buildOption)}
    </div>
  );
}
