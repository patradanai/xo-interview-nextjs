import React, { useState, useEffect } from "react";
import Box from "../../elements/Box";
import { getwinnerLine, CheckWinner } from "../../../functions";
import HistoryList from "../../../components/elements/HistoryList";
import moment from "moment";
/**
 *
 * sizeBoard have array with object {name : player or dragon , symbol  : x, O}
 */

const HomePage = () => {
  const [winnerName, setWinnerName] = useState(null);
  const [history, setHistory] = useState([]);
  const [size, setSize] = useState(3);
  const [winnerLine, setWinnerLine] = useState(getwinnerLine(size));
  const [sizeBoard, setSizeBoard] = useState(new Array(size * size).fill(null));
  const [gameTurn, setGameTurn] = useState(true);
  // Update SizeBoard
  const onChangeSize = (event) => {
    event.preventDefault();
    setSize(parseInt(event.target.value));
  };

  // OnClick Player
  const onChangeBox = (number) => {
    let rawBoard = [...sizeBoard];
    let namePlayer;
    let symbol;

    // Check Null
    if (rawBoard[number]) {
      return null;
    }

    // Check Turn name
    if (gameTurn) {
      namePlayer = "Player";
      symbol = "X";
    } else {
      namePlayer = "Dragon";
      symbol = "O";
    }

    rawBoard[number] = { namePlayer, symbol, number };

    // Check Winner
    if (CheckWinner(winnerLine, rawBoard)) {
      setWinnerName(CheckWinner(winnerLine, rawBoard));

      // Keep in LocalStrage

      const newHistory = [
        ...history,
        {
          linePlay: rawBoard,
          won: CheckWinner(winnerLine, rawBoard),
          date: moment(new Date()),
        },
      ];
      // set NewHistory
      setHistory(newHistory);

      localStorage.setItem("history", JSON.stringify(newHistory));
    }
    // Update to sizeBoard
    setSizeBoard(rawBoard);
    // Change Turn
    setGameTurn(!gameTurn);
  };

  // Reset Game
  const resetGame = () => {
    setWinnerName(null);
    setSizeBoard(new Array(size * size).fill(null));
  };

  // ViewHistory
  const viewHistory = (linePlay, won) => {
    setSizeBoard(linePlay);
    setWinnerName(won);
  };

  // Get History
  useEffect(() => {
    const rawHistory = localStorage.getItem("history");
    if (JSON.parse(rawHistory)) {
      setHistory(JSON.parse(rawHistory));
    }
  }, []);

  //Update Size
  useEffect(() => {
    setWinnerLine(getwinnerLine(size));
    setSizeBoard(new Array(size * size).fill(null));
  }, [size]);

  return (
    <div className="container">
      <div className="w-full h-full flex flex-col items-center">
        <h1 className="text-3xl my-3">XO GAME</h1>
        <p>Role : </p>
        {/* Table for History */}
        <div className="w-full h-full">
          <p className="">History Player</p>
          <table className="table-auto w-full overflow-x-auto overflow-y-auto">
            <thead className="bg-black text-white">
              <tr className="h-10">
                <th>No.</th>
                <th>Date</th>
                <th>Won</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {history?.map((val, index) => (
                <HistoryList
                  val={val}
                  index={index}
                  key={index}
                  viewHistory={viewHistory}
                />
              ))}
            </tbody>
          </table>
        </div>
        {/* Boards */}
        <div style={{ minWidth: 80, minHeight: 80 }}>
          <div className="my-1">
            <select
              className="w-20 p-2 appearance-none"
              onChange={(event) => onChangeSize(event)}
              value={size}
            >
              <option value={3}>3x3</option>
              <option value={4}>4x4</option>
              <option value={5}>5x5</option>
              <option value={6}>6x6</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <div className="relative flex items-center justify-center w-full h-full">
            {/* BackDrop */}
            <div
              className={`${
                winnerName ? "flex" : "hidden"
              } absolute top-0 left-0 bg-white opacity-50 w-full h-full`}
            ></div>
            <div
              className={`${
                winnerName ? "flex" : "hidden"
              } absolute w-full h-full flex flex-col items-center justify-center`}
            >
              <p>The Winner is {winnerName}</p>
              <button
                className="bg-blue-400 p-2 rounded-md text-white mt-3 focus:outline-none hover:bg-black"
                onClick={resetGame}
              >
                Try again?
              </button>
            </div>
            {/* Draw Boards */}
            <div
              className={`grid ${
                `grid-cols-` + size
              } grid-flow-row h-full w-full`}
            >
              {sizeBoard.map((val, index) => (
                <Box
                  key={index}
                  val={val}
                  index={index}
                  onChangeBox={onChangeBox}
                />
              ))}
            </div>
          </div>
          {/* Status Turn */}
          <div className="text-lg text-center mt-5">
            <span
              className={`${
                !gameTurn ? "text-red-500" : "text-blue-500"
              } font-bold`}
            >
              {gameTurn ? "Player " : "Dragon "}
            </span>
            Turn
          </div>
        </div>
        {/* History */}
      </div>
    </div>
  );
};

export default HomePage;
