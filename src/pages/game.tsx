import React, { useContext } from "react";
import { Board } from "../parts/board";
import { GameContext } from "../providers/gameProvider";
import {Moves} from "../parts/moves";

export const Game: React.FC = () => {
    const { state } = useContext(GameContext);
    const status = state.status;
  // todo cssで見た目整える
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{status}</div>
       <Moves/>
      </div>
    </div>
  );
};
