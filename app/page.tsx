"use client";
import { useEffect, useState } from "react";
import Cell from "./comp/cell";

export default function Home() {
  const [cells, setCells] = useState(Array(9).fill(""));
  const [go, setGo] = useState("circle");
  const [winningMessage, setWinningMessage] = useState("");
  const [winningCells, setWinningCells] = useState<number[]>([]);

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  useEffect(() => {
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        setWinningMessage(`${cells[a]} Won!`);
        setWinningCells(combo);
        return;
      }
    }
  }, [cells]);

  const restartGame = () => {
    setCells(Array(9).fill(""));
    setGo("circle");
    setWinningMessage("");
    setWinningCells([]);
  };

  return (
    <div className="container">
      <div className="game-box">
        {cells.map((cell, index) => (
          <Cell
            key={index}
            id={index}
            cell={cell}
            cells={cells}
            setCells={setCells}
            go={go}
            setGo={setGo}
            winningMessage={winningMessage}
            isWinningCell={winningCells.includes(index)}
          />
        ))}
      </div>
      <div className="message">
        {winningMessage || (go === "circle" ? "Circle Turn" : "Cross Turn")}
      </div>
      {winningMessage && (
        <button onClick={restartGame} className="restart-btn">
          Restart
        </button>
      )}
    </div>
  );
}
