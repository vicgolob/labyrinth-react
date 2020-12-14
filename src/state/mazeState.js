import {useReducer, useEffect} from 'react';
import {isCellAvailable} from '../utils';
const {min, max} = Math;

// CONSTANTS
const KEY_PRESS = 'KEY_PRESS';
const RESET = 'RESET';

// REDUCERS
const reducer = (state, {type, payload}) => {
  const {
    gridSize,
    serialArray,
    x,
    y,
    moves,
    result,
    endX,
    endY,
  } = state;
  let newState = state;
  switch (type) {
  case KEY_PRESS:
    if (!moves || result !== '') return state;
    if (payload === 'ArrowLeft' && isCellAvailable(serialArray, x, y, 'left')) {
      newState = {...state, x: max(0, x - 1)};
    } else if (payload === 'ArrowUp' &&
                isCellAvailable(serialArray, x, y, 'up')) {
      newState = {...state, y: max(0, y - 1)};
    } else if (payload === 'ArrowRight' &&
                isCellAvailable(serialArray, x, y, 'right')) {
      newState = {...state, x: min(gridSize, x + 1)};
    } else if (payload === 'ArrowDown' &&
                isCellAvailable(serialArray, x, y, 'down')) {
      newState = {...state, y: min(gridSize, y + 1)};
    }
    if (newState.x !== x || newState.y !== y) {
      let newResult = '';
      if (newState.x === endX && newState.y === endY) {
        // Win situation
        newResult = 'You won!';
      } else if (moves === 1) {
        // Lose situation
        newResult = 'You lost :(';
      }
      return {...newState, moves: max(0, moves - 1), result: newResult};
    }
    return newState;
  case RESET:
    return {
      ...state,
      x: payload.x,
      y: payload.y,
      moves: payload.moves,
      result: '',
    };
  default:
    return state;
  }
};

// STATE HOOK
function useMaze(gridSize, serialArray, x, y, moves, endX, endY) {
  const initialState = {
    gridSize,
    serialArray,
    initialX: x,
    initialY: y,
    x,
    y,
    moves,
    result: '',
    endX,
    endY,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const handleKeyPress = ({key}) => dispatch({type: KEY_PRESS, payload: key});
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);
  return {state, dispatch};
}

export default useMaze;
