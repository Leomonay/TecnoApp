import React from 'react'
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './index.css'

export default function MenuOptions(props) {
  const {options} = props
  const {selected} = useParams()

  function buildOption(option, index){
    return(
      <NavLink className='menuOption list-group-item' key={index} to={option.url} activeClassName='activeOption'>
        {option.caption}
      </NavLink>
    )
  }
  function buildLIOption(option, index){
    return(
        <NavLink className='list-group-item listMenuOption' key={index} to={option.url} activeClassName='activeListOption'>
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
