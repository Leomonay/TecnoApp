import React from 'react'
import NavBar from '../components/NavBar'
import './index.css'

const Layout = (props) => {
  return(
    <React.Fragment>
      <NavBar />

      <div className="container-fluid p-0 d-flex flex-column flex-grow-1">
        {props.children}
      </div>

    </React.Fragment>
  );
}
export default Layout