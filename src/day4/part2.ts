import { readInput, BingoBoard, BingoCell, findTurnsToWin, printBoard, calculateScore } from "./part1"

export function part2(filename: string) {
    let input = readInput(filename);
    let winningBoard: BingoBoard;
    let winningTurn: number = 0;
    let winningCell: BingoCell;
    for (let board of input.boards) {
        let boardWins = findTurnsToWin(input.marks, board);
        if (boardWins != Number.POSITIVE_INFINITY && boardWins > winningTurn) {
            console.log(boardWins, board.board.flat().filter(c => c.markedOnTurn == boardWins)[0])
            winningTurn = boardWins;
            winningCell = board.board.flat().filter(c => c.markedOnTurn == winningTurn)[0];
            winningBoard = board;
        }
    }
    console.log(`marks[${input.marks.length}]: ${input.marks}`)
    console.log(`win on turn ${winningTurn}`);
    console.log(calculateScore(winningBoard.board, winningCell));
}