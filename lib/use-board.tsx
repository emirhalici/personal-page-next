import { useState } from "react";

type Prettify<T> = {
  [K in keyof T]: T[K];
} & NonNullable<unknown>;

export type Player = "X" | "O";
export type BoardSquareValue = Prettify<Player | null>;
export type Position = [number, number];

export type BoardSquare = [
  [BoardSquareValue, BoardSquareValue, BoardSquareValue],
  [BoardSquareValue, BoardSquareValue, BoardSquareValue],
  [BoardSquareValue, BoardSquareValue, BoardSquareValue],
];

export interface Board {
  square: BoardSquare;
  xLastPositions: Position[];
  oLastPositions: Position[];
  winner: Player | null;
}

class BoardController {
  initialize(): Board {
    return {
      square: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      xLastPositions: [],
      oLastPositions: [],
      winner: null,
    };
  }

  clone(board: Board): Board {
    const newBoard = this.initialize();
    newBoard.square = JSON.parse(JSON.stringify(board.square));
    newBoard.xLastPositions = [...board.xLastPositions];
    newBoard.oLastPositions = [...board.oLastPositions];
    newBoard.winner = board.winner;
    return newBoard;
  }

  canClick(board: Board, row: number, col: number): boolean {
    return board.square[row][col] === null;
  }

  handleClick(board: Board, row: number, col: number, player: Player): Board {
    const newBoard = this.clone(board);
    if (!this.canClick(newBoard, row, col)) {
      return newBoard;
    }

    // Set the current position of the player
    newBoard.square[row][col] = player;

    if (this.checkWin(newBoard, player)) {
      newBoard.winner = player;
      return newBoard;
    } else {
      // Update the last positions of the player
      const lastPositions =
        player === "X" ? newBoard.xLastPositions : newBoard.oLastPositions;
      if (lastPositions.length > 1) {
        const [xRow, xCol] = lastPositions.shift()!;
        newBoard.square[xRow][xCol] = null;
      }
      lastPositions.push([row, col]);
      return newBoard;
    }
  }

  checkWin(board: Board, player: Player): boolean {
    // Check rows
    for (let row = 0; row < 3; row++) {
      if (
        board.square[row][0] === player &&
        board.square[row][1] === player &&
        board.square[row][2] === player
      ) {
        return true;
      }
    }

    // Check columns
    for (let col = 0; col < 3; col++) {
      if (
        board.square[0][col] === player &&
        board.square[1][col] === player &&
        board.square[2][col] === player
      ) {
        return true;
      }
    }

    // Check diagonals
    if (
      (board.square[0][0] === player &&
        board.square[1][1] === player &&
        board.square[2][2] === player) ||
      (board.square[0][2] === player &&
        board.square[1][1] === player &&
        board.square[2][0] === player)
    ) {
      return true;
    }

    return false;
  }
}

export function useBoard() {
  const [boardController] = useState(new BoardController());
  const [board, setBoard] = useState(boardController.initialize());

  const handleClick = (row: number, col: number, player: Player) => {
    const newBoard = boardController.handleClick(board, row, col, player);
    setBoard(newBoard);
  };

  const canClick = (row: number, col: number) => {
    return boardController.canClick(board, row, col);
  };

  const reset = () => {
    setBoard(boardController.initialize());
  };

  return { board, handleClick, canClick, reset };
}
