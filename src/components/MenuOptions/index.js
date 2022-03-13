import React from 'react'
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './index.css'

export default function MenuOptions(props) {
  const {options} = props
  // const {selected} = useParams()

  function buildLIOption(option, index){
    return(
        <NavLink  key={index} to={option.url} 
          className={(navData) => `list-group-item listMenuOption ${navData.isActive ? "activeListOption" :''}`}>
          {option.caption}
        </NavLink>
    )
  }

  return (
    <div className='menuOptionsBackground list-group list-group-flush bg-dark'>
        {options&&options.map(buildLIOption)}
    </div>
  );
}
