import {Maze} from '../Maze/Maze';
import {Character} from '../Character/Character';
import {MovesCounter} from '../MovesCounter/MovesCounter';
import {GameResult} from '../GameResult/GameResult';
import {getMazeSerialArray} from '../../utils';
import useMaze from '../../state/mazeState';
import styles from '../../styles/styles';

export const MazeGame = (props) => {
  const {
    mazeSerial,
    gridSize,
    initialPosition,
    endPosition,
    moves,
    minMoves,
    setEditionMode,
  } = props;
  const {x, y} = initialPosition;
  const {endX, endY} = endPosition;
  const serialArray = getMazeSerialArray(mazeSerial, gridSize);
  const {state: gameState, dispatch} = useMaze(
    gridSize, serialArray, x, y, moves, endX, endY,
  );

  return (
    <div style={{...styles.padding, display: 'flex'}}>
      <div style={styles.leftSection}>
        {/* Min Moves to solve */}
        <p>Can you solve it in {minMoves} moves? GO!</p>
        {/* Moves Counter */}
        <MovesCounter moves={gameState.moves} />
        {/* Game Result */}
        <GameResult result={gameState.result} />
        {/* Reset button - Replay the actual maze */}
        <button
          onClick={() => dispatch({type: 'RESET', payload: {x, y, moves}})}
        >RESET</button>
        {/* Restart button - go to edition mode */}
        <button style={{marginTop: '1em'}}
          onClick={() => setEditionMode(true)}
        >EDIT MAZE</button>
      </div>
      <div style={styles.maze}>
        {/* Maze */}
        <Maze mazeSerial={serialArray} gridSize={gridSize} />
        {/* Character */}
        <Character position={{x: gameState.x, y: gameState.y}} />
      </div>

    </div>
  );
};
