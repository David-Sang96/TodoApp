import React, { useEffect, useState } from "react";

const ButtonGroup = ({ handleClearCompleted, filterBy }) => {
  const [selectedBtn, setSelectedBtn] = useState("All");

  useEffect(
    () => {
      filterBy(selectedBtn);
    },
    [selectedBtn],
    filterBy
  );

  return (
    <div className="btn-group">
      <div className="btns">
        <span
          className={`${selectedBtn === "All" ? "button" : ""}`}
          onClick={() => setSelectedBtn("All")}
        >
          All
        </span>
        <span
          className={`${selectedBtn === "Active" ? "button" : ""}`}
          onClick={() => setSelectedBtn("Active")}
        >
          Active
        </span>
        <span
          className={`${selectedBtn === "Completed" ? "button" : ""}`}
          onClick={() => setSelectedBtn("Completed")}
        >
          Completed
        </span>
      </div>
      <div className="clear-completed">
        <span onClick={() => handleClearCompleted()}>Clear Completed</span>
      </div>
    </div>
  );
};

export default ButtonGroup;
