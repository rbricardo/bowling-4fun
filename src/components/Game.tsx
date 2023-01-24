import { useState } from "react";

import Scorecard from "./ScoreCard";
import Controls from "./Controls";

import {
  isGameOver,
  updateCumulativeScore,
  updateCurrentRoll,
  updateFrames,
} from "../utils";

function Game() {
  const [frames, setFrames] = useState<number[][]>([]);
  const [cumulativeScores, setCumulativeScores] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [pins, setPins] = useState<number[]>([]);
  const [rolls, setRolls] = useState<number>(0);

  const restart = () => {
    setFrames([]);
    setCumulativeScores([]);
    setGameOver(false);
    setPins([]);
    setRolls(0);
  };

  const enterStore = (payload: number) => {
    setFrames(updateFrames(rolls, payload, frames));
    setCumulativeScores(
      updateCumulativeScore(rolls, frames, cumulativeScores, pins, payload)
    );
    setGameOver(isGameOver(rolls, payload, pins));
    setPins(pins.concat(payload));
    setRolls(updateCurrentRoll(rolls, payload));
  };

  const totalScore = cumulativeScores.slice(-1)[0];

  return (
    <div className="flex flex-col items-center">
      <Scorecard frames={frames} cumulativeScores={cumulativeScores} />
      <Controls
        enterScore={enterStore}
        gameOver={gameOver}
        lastRoll={pins.slice(-1)[0]}
        rolls={rolls}
        restart={restart}
      />
      {gameOver && (
        <div className="text-center mt-5 border-2 border-teal-500 rounded p-4">
          <h1 className="font-bold">Game Over!</h1>
          <h2 className="font-bold">You Scored: {totalScore}</h2>
        </div>
      )}
    </div>
  );
}

export default Game;
