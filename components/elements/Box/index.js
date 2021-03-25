import React from "react";
import PropTypes from "prop-types";

const Box = ({ val, onChangeBox }) => {
  return (
    <div
      className="bg-yellow-200 border-2 w-full h-full hover:bg-red-300"
      onClick={onChangeBox}
    >
      {val}
    </div>
  );
};

Box.propTypes = {
  val: PropTypes.number.isRequired,
  onChangeBox: PropTypes.func.isRequired,
};

export default Box;
