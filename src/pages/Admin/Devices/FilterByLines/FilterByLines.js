import React from "react";
import { useDispatch } from "react-redux";
import { getLineServicePoints } from "../../../../actions/addPlantsActions.js";

export function FilterByLine({ lines, setSelectedData, selectedData }) {
  const dispatch = useDispatch();

  const handleFilterLine = (event) => {
    if(event.target.value !=="")
    {setSelectedData({
      ...selectedData,
      linesName: event.target.value,
      spName: ""
    });
    dispatch(getLineServicePoints(event.target.value));} else {
      setSelectedData({
        ...selectedData,
        linesName: "",
        spName: "",
      });
    }
    
    event.preventDefault();
  };

  return (
    <div>
      <label>Lineas</label>
      <select onChange={(e) => handleFilterLine(e)}>
      <option key={"lineFilter All"} value="">
          Seleccione Línea
        </option>
       {lines.length !== 0 &&
          lines.map((elem) => {
            return (
              <option key={"lineFilter" + elem} value={elem}>
                {elem}
              </option>
            );
          })}
      </select>
    </div>
  );
}
