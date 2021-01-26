import React, { useContext } from "react";
import { GameContext } from "../providers/gameProvider";

export const Moves: React.FC = () => {
  const { state, dispatch } = useContext(GameContext);

  const moves = state.history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button
          onClick={() => {
            dispatch({ type: "JUMP_TO", step: move });
            dispatch({ type: "UPDATE_STATUS" });
          }}
        >
          {desc}
        </button>
      </li>
    );
  });

  return <ol>{moves}</ol>;
};
