import fs from "fs";

export function readlines(filename: string) {
    return fs.readFileSync(filename, { encoding: "utf8" }).split(/\r?\n/).filter(Boolean).flatMap(s => s.split(/,/g));
}

export function part1(filename: string) {
    
    let fishies = Array.apply(null, Array(9)).map(() => 0);
    for (let num of readlines(filename)) {
        fishies[num]++;
    }
    for (let i = 0; i < 256; i++) {
        simulateDay(fishies);
    }
    console.log(fishies.reduce((a, b) => a + b, 0))
    // let sum = 0;
    // const day = 80;
    // for (let i = 0; i < fishies.length; i++) {
    //     let result = calculateNewFishies(day - i);
    //     console.log(day - i, result)
    //     sum += fishies[i] * result;
    // }
    // console.log(sum)
}

export function simulateDay(fishies: number[]) {
    let day0Fishes = fishies.splice(0, 1)[0];
    fishies.push(day0Fishes); // new fish
    fishies[6] += day0Fishes; // parent fish
}

export const calculateNewFishies = memoize((daysRemaining: number): number => {
    if (daysRemaining < 0) return 0;
    if (daysRemaining == 0) return 1;
    // new fishies from this fish + new fish's future fish
    let sum = 0;
    for (let day = daysRemaining % 7; day < daysRemaining; day += 7) {
        sum += 1 + calculateNewFishies(day);
    }
    return sum;
});

function memoize(f: Function): Function {
    let memo = {};
    return (...args) => {
        let n = args[0];
        if (Object.keys(memo).includes(n)) {
            return memo[n];
        } else {
            let result = f(args);
            memo[n] = result;
            return result;
        }
    }
}

function printFishies(fishies: number[], iteration: number) {
    let s = fishies.reduce((s: string, n: number) => s.length ? `${s}, ${n}` : `${n}`, "");
    console.log(`fishies at iteration ${iteration}: [${s}]`);
}