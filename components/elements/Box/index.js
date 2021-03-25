import React from "react";
import PropTypes from "prop-types";

const Box = ({ val, onChangeBox, index }) => {
  return (
    <button
      className="box-border flex items-center justify-center hover:cursor-pointer bg-yellow-200 border-2 hover:bg-red-300"
      style={{ width: 100, height: 100 }}
      onClick={() => onChangeBox(index)}
    >
      <span className="text-7xl font-bold">{val?.symbol}</span>
    </button>
  );
};

Box.propTypes = {
  val: PropTypes.object,
  onChangeBox: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default Box;
