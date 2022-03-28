import React, { useState } from "react";
import "./index.css";
import logo from '../../assets/icons/logoTecnoclima.png'
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";

function NavBar() {
  const {userData} = useSelector(state=>state.people)
  const isAdmin = userData.access === 'Admin'
  const [visible, setVisible] = useState(false)

  const navOptions=[
    {section: 'Órdenes de Trabajo', url:'/ots'},
    {section:'Equipos', url:'/equipos'},
    {section:'Plan', url:'/plan'},
  ]

  function handleToggle(e){
    e.preventDefault()
    setVisible(!visible)
  }

  function handleLogOut(){
    setVisible(false)
    localStorage.removeItem('tecnoToken')
    window.location = '/'
  }

  return (
    <>
    <nav className="navBar bg-nav text-light d-flex align-items-center">
      <Link className="m-1 p-0" to='/panel' onClick={()=>setVisible(false)}>
        <img className='navBarLogo navbar-brand' src={logo} alt=''/>
      </Link>
      <button className="btn btn-outline-dark toggleMenu" 
        onClick={handleToggle}
        style={{height: 'fit-content'}}>
        <i className="fas fa-bars"/>
      </button>
      <div className={`navBarLinkContainer container py-0 px-0 ${visible ? 'visibleNavBar' : ''} `}>
        <div className="row m-0 navBarLinks w-100">
          <div className="col-auto p-0 navBarLinks">
            {navOptions.map((option,index)=>
                <NavLink to={option.url} key={index}
                  onClick={()=>setVisible(false)}
                  className={(navData) => `col btn nav-item navBarLink ${navData.isActive ? "activeNavLink" :''}`}>
                  {option.section}
                </NavLink>
              )}
          </div>
          <div className="col-auto p-0">
            {isAdmin&& <NavLink to={'/admin'}
                onClick={()=>setVisible(false)}
                className={(navData) => `col btn nav-item navAdminLink ${navData.isActive ? "activeAdminLink" :''}`}>
                Menú Admin
              </NavLink>}
          </div>
          <div className="col-sm p-0 d-flex justify-content-end w-100">
            <button className="btn btn-outline-secondary mx-2 logOutButton" onClick={()=>handleLogOut()} 
              style={{height: 'fit-content', minWidth: 'fit-content'}}>
              Cerrar Sesión <i className="fas fa-sign-out-alt"/>
            </button>
          </div>
        </div>        
      </div>
                {/* <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-danger" type="submit">Search</button>
          </form> */}
    </nav>
    </>
  );
}
export default NavBar;