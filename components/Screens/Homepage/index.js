import React, { useState, useEffect } from "react";
import moment from "moment";
import Box from "../../elements/Box";
import HistoryList from "../../../components/elements/HistoryList";
import FbIcon from "../../icons/facebook";
import GithubIcon from "../../icons/gitub";
import LinkedInIcon from "../../icons/linkedin";
import { getwinnerLine, CheckWinner } from "../../../functions";
import FormInput from "../../elements/FormInput";
/**
 *
 * sizeBoard have array with object {name : player or dragon , symbol  : x, O}
 */

const options = [
  { Lable: "Normal", value: 3 },
  { Lable: "4x4", value: 4 },
  { Lable: "5x5", value: 5 },
  { Lable: "6x6", value: 6 },
  { Lable: "7x7", value: 7 },
  { Lable: "8x8", value: 8 },
  { Lable: "9x9", value: 9 },
  { Lable: "10x10", value: 10 },
];

const HomePage = () => {
  const [winnerName, setWinnerName] = useState(null);
  const [countClick, setCounterClick] = useState(0);
  const [history, setHistory] = useState([]);
  const [size, setSize] = useState(3);
  const [winnerLine, setWinnerLine] = useState(getwinnerLine(size));
  const [sizeBoard, setSizeBoard] = useState(new Array(size * size).fill(null));
  const [gameTurn, setGameTurn] = useState(true);

  /**
   * Update SizeBoard
   *
   * @param {*} event
   */
  const onChangeSize = (event) => {
    event.preventDefault();
    const newSize = parseInt(event.target.value);
    setSize(newSize);

    setSizeBoard(new Array(newSize * newSize).fill(null));

    setWinnerLine(getwinnerLine(newSize));

    setGameTurn(true);
  };

  const onChangeSizeCustom = (size) => {
    const newSize = parseInt(size);
    setSize(newSize);

    setSizeBoard(new Array(newSize * newSize).fill(null));

    setWinnerLine(getwinnerLine(newSize));

    setGameTurn(true);
  };

  /**
   * onChangeBox
   *
   * @param {number} number
   * @returns
   */
  const onChangeBox = (number) => {
    let rawBoard = [...sizeBoard];
    let namePlayer;
    let symbol;

    // Count Click
    setCounterClick(() => countClick + 1);

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
          size: size,
        },
      ];
      // set NewHistory
      setHistory(newHistory);

      localStorage.setItem("history", JSON.stringify(newHistory));

      //Reset
      setCounterClick(0);
    }

    // Update to sizeBoard
    setSizeBoard(rawBoard);
    // Change Turn
    setGameTurn(!gameTurn);
  };

  /**
   * Reset Game
   */
  const resetGame = () => {
    //Reset All State
    setWinnerName(null);
    setGameTurn(true);
    setSizeBoard(new Array(size * size).fill(null));
  };

  /**
   * ViewHistory
   * @param {object} linePlay
   * @param {string} won
   * @param {number} size
   */
  const viewHistory = (linePlay, won, size) => {
    setSize(size);
    setSizeBoard(linePlay);
    setGameTurn(true);
    setWinnerName(won);
  };

  // Get History
  useEffect(() => {
    const rawHistory = localStorage.getItem("history");
    if (JSON.parse(rawHistory)) {
      setHistory(JSON.parse(rawHistory));
    }
  }, []);

  // Check Click
  useEffect(() => {
    // If No one win that mean draw
    if (!winnerName && countClick >= size * size) {
      setWinnerName("Draw");
      // Keep in LocalStrage
      const newHistory = [
        ...history,
        {
          linePlay: sizeBoard,
          won: "Draw",
          date: moment(new Date()),
          size: size,
        },
      ];
      // set NewHistory
      setHistory(newHistory);

      localStorage.setItem("history", JSON.stringify(newHistory));

      //Reset
      setCounterClick(0);
    }
  }, [countClick]);

  return (
    <div className="container">
      <div className="w-full h-full flex flex-col items-center">
        <h1 className="text-4xl my-3 font-mono">XO GAME</h1>
        <p>Role</p>
        <ul className="font-mono ">
          <li>Play 2 Player</li>
          <li>
            Choose <span className="text-blue-400">Player</span>(X) or
            <span className="text-red-500 ml-2">Dragon</span>(O)
          </li>
          <li>Take turn</li>
        </ul>
        {/* Table for History */}
        <div className="text-left w-full">
          <p className="text-2xl font-mono my-3">History Player</p>
        </div>
        <div
          className="w-full overflow-x-auto overflow-y-auto"
          style={{ maxHeight: 280 }}
        >
          <table className="table-auto w-full">
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
        <div className="my-5" style={{ minWidth: 80, minHeight: 80 }}>
          <div className="flex flex-col">
            <div className="flex items-center my-1">
              <p className="mr-3">Choose One Size: </p>
              <select
                className="w-20 p-2 appearance-none"
                onChange={(event) => onChangeSize(event)}
                value={size}
              >
                {options.map((val, index) => (
                  <option key={index} value={val.value}>
                    {val.Lable}
                  </option>
                ))}
              </select>
            </div>
            <hr className="line my-3" />
            {/* Form */}
            <FormInput onChangeSize={onChangeSizeCustom} />
          </div>
          <div className="relative flex items-center justify-start w-full h-full overflow-auto">
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
              <p className="text-base font-bold">
                {winnerName == "Draw"
                  ? "This Game is Draw"
                  : winnerName == "X"
                  ? "The Winner is " + "Player (X)"
                  : "The Winner is " + "Dragon (O)"}
              </p>
              <button
                className="bg-blue-400 p-2 rounded-md text-white mt-3 focus:outline-none hover:bg-black"
                onClick={resetGame}
              >
                Try again?
              </button>
            </div>
            {/* Draw Boards */}
            <div className={`board h-full flex-shrink-0`}>
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
            {winnerName ? (
              <p>This is GameOver</p>
            ) : (
              <p>
                <span
                  className={`${
                    !gameTurn ? "text-red-500" : "text-blue-500"
                  } font-bold`}
                >
                  {gameTurn ? "Player " : "Dragon "}
                </span>
                Turn
              </p>
            )}
          </div>
          <div className="text-center">
            <button
              className="bg-blue-400 p-2 rounded-md text-white mt-3 focus:outline-none hover:bg-black"
              onClick={resetGame}
            >
              Reset Game
            </button>
          </div>
        </div>

        <div className="flex space-x-3 mt-5">
          <a href="https://www.facebook.com/patradanai">
            <FbIcon className="w-10 h-10" />
          </a>
          <a href="https://github.com/patradanai/xo-interview-nextjs">
            <GithubIcon className="w-10 h-10" />
          </a>
          <a href="https://www.linkedin.com/in/patradanai-nakpimay/">
            <LinkedInIcon className="w-10 h-10" />
          </a>
        </div>
      </div>
      <style jsx>
        {`
          .board {
            display: grid;
            grid-template-columns: repeat(${size}, minmax(0, 1fr));
            gap: 10px;
            grid-auto-rows: minmax(100px, auto);
          }
          ul li {
            list-style-type: square;
          }
          hr.line {
            border: none;
            border-top: 1px solid #333;
            color: #333;
            overflow: visible;
            text-align: center;
            height: 5px;
          }
          hr.line::after {
            background: #fff;
            content: "Or";
            padding: 0 4px;
            position: relative;
            top: -13px;
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;
