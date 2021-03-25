export const getwinnerLine = (size) => {
  const winnerLine = [];
  let counterRow = 1;
  let counterColumn = 1;
  let counterLeft = 1;
  let counterRight = 1;
  let dataCrossLeft = [];
  let dataCrossRight = [];

  for (let i = 0; i < size; i++) {
    // Gen in Row
    let dataRow = [];
    for (let j = 0; j < size; j++) {
      dataRow.push(counterRow);

      counterRow = counterRow + 1;
    }
    winnerLine.push(dataRow);
    // console.log("Row", dataRow);

    // Get in Column
    let dataColumn = [];
    var offerColumn = counterColumn;
    for (let j = 0; j < size; j++) {
      dataColumn.push(offerColumn);

      offerColumn += size;
    }
    winnerLine.push(dataColumn);
    counterColumn = counterColumn + 1;
    // console.log("COlumn", dataColumn);
  }

  // Cross left
  for (let j = 0; j < size; j++) {
    dataCrossLeft.push(counterLeft);
    counterLeft += size + 1;
  }

  winnerLine.push(dataCrossLeft);
  //   console.log("left", dataCrossLeft);

  // Cross Right
  let offerRight = size;
  for (let j = 0; j < size; j++) {
    dataCrossRight.push(offerRight);
    offerRight += size - 1;
  }

  winnerLine.push(dataCrossRight);
  //   console.log("Right", dataCrossRight);

  return winnerLine;
};

export const CheckWinner = (winLine, boards) => {
  const line = winLine;
  //   console.log(line, boards);
  // Loop Check Winner
  for (let i = 0; i < line.length; i++) {
    let stackX = 0;
    let stackO = 0;

    for (let j = 0; j < line[i].length; j++) {
      console.log(boards[`${line[i][j] - 1}`]?.symbol);
      if (boards[`${line[i][j] - 1}`]?.symbol == "X") {
        stackX += 1;
        console.log("X", stackX);
        if (stackX >= 3) return "X";
      } else if (boards[`${line[i][j] - 1}`]?.symbol == "O") {
        stackO += 1;
        console.log("O", stackO);
        if (stackO >= 3) return "O";
      }
    }
  }
};
