import React from 'react'
import {Link, useParams} from 'react-router-dom'
import './index.css'
import Logo from './../../assets/icons/logoTecnoclima.png'
import HomeOptions from '../../components/navigation/HomeOptions/index'
import NavBar from '../../components/navigation/NavBar/index'
import MenuOptions from '../../components/navigation/MenuOptions'



export default function Panel(modo){
  const {mode} = useParams();
  var menu = '';

  return (
    <div className='panelBackground'>
      <NavBar/>
      <div className='panelContainer'>
        <div className='menuContainer'>
        <MenuOptions/>
        </div>
      </div>
    </div>
  );
}