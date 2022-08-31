import fs from "fs";

interface Submarine {
    depth: number,
    horizontal: number
}

export interface Movement {
    readonly value: number,
    readonly isVertical: boolean
}

export function readlines(filename: string): Movement[] {
    return fs.readFileSync(filename, { encoding: "utf8" }).split(/\r?\n/).filter(Boolean).map(s => {
        let arr = s.split(" ");
        arr[0] = arr[0].toLowerCase();
        arr[1] = (arr[0] === "up" ? "-" : "") + arr[1];
        return {
            isVertical: arr[0] !== "forward",
            value: parseInt(arr[1]),
        }
    });
}

export function part1(filename: string) {
    let movements: Movement[] = readlines(filename)
    let submarine: Submarine = { depth: 0, horizontal: 0 }
    for (let m of movements) {
        handleMovement(submarine, m);
    }
    console.log(submarine.depth * submarine.horizontal);
}

function handleMovement(submarine: Submarine, movement: Movement) {
    if (movement.isVertical) {
        submarine.depth += movement.value;
    } else {
        submarine.horizontal += movement.value;
    }
}