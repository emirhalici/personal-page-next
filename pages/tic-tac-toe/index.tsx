import { Manrope } from "next/font/google";
import { Header } from "~/components/ui/header";
import { useState } from "react";
import { BoardSquareValue, Player, useBoard } from "./use-board";
import { Button } from "~/components/ui/button";
import { XIcon, Circle } from "lucide-react";

const manrope = Manrope({ subsets: ["latin"] });

export default function Page() {
  const { board, handleClick, canClick, reset } = useBoard();
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");

  const handleSquareClick = (row: number, col: number) => {
    if (canClick(row, col) && !board.winner) {
      handleClick(row, col, currentPlayer);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    reset();
    setCurrentPlayer("X");
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start py-6 px-2 md:px-24 ${manrope.className}`}
    >
      <Header />
      <div className="w-11/12 sm:w-1/2 justify-start pt-6">
        <h1 className="pb-5 text-4xl font-semibold">
          🕹️ Tic-tac-toe with a twist
        </h1>
        <p className="pb-2">
          Tic-tac-toe as we all know, except that it goes on forever until you
          win or lose. inspired from this{" "}
          <a
            className="opacity-70 font-semibold underline-offset-4 hover:underline"
            href="https://x.com/Rainmaker1973/status/1837310784474689998"
            target="_blank"
            rel="noopener noreferrer"
          >
            X (formerly Twitter) post
          </a>
          .
        </p>
        <div>
          <PlayerStatus player={currentPlayer} winner={board.winner} />
          <div className="w-48 h-48 grid grid-cols-3 grid-rows-3 gap-1 mb-4">
            {board.square.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  className={`
              aspect-square flex items-center justify-center text-4xl font-bold bg-gray-100 dark:bg-gray-900 rounded-md
              ${cell ? "hover:bg-gray-100 dark:hover:bg-gray-900" : "hover:bg-gray-200 dark:hover:bg-gray-800"}
            `}
                  onClick={() => handleSquareClick(rowIndex, colIndex)}
                  disabled={!canClick(rowIndex, colIndex) || !!board.winner}
                >
                  <BoardSquareIcon cell={cell} />
                </button>
              ))
            )}
          </div>
          <Button onClick={resetGame}>Reset</Button>
        </div>
      </div>
    </main>
  );
}

interface BoardSquareIconProps {
  cell: BoardSquareValue;
}
function BoardSquareIcon({ cell }: BoardSquareIconProps) {
  if (cell === "X") {
    return <XIcon size={32} className="text-blue-500 h-8" />;
  } else if (cell === "O") {
    return <Circle size={26} className="text-red-500 h-8" />;
  } else {
    return null;
  }
}

function PlayerStatus({
  player,
  winner,
}: {
  player: Player;
  winner: Player | null;
}) {
  return (
    <div className="flex items-center gap-2 pb-4">
      <p className="font-semibold text-lg">
        {winner ? "Winner" : "Player turn"}:
      </p>
      <BoardSquareIcon cell={winner ?? player} />
    </div>
  );
}
