import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  getCylinderData,
  deleteCylinder,
  getCylinderList,
} from "../../../../actions/adminCylindersActions";
import UpdateCylinder from "../UpdateCylinder/UpdateCylinder";

import styles from "./CylinderList.module.css";

const assignedTo = (workers, id) => {
  let worker = workers.filter((e) => e.id === id);
  if (worker.length !== 0) return worker[0].name;
  else return "En Stock";
};

const refrigerantContain = (refrigerants, id) => {
  let refrigerant = refrigerants.filter((e) => e.id === id);
  if (refrigerant.length !== 0) return refrigerant[0].refrigerante;
};

export default function CylindersList({ cylinders, workers, refrigerants }) {
  const dispatch = useDispatch();

  let [showModalUpdate, setShowModalUpdate] = useState(false);

  //Función boton editar una garrafa de la lista
  let [updateCylinderData, setUpdateCylinderData] = useState({
    newAssignedTo: "",
    newStatus: "",
    id: "",
    oldCode: "",
    oldAssignedTo: "",
    oldStatus: "",
  });

  const handleEditCylinder = (event) => {
    dispatch(getCylinderData(event.target.value));
    setShowModalUpdate(true);
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
      <UpdateCylinder
        updateCylinderData={updateCylinderData}
        setUpdateCylinderData={setUpdateCylinderData}
        setShowModalUpdate={setShowModalUpdate}
        showModalUpdate={showModalUpdate}
        workers={workers}
      />

      <div>
        <div className={styles.divScroll}>
          <div className={styles.tabla}>
            <label>Code</label>
            <label>Asignado</label>
            <label>Status</label>
            <label>Stock Inicial</label>
            <label>Stock Actual</label>
            <label>Refrigerante</label>
          </div>
          {cylinders.length !== 0 &&
            cylinders.map((element) => {
              return (
                <div key={element._id} className={styles.tabla}>
                  <label>{element.code}</label>
                  <label>{assignedTo(workers, element.assignedTo)}</label>
                  <label>{element.status}</label>
                  <label>{element.initialStock}</label>
                  <label>{element.actualStock}</label>
                  <label>
                    {refrigerantContain(refrigerants, element.refrigerant)}
                  </label>
                  <button
                    key={"delete" + element}
                    className={styles.removeButton}
                    title="Eliminar"
                    value={element._id}
                    onClick={(e) => handleDeleteCylinder(e)}
                  />
                  <button
                    className={styles.editButton}
                    title="Edit"
                    key={"edit" + element}
                    value={element._id}
                    onClick={(e) => handleEditCylinder(e)}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
