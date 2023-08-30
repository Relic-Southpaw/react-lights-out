import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

let nrows = 8;
let ncols = 8;
let chanceLightStartsOn = 30;


function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];

    for (let x = 0; x < nrows; x++) {
      let rows = [];
      for (let y = 0; y < ncols; y++) {
        rows.push(Math.random() * 100 < chanceLightStartsOn);
      }
      initialBoard.push(rows)
    }
    // TODO: create array-of-arrays of true/false values
    return initialBoard;
  }

  hasWon = () => board.every(rows => rows.every(cell => !cell))
  // TODO: check the board in state to determine whether the player has won.

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(rows => [...rows]);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);

      // TODO: return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    <div>You Win!</div>;
  }


  // TODO

  // make table board

  let tableBoard = [];


  for (let x = 0; x < nrows; x++) {
    let rows = [];
    for (let y = 0; y < ncols; y++) {
      let loc = `${y}-${x}`;
      rows.push(<Cell isLit={board[y][x]} flipping={flipCellsAround(coord)} />);
    }
    tableBoard.push(<tr key={y}>{rows}</tr>);
  }
  return (<table className="Board">
    <tbody>{tableBoard}</tbody>
  </table>);

  // TODO
}

export default Board;
