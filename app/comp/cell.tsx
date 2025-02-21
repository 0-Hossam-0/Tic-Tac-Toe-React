import { useState } from "react";
import { Dispatch, SetStateAction } from "react";

type CellProps = {
  id: number;
  go: string;
  setGo: Dispatch<SetStateAction<string>>;
  cells: string[];
  setCells: Dispatch<SetStateAction<string[]>>;
  cell: string;
  winningMessage: string;
  isWinningCell: boolean;
};

const Cell = ({
  id,
  go,
  setGo,
  cells,
  setCells,
  cell,
  winningMessage,
  isWinningCell,
}: CellProps) => {
  const [hoverValue, setHoverValue] = useState("");

  const handleClick = () => {
    if (winningMessage || cells[id]) return;
    const newCells = [...cells];
    newCells[id] = go === "circle" ? "O" : "X";
    setCells(newCells);
    setGo(go === "circle" ? "cross" : "circle");
    setHoverValue("");
  };

  const handleMouseEnter = () => {
    if (cells[id] || winningMessage) return;
    setHoverValue(go === "circle" ? "O" : "X");
  };

  const handleMouseLeave = () => {
    setHoverValue("");
  };

  return (
    <div
      className={`square ${isWinningCell ? "winning" : ""}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={cell}>{cell || hoverValue}</div>
    </div>
  );
};

export default Cell;
