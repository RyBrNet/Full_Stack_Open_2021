import React from "react";

const Filter = ({ nameFilter, setNameFilter }) => {
  const handleNameFilter = (event) => {
    setNameFilter(event.target.value);
  };

  return (
    <div>
      Filter on Name: <input value={nameFilter} onChange={handleNameFilter} />
    </div>
  );
};

export default Filter;
