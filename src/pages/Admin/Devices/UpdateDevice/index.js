// import React from "react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   getDevicesList,
//   getOptionsList,
// } from "../../../actions/abmDevicesActions.js";

// import { getPlantList } from "../../../actions/addPlantsActions.js";
// import AddDevice from "./addDevice/addDevice.js";
// import DevicesList from "./DevicesList/DevicesList.js";
// import { FilterByArea } from "./FilterByAreas/FilterByAreas.js";
// import { FilterByLine } from "./FilterByLines/FilterByLines.js";
// import { FilterByPlant } from "./FilterByPlant/FilterByPlant.js";
// import { FilterBySP } from "./FilterBySP/FilterBySP.js";
// import styles from "./index.module.css";
// import { cylinderActions } from "../../../actions/StoreActions.js";
// import DeviceAdmin from "./index2.js";

// export default function AdminDevices() {
//   const dispatch = useDispatch();

//   const { plants, areas, lines, servicePoints } = useSelector(
//     (state) => state.addPlants
//   );

//   const { refrigerants } = useSelector((state) => state.adminCylinders);

//   const { allDevices } = useSelector((state) => state.abmDevices);

//   let [showModal, setShowModal] = useState(false);

//   let [selectedData, setSelectedData] = useState({
//     plantName: "",
//     areaName: "",
//     linesName: "",
//     spName: "",
//   });

//   useEffect(() => dispatch(getPlantList()), [dispatch]);

//   useEffect(
//     () => dispatch(getDevicesList(selectedData)),
//     [dispatch, selectedData]
//   );
//   useEffect(() => dispatch(getOptionsList()), [dispatch]);
//   useEffect(() => dispatch(cylinderActions.getGases()), [dispatch]);

//   return <DeviceAdmin/>

//   // return (
//   //   <div className="adminOptionSelected">
//   //     Administración de Equipos
//   //     <button className='button' title="Agregar Equipo" onClick={() => setShowModal(true)}>
//   //       Agregar Equipo
//   //     </button>
//   //     <div className={styles.divFilters}>
//   //       <FilterByPlant
//   //         plants={plants}
//   //         setSelectedData={setSelectedData}
//   //         selectedData={selectedData}
//   //       />

//   //       <FilterByArea
//   //         areas={areas}
//   //         setSelectedData={setSelectedData}
//   //         selectedData={selectedData}
//   //       />

//   //       <FilterByLine
//   //         lines={lines}
//   //         setSelectedData={setSelectedData}
//   //         selectedData={selectedData}
//   //       />

//   //       <FilterBySP
//   //         servicePoints={servicePoints}
//   //         setSelectedData={setSelectedData}
//   //         selectedData={selectedData}
//   //       />
//   //     </div>
//   //     <DevicesList
//   //       devices={allDevices}
//   //       lines={lines}
//   //       servicePoints={servicePoints}
//   //       selectedData={selectedData}
//   //       plants={plants}
//   //     />
//   //     <AddDevice
//   //       setShowModal={setShowModal}
//   //       showModal={showModal}
//   //       plants={plants}
//   //       refrigerants={refrigerants}
//   //     />
  
//   //   </div>
//   // );
// }
