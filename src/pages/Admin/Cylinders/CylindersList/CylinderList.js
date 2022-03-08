import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { deleteCylinder } from "../../../../actions/adminCylindersActions";
import { getCylinderList,deleteCylinder } from "../../../../actions/StoreActions";
import NewCylinder from "../../../../components/forms/NewCylinder";

import './index.css'


export default function CylindersList({ cylinders, workers, statuses }) {
  const {refrigerants} = useSelector((state)=>state.adminCylinders)
  const [cylinder, selectCylinder] = useState(false)
  const dispatch = useDispatch();

  //Función boton editar una garrafa de la lista
  const handleEditCylinder = (id) => {
    const cylinder = {...cylinders.find(e=>e.id===id)}
    if (!cylinder.assignedTo && cylinder.user) cylinder.assignedTo = cylinder.user
    delete cylinder.user
    cylinder.refrigerant = refrigerants.find(r=>r.code === cylinder.refrigerant).id
    console.log('cylinder from List', cylinder)
    selectCylinder(cylinder)
  };
  //Fin funciones para editar una garrafa de la lista

  //Funcion para borrar una garrafa
  const handleDeleteCylinder = async (event) => {
    let response = await dispatch(deleteCylinder({ id: event.target.value }));
    if (response.hasOwnProperty("message")) {
      alert(response.message);
    } else {
      alert("La garrafa fue borrada");
    }
    dispatch(getCylinderList());
  };

  //Fin función para borrar una garrafa
  return (
    <div>
      {cylinder &&
        <NewCylinder
          cylinder={cylinder}
          onSave={()=>{}}
          statuses={statuses}
          onClose={()=>selectCylinder(false)}/>}

      <table class="table table-striped" style={{textAlign:'center', marginLeft: '1rem', marginRight: '1rem'}}>
        <thead>
          <tr>
            <th scope="col">Código</th>
            <th scope="col">Asignado</th>
            <th scope="col">Status</th>
            <th scope="col">Stock Inicial</th>
            <th scope="col">Stock Actual</th>
            <th scope="col">Refrigerante</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cylinders[0] && cylinders.map( (element, index)=>
          <tr key={index}>
            <td><b>{element.code}</b></td>
            <td>{element.user? workers.find(e=>e.id===element.user).name : 'STOCK'}</td>
            <td>{element.status}</td>
            <td>{element.initialStock}</td>
            <td>{element.currentStock}</td>
            <td>{element.refrigerant}</td>
            <td>
              <button className="button removeButton"
                title="Eliminar"
                onClick={() => dispatch(deleteCylinder(element.id))}
                style={{margin:'0'}}
                value={element.id}>
              </button>
              <button
                  className='button editButton'
                  title="Modificar"
                  value={element._id}
                  style={{margin:'0 .2rem'}}
                  onClick={() => handleEditCylinder(element.id)}
                />
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}
