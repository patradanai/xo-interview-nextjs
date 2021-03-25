import React from "react";
import PropTypes from "prop-types";

const Box = ({ val, onChangeBox, index }) => {
  return (
    <div
      className="flex items-center justify-center bg-yellow-200 border-2 w-full h-full hover:bg-red-300"
      onClick={() => onChangeBox(index)}
    >
      <span className="text-7xl font-bold">{val?.symbol}</span>
    </div>
  );
};

Box.propTypes = {
  val: PropTypes.object,
  onChangeBox: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default Box;
