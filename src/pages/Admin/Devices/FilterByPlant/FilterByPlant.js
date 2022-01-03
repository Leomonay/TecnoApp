import React from "react";
import { useDispatch } from "react-redux";
import { getPlantLocation } from "../../../../actions/addPlantsActions.js";

export function FilterByPlant({ plants, setSelectedData, selectedData }) {
  const dispatch = useDispatch();

  const handleFilterPlant = (event) => {
    //setSelectedData({ ...selectedData, plantName: event.target.value });
    if (event.target.value !=="")
{    setSelectedData({
      plantName: event.target.value,
      areaName: "",
      linesName: "",
      spName: "",
    });
    dispatch(getPlantLocation(event.target.value));}else 
    {
      setSelectedData({
        plantName: "",
        areaName: "",
        linesName: "",
        spName: "",
      });
    }
    event.preventDefault();
  };

  return (
    <div>
      <label>Planta</label>
      <select onChange={(e) => handleFilterPlant(e)}>
        <option key={"plantFilter All"} value="">
          Seleccione Planta
        </option>
        {plants.length !== 0 &&
          plants.map((elem) => {
            return (
              <option key={"plantFilter" + elem} value={elem}>
                {elem}
              </option>
            );
          })}
      </select>
    </div>
  );
}
