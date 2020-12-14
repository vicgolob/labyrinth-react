import {useState} from 'react';
import styles from '../../styles/styles';
import {getMazeSerialArray, lookupChar} from '../../utils';
const {pow} = Math;

export const MazeEditor = (props) => {
  const {
    setMazeSerial,
    mazeSerial,
    gridSize,
    setGrid,
    setEditionMode,
    setInitialPosition,
    setEndPosition,
    setMinMoves,
    setMoves,
    moves,
  } = props;
  const [cellTypeToAdd, setCellTypeToAdd] = useState('W');
  const [startCell, setStartCell] = useState('');
  const [endCell, setEndCell] = useState('');

  let cellIndex = 0;

  const modifyCell = (target) => {
    const charIndex = target.id;
    const newMazeSerial = Array.from(mazeSerial);
    if (cellTypeToAdd === 'W' && newMazeSerial[charIndex] === 'W') {
      newMazeSerial[charIndex] = 'P';
    } else {
      newMazeSerial[charIndex] = cellTypeToAdd;
    }
    if (cellTypeToAdd === 'S') {
      if (startCell) newMazeSerial[startCell] = 'P';
      setStartCell(charIndex);
    }
    if (cellTypeToAdd === 'F') {
      if (endCell) newMazeSerial[endCell] = 'P';
      setEndCell(charIndex);
    }
    if (cellTypeToAdd === 'W' &&
      (charIndex === startCell || charIndex === endCell)
    ) {
      if (charIndex === startCell) {
        setStartCell('');
      } else {
        setEndCell('');
      }
    }

    setCellTypeToAdd('W');
    setMazeSerial(newMazeSerial.join(''));
  };

  const makeGrid = () => {
    const rows = [];
    for (let rowIndex = 0; rowIndex < gridSize; rowIndex++) {
      rows.push(<tr key={rowIndex}>{makeCell()}</tr>);
    }
    return (
      <table style={styles.padding} cellSpacing='0'>
        <tbody>{rows}</tbody>
      </table>
    );
  };

  const makeCell = () => {
    const cells = [];
    for (let columnIndex = 0; columnIndex < gridSize; columnIndex++) {
      cells.push(<td
        style={addStyleForCell()}
        key={`${cellIndex}`}
        id={`${cellIndex}`}
        onClick={(e) => modifyCell(e.target)} />);
      cellIndex++;
    }
    return cells;
  };

  const addStyleForCell = () => {
    let styleToAdd = styles.openEdit;
    const cellTypeToAdd = Array.from(mazeSerial)[cellIndex];
    switch (cellTypeToAdd) {
    case 'W':
      styleToAdd = styles.edge;
      break;
    case 'S':
      styleToAdd = styles.start;
      break;
    case 'F':
      styleToAdd = styles.end;
      break;
    default:
      break;
    }
    return styleToAdd;
  };

  async function proceedToGame() {
    // Get Initial Position
    const serialArray = getMazeSerialArray(mazeSerial, gridSize);
    const {
      x: initialX,
      y: initialY,
      error: errorStart,
    } = lookupChar(serialArray, 'S');
    if (errorStart) return;
    // Get End Position
    const {x: endX, y: endY, error: errorEnd} = lookupChar(serialArray, 'F');
    if (errorEnd) return;
    const minMoves = await fetchMazeSolve(mazeSerial, gridSize);
    if (minMoves instanceof Error) return;
    setInitialPosition({x: initialX, y: initialY});
    setEndPosition({endX, endY});
    setMinMoves(minMoves);
    setEditionMode(false);
  }

  async function fetchMazeSolve(mazeSerial, gridSize) {
    try {
      let minMoves = 'Can\'t determinate min moves';
      const query = `serial=${mazeSerial}&width=${gridSize}`;
      // External service to validate that maze is correct:
      // it has a start and end and it can be solved
      const response = await fetch(`https://tiny-pathfinder.herokuapp.com/mazes/solve?${query}`, {method: 'POST'});
      if (response.status !== 200) {
        alert('Can\'t determine if this is a solvable maze, but go ahead');
      } else {
        const data = await response.json();
        minMoves = data.path_length;
        // Maze can't be solved
        if (!minMoves) {
          alert('Seems that the maze doesn\'t have a solution :/');
          return Error();
        }
      }
      return minMoves;
    } catch (error) {
      alert('Can\'t determine if this is a solvable maze, but go ahead');
      return;
    }
  }

  return (
    <div style={{...styles.padding, display: 'flex'}}>
      <div style={styles.leftSection}>
        {/* Grid size setter */}
        <div style={styles.row}>
          <p style={{marginRight: '1em'}}>Choose the grid size</p>
          <input type='number'
            min='4'
            max='15'
            step='1'
            defaultValue={gridSize}
            onChange={(e) => {
              setGrid(e.target.value);
              setMazeSerial('P'.repeat(pow(e.target.value, 2)));
              setStartCell('');
              setEndCell('');
            }}
            style={styles.input}
          ></input>
        </div>
        <div style={styles.row}>
          <p style={{marginRight: '1em'}}>How many moves would you have?</p>
          <input type='number'
            min='3'
            step='1'
            defaultValue={moves}
            onChange={(e) => setMoves(e.target.value)}
            style={styles.input}
          ></input>
        </div>
        {/* Control to set start position */}
        <div style={styles.row}>
          <p style={{marginRight: '1em'}}>Pick to set start position</p>
          <div
            style={styles.circleStart}
            onClick={() => setCellTypeToAdd('S')}>
          </div>
        </div>
        {/* Control to set end position */}
        <div style={styles.row}>
          <p style={{marginRight: '1em'}}>Pick to set end position</p>
          <div
            style={styles.circleEnd}
            onClick={() => setCellTypeToAdd('F')}
          ></div>
        </div>
        {/* Play Button */}
        <div style={styles.column}>
          <p style={{marginRight: '1em'}}>Click the button below to start</p>
          <button
            style={styles.playBtn}
            onClick={() => proceedToGame()}
          >PLAY ;)</button>
        </div>
      </div>
      {makeGrid()}
    </div>
  );
};
