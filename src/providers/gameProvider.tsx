import React, { useReducer, createContext } from "react";

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// todo -> typeへ
interface Props {
  children?: React.ReactNode;
}

type contextType = {
  state: stateType;
  dispatch: React.Dispatch<Action>;
};

type playerType = "○" | "☓" | null;

type stateType = {
  squares: [
    playerType,
    playerType,
    playerType,
    playerType,
    playerType,
    playerType,
    playerType,
    playerType,
    playerType
  ];
  player: playerType;
  status: string;
  history: any[]; // todo anyの撲滅
  canContinue: boolean;
};

type SET_SQUARE = {
  type: "SET_SQUARE";
  mark: playerType;
  squareNumber: number;
};

type Action =
  | SET_SQUARE
  | { type: "TOGGLE_NEXT_PLAYER" }
  | { type: "UPDATE_STATUS" }
  | { type: "UPDATE_HISTORY" }
  | { type: "JUMP_TO"; step: number }
  | { type: "CAN_CONTINUE"; squareNumber: number };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// todo 引数は必要なもののみ
const reducer = (state: stateType, action: Action): stateType => {
  switch (action.type) {
    case "SET_SQUARE":
      return {
        ...state,
        squares: setSquare(state, action),
      };
    case "TOGGLE_NEXT_PLAYER":
      return {
        ...state,
        player: toggleNextPlayer(state.player),
      };
    case "UPDATE_STATUS":
      return {
        ...state,
        status: updateStatus(state.player, state),
      };
    case "UPDATE_HISTORY":
      return {
        ...state,
        history: updateHistory(state),
      };
    case "JUMP_TO":
      if (action.step === 0) {
        return initialState;
      }
      // eslint-disable-next-line no-case-declarations
      const h = [...state.history];
      return {
        ...state,
        player: action.step % 2 === 0 ? "☓" : "○",
        squares: state.history[action.step - 1].squares,
        history: h.splice(0, action.step),
      };
    default:
      return state;
  }
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const setSquare = (
  state: stateType,
  action: SET_SQUARE
): stateType["squares"] => {
  const _ = state.squares.slice();
  _[action.squareNumber] = action.mark;
  return _ as stateType["squares"];
};

const toggleNextPlayer = (nowPlayer: playerType): playerType => {
  return nowPlayer === "☓" ? "○" : "☓";
};

const updateStatus = (
  nextPlayer: playerType,
  state: stateType
): stateType["status"] => {
  const winner = calculateWinner(state.squares);
  // ゲーム終了(決着がついた)
  if (winner) {
    return `Winner : ${winner}`;
  }
  // todo ゲーム終了(決着がつかなかった)
  // ゲーム中
  return `Next Player : ${nextPlayer}`;
};

const calculateWinner = (squares: stateType["squares"]): playerType => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a] as playerType;
    }
  }
  return null;
};

const updateHistory = (state: stateType): stateType["history"] => {
  return state.history.concat([{ squares: state.squares }]);
};

// todo なぜかreducerにいれると処理順番がおかしくなって期待通りの挙動をしない
export const canContinue = (
  squareNumber: number,
  squares: stateType["squares"]
): boolean => {
  return !(squares[squareNumber] || calculateWinner(squares));
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const initialState: stateType = {
  squares: [null, null, null, null, null, null, null, null, null],
  player: "☓",
  status: "Next player: ☓",
  history: [],
  canContinue: true,
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const GameContext = createContext({} as contextType);
export const GameProvider: React.FC<Props> = (props: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GameContext.Provider>
  );
};
