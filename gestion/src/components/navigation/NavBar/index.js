import React from "react";
import { NavLink, useParams } from "react-router-dom";
import {permisos, opcionesPanel, getAccesos, navOptions} from '../../../config'
import "./index.css";
import logo from '../../../assets/icons/logoTecnoclima.png'

function buildNavLinks(acceso){
  return(
    // <NavLink exact to={navOptions[acceso].url} activeClassName="active">{navOptions[acceso].text}</NavLink>
    <div className='navBarButton' id={acceso} key={acceso} onClick={e=>handleClick(e)}>{navOptions[acceso].text}</div>
  )
}

function handleClick(e){
  const data = JSON.parse(localStorage.getItem('tecnoApp'))
  data.options=[]
  permisos[data.modo].forEach(option=>{
    if (Object.values(opcionesPanel[e.target.id]).includes(option)){
      data.options.push(option)
    }
  })
  localStorage.setItem('tecnoApp',JSON.stringify(data))
}

function NavBar() {
  const modo = JSON.parse(localStorage.getItem('tecnoApp')).modo
  const accesos = getAccesos(modo)

  return (
    <nav className='navBarBackground'>
      <img className='navBarLogo' src={logo} alt=''/>
        {accesos.map(buildNavLinks)}
    </nav>
  );
}
export default NavBar;
