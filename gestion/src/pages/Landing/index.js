import React from 'react'
import {Link} from 'react-router-dom'
import './index.css'
import Logo from '../../assets/icons/logoTecnoclima.png'
import landingPhoto from '../../assets/fotos/landingPhoto.jpg'
import LoginForm from '../LoginForm/index'
import Carrousell from '../../components/Carrousell/index'

function handleClick(e){
const modos={
  internButton:'interno',
  clientButton:'cliente',
  superAdminButton: 'superadmin',
  supervButton: 'supervisor'
}
console.log(modos[e.target.className])
localStorage.setItem('tecnoApp',JSON.stringify({modo:modos[e.target.className]}))

}


export default function Equipos() {
  return (
    <div className='landingBackground'>
      
      <div className='landingWelcome'>
      <div className='landingCorp'>
        <img className="landingLogo" src={Logo} alt=''/>
        <div className="carouselContainer">
          <Carrousell/>
        </div>
      </div>

        {/* <img className='landingImg' src={landingPhoto} alt=''/> */}
      

        <div className='landingForms'>
          <h1>Bienvenid@,</h1>
          <h2>Inicie sesión para comenzar</h2>
          <LoginForm/>

          <div className='testButtons'>
            <Link to='/panel'><button className={"internButton"} onClick={(e)=>handleClick(e)}>INTERNO</button></Link>
            <Link to='/panel'><button className={"clientButton"} onClick={(e)=>handleClick(e)}>CLIENTE</button></Link>
            <Link to='/panel'><button className={"superAdminButton"} onClick={(e)=>handleClick(e)}>SUPERADMIN</button></Link>
            <Link to='/panel'><button className={"supervButton"} onClick={(e)=>handleClick(e)}>SUPERVISOR</button></Link>
          </div>

        </div>
      </div>
    </div>
  );
}