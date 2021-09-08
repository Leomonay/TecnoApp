import React from 'react'
import './index.css'
import NavBar from '../../components/NavBar/index'
import MenuOptions from '../../components/MenuOptions'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Tabla from '../../components/Table';



export default function Panel(){
  const {data} = useSelector((state) => state.data);
  const dispatch = useDispatch()
  console.log('panelData:',data)
  
  const {option} = useParams()
  console.log('panelOption',option)


  return (
    <div className='panelBackground'>
      <NavBar/>
      <div className='panelContainer'>
        {option&&<MenuOptions/>}
        <div>
          <ul>
            <li>Resumen de Info</li>
            <Tabla></Tabla>
          </ul>
        </div>
      </div>
    </div>
  );
}