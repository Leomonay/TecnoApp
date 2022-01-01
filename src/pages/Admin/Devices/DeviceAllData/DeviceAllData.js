import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { resetDeviceData } from "../../../../actions/abmDevicesActions.js";

import styles from "./DeviceAllData.module.css";

const DeviceAllData = ({ setShowModalInfo, showModalInfo }) => {
  const dispatch = useDispatch();

  const { deviceData } = useSelector((state) => state.abmDevices);

  const showHideClassName = showModalInfo ? "displayblock" : "displaynone";

  const handleClose = () => {
    dispatch(resetDeviceData());
    setShowModalInfo(false);
  };
  return (
    <div className={styles[showHideClassName]}>
      <section className={styles.modalmain}>
        <h5>Info</h5>
        <div className={styles.container}>
          <div className={styles.infoDiv}>
            <label>Nombre: {deviceData.name ? deviceData.name : ""}</label>
            <label>Código: {deviceData.code ? deviceData.code : ""}</label>
            <label>Tipo: {deviceData.type ? deviceData.type : ""}</label>
            <label>
              Calorias:{" "}
              {deviceData.power?.magnitude
                ? deviceData.power.magnitude.toString()
                : ""}{" "}
              {deviceData.power?.unit ? deviceData.power.unit : ""}
            </label>
            <label>
              Categoria: {deviceData.category ? deviceData.category : ""}
            </label>
            <label>
              Refrigerante:{" "}
              {deviceData.refrigerant ? deviceData.refrigerant : ""}
            </label>
            <label>Status: {deviceData.status ? deviceData.status : ""}</label>
            <label>
              Servicio: {deviceData.service ? deviceData.service : ""}
            </label>
            <label>
              Ambiente: {deviceData.environment ? deviceData.environment : ""}
            </label>
            <label>Activo: {deviceData.active ? "Si" : "No"}</label>
            <label>
              Detalles extras:{" "}
              {deviceData.extraDetails ? deviceData.extraDetails : ""}
            </label>
          </div>
          <div>
            <button onClick={() => handleClose()}>Cerrar</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeviceAllData;
