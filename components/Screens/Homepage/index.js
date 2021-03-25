import React, { useState } from "react";
import Box from "../../elements/Box";
import { getwinnerLine } from "../../../functions";

/**
 *
 * sizeBoard have array with object {name : player or dragon , symbol  : x, O}
 */

const HomePage = () => {
  const [winnerLine, setWinnerLine] = useState(getwinnerLine(3));
  const [sizeBoard, setSizeBoard] = useState(new Array(9).fill(null));
  const [gameTurn, setGameTurn] = useState(true);

  //   Update SizeBoard
  const onChangeSize = (event) => {
    event.preventDefault();
    console.log(event.target.value);
  };

  //   OnClick Player
  const onChangeBox = (number) => {
    let rawBoard = [...sizeBoard];
    let namePlayer;
    let symbol;

    // Check Null
    if (rawBoard[number]) {
      return null;
    }

    // Check Winner

    // Check Turn name
    if (gameTurn) {
      namePlayer = "Player";
      symbol = "X";
    } else {
      namePlayer = "Dragon";
      symbol = "O";
    }

    rawBoard[number] = { namePlayer, symbol };

    // Update to sizeBoard
    setSizeBoard(rawBoard);
    // Change Turn
    setGameTurn(!gameTurn);
  };

  return (
    <div className="container">
      <div className="w-full h-full flex flex-col items-center">
        <h1 className="text-3xl my-3">XO GAME</h1>
        <p>Role : </p>

        {/* Draw Boards */}
        <div className="w-80 h-80">
          <div className="my-1">
            <select
              className="w-20 p-2 appearance-none"
              onChange={(event) => onChangeSize(event)}
              value={sizeBoard.length}
            >
              <option value={9}>3x3</option>
              <option value={16}>4x4</option>
              <option value={25}>5x5</option>
              <option value={36}>6x6</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <div className="grid grid-cols-3 grid-flow-row h-full w-full ">
            {sizeBoard.map((val, index) => (
              <Box
                key={index}
                val={val}
                index={index}
                onChangeBox={onChangeBox}
              />
            ))}
          </div>
          {/* Status Turn */}
          <div className="text-lg text-center mt-5">
            <span
              className={`${
                !gameTurn ? "text-red-500" : "text-blue-500"
              } font-bold`}
            >
              {gameTurn ? "Player" : "Dragon"}
            </span>{" "}
            Turn
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
