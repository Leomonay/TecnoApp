import React from 'react'
import { NavLink } from 'react-router-dom';
import './index.css'

export default function MenuOptions(props) {
  const {options} = props

  function buildOption(option, index){
    return(
      <NavLink className='menuOption' key={index} to={option.url} activeClassName='activeOption'>
        {option.caption}
      </NavLink>
    )
  }

  return (
    <div className='menuOptionsBackground'>
      {options&&options.map(buildOption)}
    </div>
  );
}
