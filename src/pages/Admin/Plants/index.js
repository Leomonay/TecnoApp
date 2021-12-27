import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlantList,
  getPlantData,
  getAreaData,
  getLineData,
  getSPData,
} from "../../../actions/addPlantsActions.js";
import styles from "./index.module.css";

import AddPlant from "./AddPlant/addPlant";
import UpdatePlant from "./UpdatePlant/UpdatePlant.js";
import PlantList from "./PlantsList/PlantList.js";
import AreasList from "./AreasList/AreasList.js";
import LinesList from "./LinesList/LinesList.js";
import SPList from "./SPList/SPList.js";
import AddAreas from "./AddAreas/addAreas.js";
import UpdateArea from "./UpdateArea/UpdateArea.js";
import AddLines from "./AddLines/addLines.js";
import UpdateLine from "./updateLine/UpdateLine.js";
import AddServicePoints from "./AddServicePoints/addServicePoints.js";
import UpdateSP from "./UpdateSP/UpdateSP.js";

export default function AdminPlants() {
  const dispatch = useDispatch();
  const { plants, areas, lines, servicePoints, actualData } = useSelector(
    (state) => state.addPlants
  );

  let [selectedData, setSelectedData] = useState({
    plantName: "",
    areaName: "",
    linesName: "",
    spName: "",
  });
  //Función boton editar una planta de la lista
  let [updatePlantData, setUpdatePlantData] = useState({
    newName: "",
    newCode: "",
    oldName: "",
    oldCode: "",
  });

  const handleEditPlant = async (event) => {
    let response = await dispatch(getPlantData(event.target.value));
    setUpdatePlantData({
      newName: response.name,
      newCode: response.code,
      oldName: response.name,
      oldCode: response.code,
    });
  };
  //Fin funciones para editar un area de la lista

  //Función boton editar un area de la lista
  let [updateAreaData, setUpdateAreaData] = useState({
    newName: "",
    newCode: "",
    oldName: "",
    oldCode: "",
  });

  const handleEditArea = async (event) => {
    let response = await dispatch(getAreaData(event.target.value));
    setUpdateAreaData({
      newName: response.name,
      newCode: response.code,
      oldName: response.name,
      oldCode: response.code,
    });
  };
  //Fin funciones para editar un area de la lista

  //Función boton editar una linea de la lista
  let [updateLineData, setUpdateLineData] = useState({
    newName: "",
    newCode: "",
    oldName: "",
    oldCode: "",
  });

  const handleEditLine = async (event) => {
    let response = await dispatch(getLineData(event.target.value));

    setUpdateLineData({
      newName: response.name,
      newCode: response.code,
      oldName: response.name,
      oldCode: response.code,
    });
  };

  //Fin funciones para editar una linea de la lista

  //Función boton editar un SP de la lista
  let [updateSPData, setUpdateSPData] = useState({
    newName: "",
    newCode: "",
    newGate: "",
    newAceria: false,
    newCaloria: false,
    newTareaPeligrosa: false,
    oldName: "",
    oldCode: "",
    oldGate: "",
    oldAceria: false,
    oldCaloria: false,
    oldTareaPeligrosa: false,
  });

  const handleEditServicePoint = async (event) => {
    let response = await dispatch(getSPData(event.target.value));
    setUpdateSPData({
      newName: response.name,
      newCode: response.code,
      newGate: response.gate,
      newAceria: response.aceria,
      newCaloria: response.caloria,
      newTareaPeligrosa: response.tareaPeligrosa,
      oldName: response.name,
      oldCode: response.code,
      oldGate: response.gate,
      oldAceria: response.aceria,
      oldCaloria: response.caloria,
      oldTareaPeligrosa: response.tareaPeligrosa,
    });
  };

  //Fin funciones para editar un SP de la lista

  useEffect(() => dispatch(getPlantList()), [dispatch]);

  return (
    <div className={styles.divPrincipal}>
      <div>Administración de Plantas</div>
      <div className={styles.divContainerScrolls}>
        <div>
          <PlantList
            plants={plants}
            handleEditPlant={handleEditPlant}
            setSelectedData={setSelectedData}
            selectedData={selectedData}
          />
        </div>

        <div>
          <AreasList
            areas={areas}
            plantName={selectedData.plantName}
            handleEditArea={handleEditArea}
            setSelectedData={setSelectedData}
            selectedData={selectedData}
          />
        </div>

        <div>
          <LinesList
            lines={lines}
            plantName={selectedData.plantName}
            areaName={selectedData.areaName}
            setSelectedData={setSelectedData}
            selectedData={selectedData}
            handleEditLine={handleEditLine}
          />
        </div>

        <div>
          <SPList
            servicePoints={servicePoints}
            plantName={selectedData.plantName}
            areaName={selectedData.areaName}
            lineName={selectedData.linesName}
            handleEditServicePoint={handleEditServicePoint}
          />
        </div>
      </div>

      <AddPlant />

      <UpdatePlant
        setUpdatePlantData={setUpdatePlantData}
        updatePlantData={updatePlantData}
      />

      <AddAreas plantName={selectedData.plantName} />

      <UpdateArea
        setUpdateAreaData={setUpdateAreaData}
        updateAreaData={updateAreaData}
        plantName={selectedData.plantName}
      />

      <AddLines
        areaName={selectedData.areaName}
        plantName={selectedData.plantName}
      />

      <UpdateLine
        setUpdateLineData={setUpdateLineData}
        updateLineData={updateLineData}
        plantName={selectedData.plantName}
        areaName={selectedData.areaName}
      />

      <AddServicePoints
        lineName={selectedData.linesName}
        plantName={selectedData.plantName}
        areaName={selectedData.areaName}
      />

      <UpdateSP
        setUpdateSPData1={setUpdateSPData}
        updateSPData1={updateSPData}
        plantName={selectedData.plantName}
        areaName={selectedData.areaName}
        lineName={selectedData.linesName}
      />
    </div>
  );
}
