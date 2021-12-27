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
