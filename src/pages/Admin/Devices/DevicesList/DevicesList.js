import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  deleteDevice,
  getDevicesList,
  getDeviceData,
} from "../../../../actions/abmDevicesActions.js";
import DeviceAllData from "../DeviceAllData/DeviceAllData.js";

import UpdateDevice from "../UpdateDevice/UpdateDevice";

import styles from "./DevicesList.module.css";

export default function DevicesList({
  devices,
  lines,
  servicePoints,
  selectedData,
  plants,
}) {
  const dispatch = useDispatch();

  let [showModalUpdate, setShowModalUpdate] = useState(false);
  let [showModalInfo, setShowModalInfo] = useState(false);

  const handleEditDevice =async (event) => {
   await dispatch(getDeviceData(event.target.value));
    setShowModalUpdate(true);
  };


  //Funcion para borrar una garrafa

  const handleDeleteDevice = async (event) => {
    let response = await dispatch(deleteDevice({ id: event.target.value }));
    console.log("response deleted", response);
    if (response.hasOwnProperty("message")) {
      alert(response.message);
    } else {
      alert("El dispositivo fue borrado");
    }
    await getDevicesList(selectedData);
  };
  //Fin función para borrar una garrafa

  //Funcion para mas info de un equipo

  const handleMoreInfoDevice =  async (event) => {
      await dispatch(getDeviceData(event.target.value));
       setShowModalInfo(true);
  };


  return (
    <div>
      <UpdateDevice
        setShowModalUpdate={setShowModalUpdate}
        showModalUpdate={showModalUpdate}
        selectedData={selectedData}
      />

      <DeviceAllData setShowModalInfo={setShowModalInfo}
        showModalInfo={showModalInfo} />

      <div>
        <div className={styles.divScroll}>
          <div className={styles.tabla}>
            <label>Code</label>
            <label>Nombre</label>
            <label>Tipo</label>
            <label>Categoria</label>
          </div>
          {devices.length !== 0 &&
            devices.map((element) => {
              return (
                <div key={element._id} className={styles.tabla}>
                  <label>{element.code}</label>
                  <label>{element.name}</label>
                  <label>{element.type}</label>
                  <label>{element.category}</label>
                  <button
                    key={"moreInfo" + element}
                    // className={styles.removeButton}
                    title="moreInfo"
                    value={element._id}
                    onClick={(e) => handleMoreInfoDevice(e)}
                  />
                  <button
                    key={"delete" + element}
                    className={styles.removeButton}
                    title="Eliminar"
                    value={element._id}
                    onClick={(e) => handleDeleteDevice(e)}
                  />
                  <button
                    className={styles.editButton}
                    title="Edit"
                    key={"edit" + element}
                    value={element._id}
                    onClick={(e) => handleEditDevice(e)}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
