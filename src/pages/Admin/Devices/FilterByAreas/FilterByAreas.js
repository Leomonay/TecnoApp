import React from "react";
import { useDispatch } from "react-redux";
import { getPlantLines } from "../../../../actions/addPlantsActions.js";

export function FilterByArea({ areas, setSelectedData, selectedData }) {
  const dispatch = useDispatch();

  const handleFilterArea = (event) => {
    if(event.target.value !=="")
    {setSelectedData({
      ...selectedData,
      areaName: event.target.value,
      linesName: "",
      spName: "",
    });
    dispatch(getPlantLines(event.target.value));} else {
      setSelectedData({
        ...selectedData,
        areaName:"",
        linesName: "",
        spName: "",
      });
    }
    event.preventDefault();
  };

  return (
    <div>
      <label>Areas</label>
      <select onChange={(e) => handleFilterArea(e)}>
        <option key={"areaFilter All"} value="">
          Seleccione Área
        </option>
        {areas.length !== 0 &&
          areas.map((elem) => {
            return (
              <option key={"areaFilter" + elem} value={elem}>
                {elem}
              </option>
            );
          })}
      </select>
    </div>
  );
}
