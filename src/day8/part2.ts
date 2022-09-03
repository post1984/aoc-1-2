import { readlines, readDisplay } from "./part1"

export function part2(filename: string) {
    // GOAL: count all
    const interesting = [1, 4, 7, 8];
    // initialize sets that contain all possibilities.
    let lines = readlines(filename);
    let sum = 0;
    for (let [possibilities, display] of lines) {
        // sort by length and lexicographically
        possibilities = possibilities.sort((a, b) => Math.abs(b.localeCompare(a))).sort((a, b) => a.length - b.length);
        let displayValues = readDisplay(possibilities, display);
        
        sum += arrToInt(displayValues);
    }
    console.log(sum);
}

function arrToInt(arr: number[]): number {
    let total = 0;
    let exponent = 0;
    for (let index = arr.length - 1; index >= 0; index--) {
        total += arr[index] * Math.pow(10, exponent++);
    }
    return total;
}