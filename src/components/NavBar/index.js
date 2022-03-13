import React from "react";
import "./index.css";
import logo from '../../assets/icons/logoTecnoclima.png'
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";

function NavBar() {
  const {userData} = useSelector(state=>state.people)
  const isAdmin = userData.access === 'Admin'

  const navOptions=[
    {section: 'Órdenes de Trabajo', url:'/ots'},
    {section:'Equipos', url:'/equipos'},
    {section:'Plan', url:'/plan'},
  ]

  function handleLogOut(){
    localStorage.removeItem('tecnoToken')
    window.location = '/'
  }

  return (
    <nav className="navbar navbar-expand-md navbar-light" style={{backgroundColor: 'darkred', color:'whitesmoke'}}>
    <div className="container-fluid">
      <Link to='/panel'><img className='navBarLogo navbar-brand' src={logo} alt=''/></Link>
      <button className="navbar-toggler menuIcon" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"/>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
        
        <div className="navBarLinkContainer">
          {navOptions.map((option,index)=>
            <NavLink to={option.url} key={index}
              className={(navData) => `col btn nav-item navBarLink ${navData.isActive ? "activeNavLink" :''}`}>
              {option.section}
            </NavLink>
          )}
        </div>
        {isAdmin&& <div className="navBarLinkContainer">
          <NavLink to={'/admin'}
            className={(navData) => `col btn nav-item navBarLink ${navData.isActive ? "activeAdminLink" :''}`}>
            Menú Admin
          </NavLink>
        </div>}
        <div className="navBarLinkContainer" style={{marginLeft: 'auto'}}>
          <button className="col btn btn-outline-secondary" onClick={()=>handleLogOut()}>
          Cerrar Sesión <i className="fas fa-sign-out-alt"/>
          </button>
        </div>
        {/* <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-danger" type="submit">Search</button>
        </form> */}
      </div>
    </div>
  </nav>
  );
}
export default NavBar;