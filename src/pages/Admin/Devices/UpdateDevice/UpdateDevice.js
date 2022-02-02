import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
  resetDeviceData,
  updateDevice,
  getDevicesList,
} from "../../../../actions/abmDevicesActions.js";

import styles from "./UpdateDevice.module.css";

const UpdateDevice = ({
  setShowModalUpdate,
  showModalUpdate,
  selectedData,
}) => {
  const dispatch = useDispatch();

  const { options, deviceData } = useSelector((state) => state.abmDevices);

  const { refrigerants } = useSelector((state) => state.adminCylinders);

  const [errors, setErrors] = useState(false);

  let [updateDeviceData, setUpdateDeviceData] = useState({
    _id: "",
    newname: "",
    newtype: "",
    newextraDetails: "",
    newservice: "",
    newstatus: "",
    newcategory: "",
    newenvironment: "",
    newactive: "",
    newrefrigerant: "",
    oldname: "",
    oldtype: "",
    oldextraDetails: "",
    oldservice: "",
    oldstatus: "",
    oldcategory: "",
    oldenvironment: "",
    oldactive: "",
    oldrefrigerant: "",
  });

  useEffect(() => {
    setUpdateDeviceData({
      _id: deviceData._id,
      newname: deviceData.name,
      newtype: deviceData.type,
      newextraDetails: deviceData.extraDetails,
      newservice: deviceData.service,
      newstatus: deviceData.status,
      newcategory: deviceData.category,
      newenvironment: deviceData.environment,
      newactive: deviceData.active,
      newrefrigerant: deviceData.refrigerant,
      oldname: deviceData.name,
      oldtype: deviceData.type,
      oldextraDetails: deviceData.extraDetails,
      oldservice: deviceData.service,
      oldstatus: deviceData.status,
      oldcategory: deviceData.category,
      oldenvironment: deviceData.environment,
      oldactive: deviceData.active,
      oldrefrigerant: deviceData.refrigerant,
    });
  }, [deviceData, dispatch]);

  const handleUpdateDevice = async (event) => {
    let updatedDevice = {
      ...updateDeviceData,
      [event.target.name]: event.target.value,
    };
    setUpdateDeviceData(updatedDevice);

    if (
      updatedDevice.newname !== "" &&
      updatedDevice.newtype !== "" &&
      updatedDevice.newservice !== "" &&
      updatedDevice.newstatus !== "" &&
      updatedDevice.newcategory !== "" &&
      updatedDevice.newenvironment !== "" &&
      updatedDevice.newactive !== "" &&
      updatedDevice.newrefrigerant !== ""
    ) {
      setErrors(false);
    } else {
      setErrors(true);
    }
  };

  const handleSubmitUpdateDevice = async (event) => {
    event.preventDefault();
    let response = await dispatch(updateDevice(updateDeviceData));
    if (response.deviceUpdated.acknowledged) {
      alert("Cambios Realizados");
    } else {
      alert("No se pudieron hacer los cambios");
    }
    dispatch(getDevicesList(selectedData));

    setUpdateDeviceData({
      _id: "",
      newname: "",
      newtype: "",
      newextraDetails: "",
      newservice: "",
      newstatus: "",
      newcategory: "",
      newenvironment: "",
      newactive: "",
      newrefrigerant: "",
      oldname: "",
      oldtype: "",
      oldextraDetails: "",
      oldservice: "",
      oldstatus: "",
      oldcategory: "",
      oldenvironment: "",
      oldactive: "",
      oldrefrigerant: "",
    });

    setShowModalUpdate(false);
  };

  const showHideClassName = showModalUpdate ? "displayblock" : "displaynone";

  const handleClose = () => {
    setUpdateDeviceData({
      _id: "",
      newname: "",
      newtype: "",
      newextraDetails: "",
      newservice: "",
      newstatus: "",
      newcategory: "",
      newenvironment: "",
      newactive: "",
      newrefrigerant: "",
      oldname: "",
      oldtype: "",
      oldextraDetails: "",
      oldservice: "",
      oldstatus: "",
      oldcategory: "",
      oldenvironment: "",
      oldactive: "",
      oldrefrigerant: "",
    });
    dispatch(resetDeviceData());
    setShowModalUpdate(false);
  };

  return (
    <div className={styles[showHideClassName]}>
      <section className={styles.modalmain}>
        <h5>Editar Dispositivo</h5>
        <div className={styles.container}>
          <form onSubmit={(e) => handleSubmitUpdateDevice(e)} id="updateDevice">
            <div>
              <label>Nombre: </label>
              <input
                type="text"
                name="newname"
                autoComplete="off"
                defaultValue={updateDeviceData.newname}
                onChange={(e) => handleUpdateDevice(e)}
                placeholder="Ingrese el nombre..."
              />
            </div>

            <div>
              <label>Tipo: </label>
              <select onChange={(e) => handleUpdateDevice(e)} name="newtype"
              defaultValue={updateDeviceData.newtype}
              >
                {options.types &&
                  options.types.map((elem, index) => {
                    return (
                      <option
                        key={index}
                        value={elem}
                        // selected={updateDeviceData.newtype === elem}
                      >
                        {elem}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div>
              <label>Servicio: </label>
              <select onChange={(e) => handleUpdateDevice(e)} name="newservice"
              defaultValue={updateDeviceData.newservice}
              >
                {options.service &&
                  options.service.map((elem) => {
                    return (
                      <option
                        key={"selectService" + elem}
                        value={elem}
                        // selected={updateDeviceData.newservice === elem}
                      >
                        {elem}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div>
              <label>Status: </label>
              <select onChange={(e) => handleUpdateDevice(e)} name="newstatus"
              defaultValue={updateDeviceData.newstatus}
              >
                {options.status &&
                  options.status.map((elem) => {
                    return (
                      <option
                        key={"selectStatus" + elem}
                        value={elem}
                        // selected={updateDeviceData.newstatus === elem}
                      >
                        {elem}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div>
              <label>Categoria: </label>
              <select
                onChange={(e) => handleUpdateDevice(e)}
                name="newcategory"
                defaultValue={updateDeviceData.newcategory}
              >
                {options.category &&
                  options.category.map((elem) => {
                    return (
                      <option
                        key={"selectCategory" + elem}
                        value={elem}
                        // selected={updateDeviceData.newcategory === elem}
                      >
                        {elem}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div>
              <label>Ambiente: </label>
              <select
                onChange={(e) => handleUpdateDevice(e)}
                name="newenvironment"
                defaultValue={updateDeviceData.newenvironment}
              >
                {options.environment &&
                  options.environment.map((elem) => {
                    return (
                      <option
                        key={"selectenvironment" + elem}
                        value={elem}
                        // selected={updateDeviceData.newenvironment === elem}
                      >
                        {elem}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div>
              <label>Activo: </label>
              <select onChange={(e) => handleUpdateDevice(e)} name="newactive"
              defaultValue={updateDeviceData.newactive}
              >
                <option
                  key={"selectActiveSi"}
                  value="true"
                  // selected={updateDeviceData.newactive === "true"}
                >
                  Si
                </option>
                <option
                  key={"selectActiveNo"}
                  value="false"
                  // selected={updateDeviceData.newactive === "false"}
                >
                  No
                </option>
              </select>
            </div>

            <div>
              <label>Refrigerante: </label>
              <select
                name="newrefrigerant"
                onChange={(e) => handleUpdateDevice(e)}
                // defaultValue={0}
                defaultValue={updateDeviceData.refrigerant}
              >
                {refrigerants.length !== 0 &&
                  refrigerants.map((element) => {
                    return (
                      <option
                        key={element.id}
                        value={element.id}
                        // selected={
                        //   updateDeviceData.newrefrigerant ===
                        //   element.refrigerant
                        // }
                      >
                        {element.refrigerante}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div>
              <label>Detalles extras: </label>
              <input
                type="text"
                name="newextraDetails"
                autoComplete="off"
                // value={updateDeviceData.newextraDetails}
                defaultValue={updateDeviceData.newextraDetails}
                onChange={(e) => handleUpdateDevice(e)}
                placeholder="Ingrese detalles..."
              />
            </div>
          </form>
          <div>
            {errors ? (
              <button
                type="submit"
                key="submitFormButton"
                form="updateDevice"
                className="disabledButton"
              >
                Guardar Cambios
              </button>
            ) : (
              <button type="submit" key="submitFormButton" form="updateDevice">
                Guardar Cambios
              </button>
            )}

            <button onClick={() => handleClose()}>Cerrar</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpdateDevice;
