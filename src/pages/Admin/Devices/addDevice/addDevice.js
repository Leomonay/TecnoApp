import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  addDevice,
} from "../../../../actions/abmDevicesActions.js";

import {
  getPlantLocation,
  getLineServicePoints,
  getPlantLines,
} from "../../../../actions/addPlantsActions.js";

import styles from "./addDevice.module.css";

const AddDevice = ({
  setShowModal,
  showModal,
  plants,
  refrigerants,
  selectedData,
}) => {
  const dispatch = useDispatch();

  const { options } = useSelector((state) => state.abmDevices);

  const { areas, lines, servicePoints } = useSelector(
    (state) => state.addPlants
  );
  let [inputDevice, setInputDevice] = useState({
    name: "",
    type: "",
    magnitude: "",
    unit: "",
    extraDetails: "",
    service: "",
    status: "",
    category: "",
    regDate: "",
    environment: "",
    line: "",
    active: "",
    servicePoints: "",
    refrigerant: "",
    plant:"",
    area:""
  });

   const handleChangePlant = (event) => {
    let dispa = event.target.value;
    if (event.target.name === "plant") {
        setInputDevice({
            ...inputDevice,
            [event.target.name]: event.target.value,
          });
      dispatch(getPlantLocation(dispa));
    } else {
        setInputDevice({
            ...inputDevice,
            [event.target.name]: event.target.value,
          });
      dispatch(getPlantLines(dispa));
    }
  };


  const showHideClassName = showModal ? "displayblock" : "displaynone";

  const [errors, setErrors] = useState(true);

  const handleChange = (event) => {
    let newDevice = {
      ...inputDevice,
      [event.target.name]: event.target.value,
    };
    if (event.target.name === "line") {
      dispatch(getLineServicePoints(event.target.value));
    }

    setInputDevice(newDevice);

    if (
      newDevice.name !== "" &&
      newDevice.type !== "" &&
      newDevice.magnitude !== "" &&
      newDevice.unit !== "" &&
      newDevice.service !== "" &&
      newDevice.status !== "" &&
      newDevice.category !== "" &&
      newDevice.regDate !== "" &&
      newDevice.environment !== "" &&
      newDevice.line !== "" &&
      newDevice.active !== "" &&
      newDevice.servicePoints !== "" &&
      newDevice.refrigerant !== ""
    ) {
      setErrors(false);
    } else {
      setErrors(true);
    }
    newDevice = {};
  };

  //Función para agregar un equipo

  const handleSubmitDevice = async (event) => {
    event.preventDefault();
     let response = await dispatch(addDevice(inputDevice));
    alert(response);

    setInputDevice({
      name: "",
      type: "",
      magnitude: "",
      unit: "",
      extraDetails: "",
      service: "",
      status: "",
      category: "",
      regDate: "",
      enviroment: "",
      line: "",
      active: "",
      servicePoints: "",
      refrigerant: "",
      plant:"",
      area:""
    });
    // dispatch(getDevicesList(selectedData));
    setErrors(true);
    setShowModal(false);
  };

  //Fin de la función para agregar una garrafa

  const handleClose = () => {
    setInputDevice({
      name: "",
      type: "",
      magnitude: "",
      unit: "",
      extraDetails: "",
      service: "",
      status: "",
      category: "",
      regDate: "",
      environment: "",
      line: "",
      active: "",
      servicePoints: "",
      refrigerant: "",
      plant:"",
      area:""
    });
    setErrors(true);
    setShowModal(false);
  };

  return (
    <div className={styles[showHideClassName]}>
      <section className={styles.modalmain}>
        <h5>Agregar nuevo Dispositivo</h5>
        <div className={styles.container}>
          <form onSubmit={(e) => handleSubmitDevice(e)} id="addDevice">
            <div>
              <label>Nombre: </label>
              <input
                type="text"
                name="name"
                autoComplete="off"
                value={inputDevice.name}
                onChange={(e) => handleChange(e)}
                placeholder="Ingrese el nombre..."
              />
            </div>

            <div>
              <label>Potencia: </label>
              <input
                type="text"
                name="magnitude"
                autoComplete="off"
                value={inputDevice.magnitude}
                onChange={(e) => handleChange(e)}
                placeholder="Ingreselas calorias..."
              />

              <label>Unidad: </label>
              <select onChange={(e) => handleChange(e)} name="unit">
                <option key={"selectUnit"} value="">
                  Seleccione Unidad
                </option>
                {options.units &&
                  options.units.map((elem) => {
                    return (
                      <option key={"selectUnit" + elem} value={elem}>
                        {elem}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div>
              <label>Tipo: </label>
              <select onChange={(e) => handleChange(e)} name="type">
                <option key={"selectType"} value="">
                  Seleccione Tipo
                </option>
                {options.types &&
                  options.types.map((elem, index) => {
                    return (
                      <option key={index} value={elem}>
                        {elem}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div>
              <label>Servicio: </label>
              <select onChange={(e) => handleChange(e)} name="service">
                <option key={"selectService"} value="">
                  Seleccione Servicio
                </option>
                {options.service &&
                  options.service.map((elem) => {
                    return (
                      <option key={"selectService" + elem} value={elem}>
                        {elem}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div>
              <label>Status: </label>
              <select onChange={(e) => handleChange(e)} name="status">
                <option key={"selectStatus"} value="">
                  Seleccione Status
                </option>
                {options.status &&
                  options.status.map((elem) => {
                    return (
                      <option key={"selectStatus" + elem} value={elem}>
                        {elem}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div>
              <label>Categoria: </label>
              <select onChange={(e) => handleChange(e)} name="category">
                <option key={"selectCategory"} value="">
                  Seleccione Categoria
                </option>
                {options.category &&
                  options.category.map((elem) => {
                    return (
                      <option key={"selectCategory" + elem} value={elem}>
                        {elem}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div>
              <label>Ambiente: </label>
              <select onChange={(e) => handleChange(e)} name="environment">
                <option key={"selectenvironment"} value="">
                  Seleccione Ambiente
                </option>
                {options.environment &&
                  options.environment.map((elem) => {
                    return (
                      <option key={"selectenvironment" + elem} value={elem}>
                        {elem}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div>
              <label>Planta: </label>
              <select onChange={(e) => handleChangePlant(e)} name="plant">
                <option key={"selectplant"} value="">
                  Seleccione Planta
                </option>
                {plants.length !== 0 &&
                  plants.map((elem) => {
                    return (
                      <option key={"selectplant" + elem} value={elem}>
                        {elem}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div>
              <label>Area: </label>
              <select onChange={(e) => handleChangePlant(e)} name="area">
                <option key={"selectarea"} value="">
                  Seleccione Area
                </option>
                {areas.length !== 0 &&
                  areas.map((elem) => {
                    return (
                      <option key={"selectarea" + elem} value={elem}>
                        {elem}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div>
              <label>Linea: </label>
              <select onChange={(e) => handleChange(e)} name="line">
                <option key={"selectline"} value="">
                  Seleccione Linea
                </option>
                {lines.length !== 0 &&
                  lines.map((elem) => {
                    return (
                      <option key={"selectline" + elem} value={elem}>
                        {elem}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div>
              <label>Serv. Point: </label>
              <select onChange={(e) => handleChange(e)} name="servicePoints">
                <option key={"selectSP"} value="">
                  Seleccione Serv. Point
                </option>
                {servicePoints.length !== 0 &&
                  servicePoints.map((elem) => {
                    return (
                      <option key={"selectSP" + elem} value={elem}>
                        {elem}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div>
              <label>Activo: </label>
              <select onChange={(e) => handleChange(e)} name="active">
                <option key={"selectActive"} value="">
                  Seleccione Serv. Point
                </option>
                <option key={"selectActiveSi"} value="true">
                  Si
                </option>
                <option key={"selectActiveNo"} value="false">
                  No
                </option>
              </select>
            </div>

            <div>
              <label>Refrigerante: </label>
              <select
                name="refrigerant"
                onChange={(e) => handleChange(e)}
                // defaultValue={0}
                // value={inputDevice.refrigerant}
                defaultValue={inputDevice.refrigerant}
              >
                <option value="">Seleccionar Refrigerante</option>
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
              <label>Fecha Registro: </label>
              <input
                type="date"
                name="regDate"
                autoComplete="off"
                value={inputDevice.regDate}
                onChange={(e) => handleChange(e)}
                placeholder="Ingrese la fecha..."
              />
            </div>

            <div>
              <label>Detalles extras: </label>
              <input
                type="text"
                name="extraDetails"
                autoComplete="off"
                value={inputDevice.extraDetails}
                onChange={(e) => handleChange(e)}
                placeholder="Ingrese detalles..."
              />
            </div>
          </form>
          <div>
            {errors ? (
              <button
                type="submit"
                key="submitFormButton"
                form="addDevice"
                disabled={errors}
                className="disabledButton"
              >
                Cargar
              </button>
            ) : (
              <button type="submit" key="submitFormButton" form="addDevice">
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

export default AddDevice;
