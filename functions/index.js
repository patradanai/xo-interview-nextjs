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
  consople.log(line);
  // Loop Check Winner
};
