"use client";

import React, { useState } from "react";
import "./App2.css"; // Optional: Move styles specific to Clicker into its own CSS file.

const Clicker: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [pointsPerClick, setPointsPerClick] = useState<number>(1);

  // Increment score
  const handleClick = () => {
    setScore(score + pointsPerClick);
  };

  // Upgrade points per click
  const handleUpgrade = () => {
    if (score >= 10) { // Cost of upgrade
      setScore(score - 10);
      setPointsPerClick(pointsPerClick + 1);
    } else {
      alert("Not enough points for upgrade!");
    }
  };

  // Reset the game
  const handleReset = () => {
    setScore(0);
    setPointsPerClick(1);
  };

  return (
    <div className="Clicker">
      <h1>Clicker Game</h1>
      <div className="score">Score: {score}</div>
      <button className="click-btn" onClick={handleClick}>
        Click Me!
      </button>
      <button className="upgrade-btn" onClick={handleUpgrade}>
        Upgrade (+1 Point/Click) - Cost: 10
      </button>
      <button className="reset-btn" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default Clicker;
