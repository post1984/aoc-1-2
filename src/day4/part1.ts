import fs from "fs";

export interface BingoCell {
    markedOnTurn: number
    num: number
    row: number
    column: number
}

export interface BingoBoard {
    board: BingoCell[][]
    map: Map<number, BingoCell>
}

export interface Input {
    marks: number[]
    boards: BingoBoard[]
}

export function readInput(filename: string): Input {
    const lines = fs.readFileSync(filename, "utf8").toString().split(/\r?\n/);
    const o = {
        marks: lines.splice(0, 1)[0].trim().split(",").map(s => parseInt(s, 10)),
        boards: readBoards(lines),
    }
    return o;
}

function readBoards(lines: string[]): BingoBoard[] {
    let boards: BingoBoard[] = [];
    let row: number, column: number;
    for (let line of lines) {
        if (line.length === 0) {
            row = 0;
            boards.push({
                board: [],
                map: new Map()
            });
        } else {
            column = 0;
            const nums = line.split(/\s+/).filter(Boolean).map(s => parseInt(s, 10));
            const board = boards[boards.length - 1];
            board.board.push(nums.map(n => {
                let cell = { markedOnTurn: Number.POSITIVE_INFINITY, num: n, row: row, column: column++ };
                board.map.set(n, cell)
                return cell;
            }));
            row++;
        }
    }
    return boards;
}

export function part1(filename: string) {
    let input = readInput(filename);
    let winningBoard: BingoBoard;
    let winningTurn: number = Number.POSITIVE_INFINITY;
    let winningCell: BingoCell;
    for (let board of input.boards) {
        let boardWins = findTurnsToWin(input.marks, board);
        if (boardWins < winningTurn) {
            winningTurn = boardWins;
            winningCell = board.board.flat().filter(c => c.markedOnTurn == winningTurn)[0];
            winningBoard = board;
            console.log(winningCell)
            printBoard(board.board);
        }
    }
    console.log(`marks[${input.marks.length}]: ${input.marks}`)
    console.log(`win on turn ${winningTurn}`);
    console.log(calculateScore(winningBoard.board, winningCell));
}

export function printBoard(board: BingoCell[][]) {
    for (let row of board) {
        console.log(row.map(r => r.num + ":" + r.markedOnTurn).toString().replace(/Infinity/g, "*").replace(/,/g, "\t"))
    }
}

export function findTurnsToWin(picks: number[], { board, map }: BingoBoard): number {
    // update full map
    for (let turnNum = 0; turnNum < picks.length; turnNum++) {
        const pick = picks[turnNum];
        const cell = map.get(pick);
        if (cell != null) {
            cell.markedOnTurn = turnNum;
            map.set(pick, cell);
        }
    }

    let minRowTurn = Number.POSITIVE_INFINITY;
    let minColTurn = Number.POSITIVE_INFINITY;
    for (let i = 0; i < board.length; i++) {
        let turn = 0;
        for (let row = 0; row < board[0].length; row++) {
            turn = Math.max(turn, board[row][i].markedOnTurn);
        }
        minColTurn = Math.min(minColTurn, turn);
        minRowTurn = Math.min(minRowTurn, board[i].reduce((r, cell) => Math.max(r, cell.markedOnTurn), 0));
    }

    return Math.min(minRowTurn, minColTurn);
}

export function calculateScore(board: BingoCell[][], winningCell: BingoCell): any {
    return winningCell.num * board.flat().filter(c => c.markedOnTurn > winningCell.markedOnTurn).reduce((value, cell) => value + cell.num, 0);
}

