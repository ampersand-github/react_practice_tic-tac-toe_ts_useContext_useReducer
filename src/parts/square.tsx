import React, { useContext } from "react";
import {
  canContinue,
  GameContext,
} from "../providers/gameProvider";

interface Props {
  value: number;
}

export const Square: React.FC<Props> = (props: Props) => {
  const { state, dispatch } = useContext(GameContext);
  const style = { height: 48, width: 48 };

  const squareClickEvent = (squareNumber: number) => {
    if (!canContinue(squareNumber, state.squares)) {
      return;
    }
    dispatch({type: "SET_SQUARE", mark: state.player, squareNumber: squareNumber});
    dispatch({ type: "TOGGLE_NEXT_PLAYER" });
    dispatch({ type: "UPDATE_STATUS" });
    dispatch({ type: "UPDATE_HISTORY" });
  };

  return (
    <button
      className="square"
      style={style}
      onClick={() => {
        squareClickEvent(props.value);
      }}
    >
      {state.squares[props.value]}
    </button>
  );
};
