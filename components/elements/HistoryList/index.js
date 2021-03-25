import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const HistoryList = ({ val, index, viewHistory }) => {
  return (
    <tr>
      <td className="w-1/4">{index}</td>
      <td className="w-1/4">{moment(val?.date).format("DD/MM/YYYY")}</td>
      <td className="w-1/4">{val?.won}</td>
      <td className="w-1/4">
        <button
          className="bg-blue-400 w-28 h-10 rounded"
          onClick={() => viewHistory(val?.linePlay, val?.won, val?.size)}
        >
          View
        </button>
      </td>
    </tr>
  );
};

HistoryList.propTypes = {
  val: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  viewHistory: PropTypes.func.isRequired,
};

export default HistoryList;
