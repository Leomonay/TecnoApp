import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlantList,
 } from "../../../actions/addPlantsActions.js";
import styles from "./index.module.css";

import PlantList from "./PlantsList/PlantList.js";
import AreasList from "./AreasList/AreasList.js";
import LinesList from "./LinesList/LinesList.js";
import SPList from "./SPList/SPList.js";

export default function AdminPlants() {
  const dispatch = useDispatch();
  const { plants, areas, lines, servicePoints } = useSelector(
    (state) => state.addPlants
  );

  let [selectedData, setSelectedData] = useState({
    plantName: "",
    areaName: "",
    linesName: "",
    spName: "",
  });

  useEffect(() => dispatch(getPlantList()), [dispatch]);

  return (
    <div className={styles.divPrincipal}>
      <div>Administración de Plantas</div>
      <div className={styles.divContainerScrolls}>
        <div>
          <PlantList
            plants={plants}
            setSelectedData={setSelectedData}
            selectedData={selectedData}
          />
        </div>

        <div>
          <AreasList
            areas={areas}
            plantName={selectedData.plantName}
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
          />
        </div>

        <div>
          <SPList
            servicePoints={servicePoints}
            plantName={selectedData.plantName}
            areaName={selectedData.areaName}
            lineName={selectedData.linesName}
          />
        </div>
      </div>
    </div>
  );
}