import React from "react";

const CheckBtn = ({ handleCheckAll, remainingCount }) => {
  return (
    <div className="checkBtn">
      <span className="checkALlBtn" onClick={() => handleCheckAll()}>
        Check All
      </span>
      <p>
        {remainingCount} item{`${remainingCount > 1 ? "s" : ""}`} remaining
      </p>
    </div>
  );
};

export default CheckBtn;
