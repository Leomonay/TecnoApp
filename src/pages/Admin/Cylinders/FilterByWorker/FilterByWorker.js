import React from "react";

export function FilterByWorker({ workers, setFilterState, filterState }) {
  const handleFilterWorker = (event) => {
    setFilterState({ ...filterState, worker: event.target.value });
    event.preventDefault();
  };

  return (
    <div>
      <label>Trabajador</label>
      <select onChange={(e) => handleFilterWorker(e)}>
        <option key={"workerFilter All"} value="All">
          Todos
        </option>
        <option key={"workerFilter En Stock"} value="Stock">
          En Stock
        </option>
        {workers &&
          workers.map((elem) => {
            return (
              <option key={"workerFilter" + elem.id} value={elem.id}>
                {elem.name}
              </option>
            );
          })}
      </select>
    </div>
  );
}
