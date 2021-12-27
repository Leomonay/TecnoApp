import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  getPlantList,
  addPlant,
} from "../../../../actions/addPlantsActions.js";
import styles from "./addPlant.module.css";

const AddPlant = ({ setShowModal, showModal }) => {
  const dispatch = useDispatch();
  
  const showHideClassName = showModal ? "displayblock" : "displaynone";

  let [inputPlant, setInputPlant] = useState({
    name: "",
    code: "",
  });

  //Función crear planta
  const handleChangePlant = (event) => {
    setInputPlant({ ...inputPlant, [event.target.name]: event.target.value });
  };

  const handleSubmitPlant = async (event) => {
    event.preventDefault();
    let response = await dispatch(addPlant(inputPlant));

    dispatch(getPlantList());
    if (response.message) {
      alert(response.message);
    } else {
      alert("La planta " + response.plantStored.name + " fue creada");
    }
    setInputPlant({
      name: "",
      code: "",
    });
    setShowModal(false);
  };
  //Fin de la función para agregar una planta nueva

  return (
    <div className={styles[showHideClassName]}>
      <section className={styles.modalmain}>
        <div className={styles.container}>
          <form onSubmit={(e) => handleSubmitPlant(e)} id="addPlant">
            <div className={styles.containerInputs}>
              <h4>Agregar nueva planta</h4>
              <div className={styles.inputs}>
                <label>Nombre: </label>
                <input
                  type="text"
                  name="name"
                  autoComplete="off"
                  value={inputPlant.name}
                  onChange={(e) => handleChangePlant(e)}
                  placeholder="Ingrese el nombre..."
                />
              </div>
              <div className={styles.inputs}>
                <label>Código: </label>
                <input
                  type="text"
                  name="code"
                  autoComplete="off"
                  value={inputPlant.code}
                  onChange={(e) => handleChangePlant(e)}
                  placeholder="Ingrese el código..."
                />
              </div>
            </div>
          </form>
            <div className={styles.buttonContainer}>
              <button type="submit" key="submitFormButton" form="addPlant">
                Crear Planta
              </button>
              <button onClick={() => setShowModal(false)}>Cerrar</button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default AddPlant;