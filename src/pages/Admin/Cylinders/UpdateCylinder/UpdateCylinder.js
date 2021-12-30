import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  updateCylinder,
  getCylinderList,
} from "../../../../actions/adminCylindersActions.js";
import styles from "./UpdateCylinder.module.css";
const UpdateCylinder = ({
  updateCylinderData,
  setUpdateCylinderData,
  setShowModalUpdate,
  showModalUpdate,
  workers,
}) => {
  const dispatch = useDispatch();

  const statusGarrafa = ["Nueva", "En uso", "Vacia", "Descartada"];
  const { cylinderData } = useSelector((state) => state.adminCylinders);
  //Función boton editar una garrafa de la lista

  useEffect(
    () =>
      setUpdateCylinderData({
        newAssignedTo: cylinderData.assignedTo,
        newStatus: cylinderData.status,
        id: cylinderData._id,
        oldCode: cylinderData.code,
        oldAssignedTo: cylinderData.assignedTo,
        oldStatus: cylinderData.status,
      }),
    [cylinderData,setUpdateCylinderData]
  );

  const handleUpdateCylinder = async (event) => {
    setUpdateCylinderData({
      ...updateCylinderData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmitUpdateCylinder = async (event) => {
    event.preventDefault();
    let response = await dispatch(updateCylinder(updateCylinderData));
    dispatch(getCylinderList());
    if (response.cylinderUpdated.acknowledged) {
      alert("Cambios Realizados");
    } else {
      alert("No se pudieron hacer los cambios");
    }
    setUpdateCylinderData({
      newAssignedTo: "",
      newStatus: "",
      id: "",
      oldCode: "",
      oldAssignedTo: "",
      oldStatus: "",
    });
    setShowModalUpdate(false);
  };
  //Fin funciones para editar una garrafa de la lista

  const showHideClassName = showModalUpdate ? "displayblock" : "displaynone";

  return (
    <div className={styles[showHideClassName]}>
      <section className={styles.modalmain}>
        <div className={styles.container}>
          <form
            onSubmit={(e) => handleSubmitUpdateCylinder(e)}
            id="updateCylinder"
          >
            <div className={styles.containerInputs}>
              <h4>Editar Garrafa</h4>
              <div>
                <label>Code: {updateCylinderData.oldCode}</label>
                {/* <label>Refrigerante: {updateCylinderData.oldrefrigerant}</label>
                <label>Stock Inicial: {updateCylinderData.oldinitialStock}</label>
                <label>Stock Actual: {updateCylinderData.oldactualStock}</label> */}

                <div>
                  <label>Trabajador: </label>
                  <select
                    name="newAssignedTo"
                    onChange={(e) => handleUpdateCylinder(e)}
                  >
                    <option
                      value=""
                      selected={updateCylinderData.oldAssignedTo === ""}
                    >
                      Stock
                    </option>
                    {workers.length !== 0 &&
                      workers.map((element) => {
                        return (
                          <option
                            key={element.id}
                            value={element.id}
                            selected={
                              updateCylinderData.oldAssignedTo === element.id
                            }
                          >
                            {element.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div>
                  <label>Status: </label>
                  <select
                    name="newStatus"
                    onChange={(e) => handleUpdateCylinder(e)}
                  >
                    {statusGarrafa.map((element) => {
                      return (
                        <option
                          key={"status" + element}
                          value={element}
                          selected={updateCylinderData.oldStatus === element}
                        >
                          {element}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          </form>
          <div className={styles.buttonContainer}>
            <button type="submit" key="submitFormButton" form="updateCylinder">
              Guardar Cambios
            </button>
            <button onClick={() => setShowModalUpdate(false)}>Cerrar</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpdateCylinder;
