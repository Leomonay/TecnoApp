import React from 'react'
import {Link, useParams} from 'react-router-dom'
import './index.css'



export default function Landing() {
    const {mode} = useParams();

    return (
      <div className='panelBackground'>
        {/* <div className='optionMenu'>
        <div><img src={Logo} alt=''/></div>
            <div>
              {permisos[mode].map(text=>createOption(text))}
            </div>
        </div> */}
      </div>
    );
}