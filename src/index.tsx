import React from "react";
import ReactDOM from "react-dom";
import { Game } from "./pages/game";
import {GameProvider} from "./providers/gameProvider";

ReactDOM.render(
  <React.StrictMode>
    <GameProvider>
      <Game />
    </GameProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
