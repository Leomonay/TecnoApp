import React, { useEffect, useState } from "react";
import "./index.css";
import logo from '../../assets/icons/logoTecnoclima.png'
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";

function NavBar() {
  const {userData} = useSelector(state=>state.people)
  const [seeBar, setSeeBar] = useState(window.innerWidth>900)
  const isAdmin = userData.access === 'Admin'

  const navOptions=[
    {section: 'Gestión de OT', url:'/ots', crud:true},
    {section:'Plan', url:'/plan', crud:true},
  ]

  function handleLogOut(){
    localStorage.removeItem('tecnoToken')
    window.location = '/'
  }

  function handleHide(e){
    e.preventDefault()
    const {className} = e.target
    if (className === 'navBarOptionsModal' && window.innerWidth<900){
      setSeeBar(false)
    }
  }

  return (
    <nav className='navBarBackground'>
        <Link to='/panel'><img className='navBarLogo' src={logo} alt=''/></Link>
        <button className='navBarMenu' title='menu' onClick={()=>setSeeBar(!seeBar)}>
          <i className="fas fa-bars"></i>
        </button>
        {seeBar&&
        <div className="navBarOptionsModal" onClick={(e)=>handleHide(e)}>
          <div className="navBarOptions">
            <div>
              {navOptions.map((option,index)=>
                <NavLink to={option.url} key={index} className='navBarButton' activeClassName="activeNavLink"
                  onClick={()=>window.innerWidth<900 && setSeeBar(false)}>
                  {option.section}
                </NavLink>
              )}
              {isAdmin&&<NavLink to={'/admin'} className='navBarButton navBarAdmin' activeClassName="activeAdminLink">
                Menú Admin
              </NavLink>}
            </div>
            <button className="logOutButton" onClick={handleLogOut}>
                <div className="screenWidth">Cerrar Sesión</div>
                {/* <i className="fas fa-sign-out-alt phonewidth"></i> */}
            </button>

          </div>
        </div>}
              
    </nav>
  );
}
export default NavBar;