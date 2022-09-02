import { readlines, simulateDay } from "./part1"

export function part2(filename: string) {
    let fishies = Array.apply(null, Array(9)).map(() => 0);
    for (let num of readlines(filename)) {
        fishies[num]++;
    }
    for (let i = 0; i < 256; i++) {
        simulateDay(fishies);
    }
    console.log(fishies.reduce((a, b) => a + b, 0))
}