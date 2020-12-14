import {useState} from 'react';
import './App.css';
import {MazeEditor} from '../MazeEditor/MazeEditor';
import {MazeGame} from '../MazeGame/MazeGame';

const {pow} = Math;

function App() {
  const [isEditionMode, setEditionMode] = useState(true);
  const [gridSize, setGrid] = useState(4);
  const [mazeSerial, setMazeSerial] = useState('P'.repeat(pow(gridSize, 2)));
  const [{x, y}, setInitialPosition] = useState({x: 0, y: 0});
  const [{endX, endY}, setEndPosition] = useState({endX: 0, endY: 0});
  const [moves, setMoves] = useState(3);
  const [minMoves, setMinMoves] = useState('');

  const showEditor = () => {
    if (isEditionMode) {
      return < MazeEditor
        setMazeSerial={setMazeSerial}
        gridSize={gridSize}
        mazeSerial={mazeSerial}
        setGrid={setGrid}
        setEditionMode={setEditionMode}
        setInitialPosition={setInitialPosition}
        setEndPosition={setEndPosition}
        setMoves={setMoves}
        setMinMoves={setMinMoves}
        setMoves={setMoves}
        moves={moves}
      />;
    } else {
      return < MazeGame
        mazeSerial={mazeSerial}
        gridSize={gridSize}
        initialPosition={{x, y}}
        endPosition={{endX, endY}}
        moves={moves}
        minMoves={minMoves}
        setEditionMode={setEditionMode}
      />;
    }
  };
  return showEditor();
}

export default App;
