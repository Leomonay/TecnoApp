import React from "react";
import { useDispatch } from "react-redux";
import {
  getPlantLocation,
  updateArea,
} from "../../../../actions/addPlantsActions.js";

import styles from "./UpdatePlant.module.css";

const UpdateArea = ({
  updateAreaData,
  setUpdateAreaData,
  plantName,
  setShowModalUpdate,
  showModalUpdate,
}) => {
  const dispatch = useDispatch();

  const showHideClassName = showModalUpdate ? "displayblock" : "displaynone";

  //Función boton editar una planta de la lista

  const handleUpdateArea = async (event) => {
    setUpdateAreaData({
      ...updateAreaData,
      [event.target.name]: event.target.value,
    });
  };
  
  const handleSubmitUpdateArea = async (event) => {
    event.preventDefault();
    let response = await dispatch(updateArea(updateAreaData));

    dispatch(getPlantLocation(plantName));
    console.log("response", response);
    if (response.areaUpdated.acknowledged) {
      alert("Cambios Realizados");
    } else {
      alert("No se pudieron hacer los cambios");
    }
    setUpdateAreaData({
      newName: "",
      newCode: "",
      oldName: "",
      oldCode: "",
    });
    setShowModalUpdate(false);
  };
  //Fin funciones para editar una planta de la lista

  return (
    <div className={styles[showHideClassName]}>
      <section className={styles.modalmain}>
        <div className={styles.container}>
          <form onSubmit={(e) => handleSubmitUpdateArea(e)} id="updateArea">
            <div className={styles.containerInputs}>
              <h4>Editar planta</h4>
              <div>
                <div className={styles.inputs}>
                  <label>Nombre: </label>
                  <input
                    type="text"
                    name="newName"
                    autoComplete="off"
                    value={updateAreaData.newName}
                    onChange={(e) => handleUpdateArea(e)}
                    placeholder="Ingrese el nombre..."
                  />
                </div>
                <div className={styles.inputs}>
                  <label>Código: </label>
                  <input
                    type="text"
                    name="newCode"
                    autoComplete="off"
                    value={updateAreaData.newCode}
                    onChange={(e) => handleUpdateArea(e)}
                    placeholder="Ingrese el código..."
                  />
                </div>
              </div>
            </div>
          </form>
          <div className={styles.buttonContainer}>
            <button type="submit" key="submitFormButton" form="updateArea">
              Guardar Cambios Area
            </button>
            <button onClick={() => setShowModalUpdate(false)}>Cerrar</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpdateArea;
