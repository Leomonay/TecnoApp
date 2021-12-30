import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { authentication } from "../../../actions/dataActions"
import './index.css'

export default function LoginForm(){
    const dispatch = useDispatch()
    const {userData} = useSelector(state => state.people)
    const [enter, setEnter] = useState(false)

    function login(){
        const body = {
          username: document.getElementById('usernameInput').value,
          password: document.getElementById('passwordInput').value
        }
        dispatch(authentication(body))
        setEnter(true)
      }

    useEffect(() => {
        if(userData.user && enter){
        window.location ='/panel'
    }
    }, [enter, userData])
    //enrutamiento

    return(
        <form className="loginForm" onSubmit={()=>login()}>
            <h1>Bienvenid@,</h1>
            <h2>Inicie sesión para comenzar</h2>
            <div className="loginInputContainer">
                <label className="loginLabel">Usuario</label>
                <input className="loginInput" id='usernameInput' type="text" />
            </div>
                <div className="loginInputContainer">
                <label className="loginLabel">Contraseña</label>
            <input className="loginInput" type="password" id='passwordInput' />
            </div>
            <div className="loginButtons">
                <button type='sumbit'>Iniciar Sesión</button>
            </div>
        </form>
    )
}