import { readlines } from "./part1"

export function part2(filename: string) {
    let counts = {};
    for (let position of readlines(filename)) {
        if (position in counts) {
            counts[position] += 1;
        } else {
            counts[position] = 1;
        }
    }

    let minFuelCost = Number.POSITIVE_INFINITY;
    let max = Object.keys(counts).map(s => parseInt(s, 10)).reduce((a, b) => Math.max(a, b));
    for (let newPosition = 0; newPosition <= max; newPosition++) {
        let cost = calculateFuelCostOfMoving(counts, newPosition);
        if (minFuelCost > cost) {
            minFuelCost = cost;
        }
    }
    console.log(minFuelCost);
}

function calculateFuelCostOfMoving(counts: object, position: number): number {
    let cost = 0;
    for (let oldPosition of Object.keys(counts).map(s => parseInt(s, 10))) {
        let intermediateCost = Math.abs(position - oldPosition);
        intermediateCost = Math.floor((intermediateCost + 1) * intermediateCost / 2);
        cost += counts[oldPosition] * intermediateCost;
    }
    return cost;
}