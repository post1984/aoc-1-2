import fs from "fs";

export function readlines(filename: string): number[] {
    return fs.readFileSync(filename, { encoding: "utf8" }).split(/\r?\n/).filter(Boolean).flatMap(s => s.split(/,/).map(s0 => parseInt(s0, 10)));
}

export function part1(filename: string) {
    let counts = {};
    for (let position of readlines(filename)) {
        if (position in counts) {
            counts[position] += 1;
        } else {
            counts[position] = 1;
        }
    }

    let minFuelCost = Number.POSITIVE_INFINITY;
    for (let position of Object.keys(counts).map(s => parseInt(s, 10))) {
        let cost = calculateFuelCostOfMoving(counts, position);
        if (minFuelCost > cost) {
            minFuelCost = cost;
        }
    }
    console.log(minFuelCost);
}

function calculateFuelCostOfMoving(counts: object, position: number): number {
    let cost = 0;
    for (let newPosition of Object.keys(counts).map(s => parseInt(s, 10))) {
        cost += counts[newPosition] * Math.abs(position - newPosition);
    }
    return cost;
}