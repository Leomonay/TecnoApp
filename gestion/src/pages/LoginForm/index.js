import React from "react";
import "./index.css";

export default function LoginForm() {
  return (
    <div className="loginForm">
      <div className="loginInputContainer">
        <label className="loginLabel">Username</label>
        <input className="loginInput" type="text" />
      </div>
      <div className="loginInputContainer">
        <label className="loginLabel">Password</label>
        <input className="loginInput" type="password" />
      </div>
      <div className="loginButtons">
        <button>Registrarase</button>
        <button>Iniciar Sesión</button>
      </div>
    </div>
  );
}
