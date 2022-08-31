import { readlines, Movement } from "./part1";

interface Submarine {
    aim: number,
    depth: number,
    horizontal: number
}

export function part2(filename: string) {
    let movements: Movement[] = readlines(filename);
    let submarine = { aim: 0, depth: 0, horizontal: 0 };
    for (let m of movements) {
        handleMovement(submarine, m);
    }
    console.log(submarine.horizontal * submarine.depth)
}

function handleMovement(submarine: Submarine, movement: Movement) {
    if (movement.isVertical) {
        submarine.aim += movement.value;
    } else {
        submarine.horizontal += movement.value;
        submarine.depth += movement.value * submarine.aim;
    }
}