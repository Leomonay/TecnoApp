import React from "react";

export function FilterByStatus({ setFilterState, filterState }) {
  const handleFilterStatus = (event) => {
    setFilterState({ ...filterState, status: event.target.value });
    event.preventDefault();
  };
  const statusGarrafa = ["En Stock", "Nueva", "En uso", "Vacia", "Descartada"];
  return (
    <div>
      <label>Status</label>
      <select onChange={(e) => handleFilterStatus(e)}>
        <option key={"statusFilter All"} value="All">
          Todos
        </option>
        {statusGarrafa &&
          statusGarrafa.map((elem, index) => {
            return (
              <option key={"statusFilter" + index} value={elem}>
                {elem}
              </option>
            );
          })}
      </select>
    </div>
  );
}
