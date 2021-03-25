import React, { useState } from "react";
import Box from "../../elements/Box";
const HomePage = () => {
  const [sizeBoard, setSizeBoard] = useState(new Array(9).fill(null));
  const [gameTurn, setGameTurn] = useState(true);

  //   Update SizeBoard
  const onChangeSize = (event) => {
    console.log(event.target.value);
  };

  //   OnClick Player
  const onChangeBox = () => {
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
          <div className="grid grid-cols-3 grid-flow-row h-full w-full">
            {sizeBoard.map((val, index) => (
              <Box val={index + 1} onChangeBox={onChangeBox} />
            ))}
          </div>
          <div className="">{gameTurn ? "Player" : "Dragon"} Turn</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
