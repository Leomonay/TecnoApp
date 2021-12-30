import React from "react";

export function FilterByRefrigerant({
  refrigerants,
  setFilterState,
  filterState,
}) {
  const handleFilterWorker = (event) => {
    setFilterState({ ...filterState, refrigerant: event.target.value });
    event.preventDefault();
  };

  return (
    <div>
      <label>Refrigerante</label>
      <select onChange={(e) => handleFilterWorker(e)}>
        <option key={"refrigerantFilter All"} value="All">
          Todos
        </option>
        {refrigerants &&
          refrigerants.map((elem) => {
            return (
              <option key={"refrigerantFilter" + elem.code} value={elem.id}>
                {elem.refrigerante}
              </option>
            );
          })}
      </select>
    </div>
  );
}
