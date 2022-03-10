import React from 'react'
import NavBar from '../components/NavBar'
import './index.css'

const Layout = (props) => {
  return(
    <React.Fragment>
      <NavBar />

      <div className="main-content">
        {props.children}
      </div>

    </React.Fragment>
  );
}
export default Layout