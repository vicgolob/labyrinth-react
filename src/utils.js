const getMazeSerialArray = (serial, size) => {
  return serial.match(new RegExp(`.{1,${size}}`, 'g'));
};

const isCellAvailable = (serialArray, x, y, direction) => {
  let futureCell;
  switch (direction) {
  case 'left':
    futureCell = serialArray[y][x - 1];
    break;
  case 'right':
    futureCell = serialArray[y][x + 1];
    break;
  case 'up':
    if (y - 1 < 0) return false;
    futureCell = serialArray[y - 1][x];
    break;
  case 'down':
    if (y + 1 === serialArray.length) return false;
    futureCell = serialArray[y + 1][x];
    break;
  default:
    break;
  }
  return futureCell && futureCell !== 'W';
};

const lookupChar = (arr, lookupChar) => {
  try {
    for (const rowIndex in arr) {
      if (arr[rowIndex]) {
        const charPosition = arr[rowIndex].indexOf(lookupChar);
        if (charPosition !== -1) {
          return {x: charPosition, y: parseInt(rowIndex)};
        }
      }
    }
    throw new Error('The maze must contain a Start and an End position');
  } catch (error) {
    alert(error);
    return {error};
  }
};

export {
  getMazeSerialArray,
  isCellAvailable,
  lookupChar,
};
