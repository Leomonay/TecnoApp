import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddCylinder from "./addCylinder/addCylinder";
import CylindersList from "./CylindersList/CylinderList";

import {
  getCylinderList,
  getEmpleados,
  getRefrigerants,
  allFilters
} from "../../../actions/adminCylindersActions";
import { FilterByWorker } from "./FilterByWorker/FilterByWorker";
import { FilterByStatus } from "./FilterByStatus/FilterByStatus";
import { FilterByRefrigerant } from "./FilterByRefrigerant/FilterByRefrigerant";

import styles from "./index.module.css"

export default function AdminCylinders() {
  const dispatch = useDispatch();

  const { cylinders, workers, refrigerants } = useSelector(
    (state) => state.adminCylinders
  );

  let [showModal, setShowModal] = useState(false);

  const [filterState, setFilterState] = useState({
    worker: "All",
    status: "All",
    refrigerant: "All",
  });

  useEffect(() => dispatch(getEmpleados()), [dispatch]);
  useEffect(() => dispatch(getRefrigerants()), [dispatch]);
  useEffect(() => dispatch(getCylinderList()), [dispatch]);
  useEffect(() => {
    dispatch(allFilters(filterState));
  }, [filterState, dispatch]);

  return (
    <div>
      Administración de Garrafas
      <button title="Agregar Garrafa" onClick={() => setShowModal(true)}>
        Agregar Garrafa
      </button>
      <div className={styles.divFilters}>

      <FilterByWorker
        workers={workers}
        setFilterState={setFilterState}
        filterState={filterState}
        />
      <FilterByStatus
        setFilterState={setFilterState}
        filterState={filterState}
        />
      <FilterByRefrigerant  refrigerants={refrigerants}
        setFilterState={setFilterState}
        filterState={filterState}
        />
        </div>
      <CylindersList
        cylinders={cylinders}
        workers={workers}
        refrigerants={refrigerants}
      />
      <AddCylinder setShowModal={setShowModal} showModal={showModal} />
    </div>
  );
}
