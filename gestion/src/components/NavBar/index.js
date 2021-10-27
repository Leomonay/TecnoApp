import { useDispatch, useSelector } from 'react-redux'
import React from "react";
import {permisos, getAccesos, navOptions, opcionesPanel} from '../../config'
import "./index.css";
import logo from '../../assets/icons/logoTecnoclima.png'
import {updateData} from '../../actions/dataActions'
import { Link, NavLink } from 'react-router-dom';

function NavBar() {
  const {data} = useSelector((state) => state.data);
  const dispatch = useDispatch()

  const modo = JSON.parse(localStorage.getItem('tecnoApp')).modo
  const accesos = getAccesos(modo)

  const navOptions={
    WorkOrders: {url:'/ots/', text:'Gestión de OT'},
    Devices: {url:'/equipos/', text:'Gestión de Equipos'},
  }

  function buildNavLinks(navOption, index){
    const path=navOption.url
    return(
      <NavLink to={path} key={index} className='navBarButton' activeClassName="activeNavLink">
        {navOption.text}
      </NavLink>
    )
  }

  function handleClick(e){
    // si el state está vacío que tome del localstorage
    var temp = data&&data.hasOwnProperty('modo')? data:JSON.parse(localStorage.getItem('tecnoApp'))
    
    
    if(e.target.id){
      temp.options=[]
      permisos[temp.modo].forEach(option=>{
        if (Object.values(opcionesPanel[e.target.id]).includes(option)){
          temp.options.push(option)
        }
      })
    }else{
      temp={modo:temp.modo}
    }
    dispatch(updateData(temp))
    localStorage.setItem('tecnoApp',JSON.stringify(temp))
  }

  return (
    <nav className='navBarBackground'>
        <Link to='/panel' onClick={e=>handleClick(e)}><img className='navBarLogo' src={logo} alt=''/></Link>
        {Object.keys(navOptions).map((option,index)=>buildNavLinks(navOptions[option],index))}
        <NavLink to='/plan' className='navBarButton' activeClassName="active">Plan</NavLink>
    </nav>
  );
}
export default NavBar;
