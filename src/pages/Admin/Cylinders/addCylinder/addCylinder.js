import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addCylinder,getCylinderList } from "../../../../actions/adminCylindersActions";
import styles from "./addCylinder.module.css";

const AddCylinder = ({ setShowModal, showModal }) => {
  const dispatch = useDispatch();

  const { workers, refrigerants } = useSelector(
    (state) => state.adminCylinders
  );

  const showHideClassName = showModal ? "displayblock" : "displaynone";

  const statusGarrafa = ["Nueva", "En uso", "Vacia", "Descartada"];

  let [inputCylinder, setInputCylinder] = useState({
    code: "",
    refrigerant: "",
    initialStock: "",
    assignedTo: "",
    status: "",
  });

  const [errors, setErrors] = useState(true);

  const handleChange = (event) => {
    setInputCylinder({
      ...inputCylinder,
      [event.target.name]: event.target.value,
    });
    if (
      inputCylinder.code !== "" &&
      inputCylinder.refrigerant !== "" &&
      inputCylinder.initialStock !== "" &&
      // inputCylinder.assignedTo !== "" &&
      inputCylinder.status !== ""
    )
      setErrors(false);
    else setErrors(true);
  };

  //Función para agregar una garrafa

  const handleSubmitCylinder = async (event) => {
    event.preventDefault();
    let response = await dispatch(addCylinder(inputCylinder));
      dispatch(getCylinderList())
          alert(response);

    setInputCylinder({
      code: "",
      refrigerant: "",
      initialStock: "",
      assignedTo: "",
      status: "",
        });
    setShowModal(false);
  };

  //Fin de la función para agregar una garrafa

  const handleClose = () => {
    setInputCylinder({
      code: "",
      refrigerant: "",
      initialStock: "",
      assignedTo: "",
      status: "",
        });
    setShowModal(false);
    setErrors(true);
  };

  return (
    <div className={styles[showHideClassName]}>
      <section className={styles.modalmain}>
        <h5>Agregar nueva garrafa</h5>
        <div className={styles.container}>
          <form onSubmit={(e) => handleSubmitCylinder(e)} id="addCylinder">
            <div>
              <label>Código: </label>
              <input
                type="text"
                name="code"
                autoComplete="off"
                value={inputCylinder.code}
                onChange={(e) => handleChange(e)}
                placeholder="Ingrese el código..."
              />
            </div>
            <div>
              <label>Carga Inicial: </label>
              <input
                type="real"
                name="initialStock"
                min="0"
                autoComplete="off"
                value={inputCylinder.initialStock}
                onChange={(e) => handleChange(e)}
                placeholder="Ingrese la carga..."
              />
            </div>
            <div>
              <label>Refrigerante: </label>
              <select name="refrigerant" onChange={(e) => handleChange(e)}>
                <option selected={true}>Seleccionar Refrigerante</option>
                {refrigerants.length !== 0 &&
                  refrigerants.map((element) => {
                    return (
                      <option key={element.id} value={element.id}>
                        {element.refrigerante}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div>
              <label>Trabajador: </label>
              <select name="assignedTo" onChange={(e) => handleChange(e)}>
                <option  selected={true}>Seleccionar Trabajador</option>
                <option value="">Stock</option>
                {workers.length !== 0 &&
                  workers.map((element) => {
                    return (
                      <option key={element.id} value={element.id}>
                        {element.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div>
              <label>Status: </label>
              <select name="status" onChange={(e) => handleChange(e)}>
                <option  selected={true}>Seleccionar Status</option>
                {statusGarrafa.map((element) => {
                  return (
                    <option key={"status" + element} value={element}>
                      {element}
                    </option>
                  );
                })}
              </select>
            </div>
          </form>
          <div>
          {errors ? (
            <button
              type="submit"
              key="submitFormButton"
              form="addPlant"
              disabled={errors}
              className="disabledButton"
            >
              Cargar
            </button>
          ) : (
            <button type="submit" key="submitFormButton" form="addCylinder">
              Cargar
            </button>
          )}
           <button onClick={() => handleClose()}>Cerrar</button>
           </div>
        </div>
      </section>
    </div>
  );
};

export default AddCylinder;
