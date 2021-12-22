import React from "react";
import "./index.css";
import logo from '../../assets/icons/logoTecnoclima.png'
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";

function NavBar() {
  const {userData} = useSelector(state=>state.data)
  const isAdmin = userData.access === 'Admin'
  console.log('isAdmin', isAdmin)

  const navOptions=[
    {section: 'Gestión de OT', url:'/ots', crud:true},
    {section:'Gestión de Equipos', url:'/equipos', crud:true},
    {section:'Plan', url:'/plan', crud:true},
  ]

  return (
    <nav className='navBarBackground'>
        <Link to='/panel'><img className='navBarLogo' src={logo} alt=''/></Link>
        <div>
          <div>
            {navOptions.map((option,index)=>
              <NavLink to={option.url} key={index} className='navBarButton' activeClassName="activeNavLink">
                {option.section}
              </NavLink>
            )}
            {isAdmin&&<NavLink to={'/admin'} className='navBarButton navBarAdmin' activeClassName="activeAdminLink">
              Menú Admin
            </NavLink>}
          </div>

        </div>
      
    </nav>
  );
}
export default NavBar;