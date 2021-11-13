import React, { useState } from "react";
import "./index.css";
import logo from '../../assets/icons/logoTecnoclima.png'
import { Link, NavLink } from 'react-router-dom';

function NavBar() {
  const [selected, selectOption] = useState(null)


  const navOptions=[
    {section: 'Gestión de OT', url:'/ots', crud:true},
    {section:'Gestión de Equipos', url:'/equipos', crud:true},
    {section:'Plan', url:'/plan', crud:true},
  ]

  return (
    <nav className='navBarBackground'>
        <Link to='/panel' onClick={()=>selectOption(null)}><img className='navBarLogo' src={logo} alt=''/></Link>
        <div>
          <div>
            {navOptions.map((option,index)=>
              <NavLink to={option.url} key={index} className='navBarButton' activeClassName="activeNavLink" onClick={()=>selectOption(option)}>
                {option.section}
              </NavLink>
            )}
          </div>

          {selected && selected.crud &&
            <div className='navCrudButtons'>
              {['Crear', 'Buscar', 'Modificar', 'Eliminar'].map((crud, index)=>
              <NavLink to={`${selected.url}/${crud.toLowerCase()}`}
                key={index} 
                className='navBarButton crud'
                activeClassName="activeNavLink">
                {crud}
              </NavLink>
              )}
            </div>}

        </div>
      
    </nav>
  );
}
export default NavBar;