import React from 'react'
import './index.css'
import NavBar from '../../components/navigation/NavBar/index'
import MenuOptions from '../../components/MenuOptions'
import { useDispatch, useSelector } from 'react-redux';



export default function OptionPanel(){
  const {data} = useSelector((state) => state.data);
  const dispatch = useDispatch()


  return (
    <div className='panelBackground'>
      <NavBar/>
      <div className='panelContainer'>
        <MenuOptions/>
        <div>
          <ul>
            <li>Resumen de Info</li>
          </ul>
        </div>
      </div>
    </div>
  );
}