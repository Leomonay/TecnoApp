import React from "react";

export function FilterBySP({ servicePoints, setSelectedData, selectedData }) {
  const handleFilterSP = (event) => {
    if (event.target.value !== "") {
      setSelectedData({ ...selectedData, spName: event.target.value });
    } else {
      setSelectedData({
        ...selectedData,
        spName: "",
      });
    }

    event.preventDefault();
  };

  return (
    <div>
      <label>S. P.</label>
      <select onChange={(e) => handleFilterSP(e)}>
        <option key={"spFilter All"} value="">
          Seleccione SP
        </option>
        {servicePoints.length !== 0 &&
          servicePoints.map((elem) => {
            return (
              <option key={"spFilter" + elem} value={elem}>
                {elem}
              </option>
            );
          })}
      </select>
    </div>
  );
}
