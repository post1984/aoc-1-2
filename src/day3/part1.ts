import fs from "fs";

interface Pair {
    first: number,
    second: number
}

export function readlines(filename: string) {
    return fs.readFileSync(filename, { encoding: "utf8" }).split(/\r?\n/).filter(Boolean).map(line => parseInt(line, 2));
}

export function part1(filename: string) {
    let nums = readlines(filename);
    let result = findGammaEpsilon(nums);
    console.log(result, result.first * result.second);
}

function findGammaEpsilon(nums: number[]): Pair {
    let gammaEpsilon = {
        first: 0,
        second: 0
    }
    splitSelect(nums, gammaEpsilon)
    return gammaEpsilon
}

function splitSelect(nums: number[], gammaEpsilon: Pair) {
    let logMaxNum = nums.reduce((a, b) => Math.max(a, b), 0);
    logMaxNum = Math.floor(Math.log2(logMaxNum));
    for (let bitIndex = logMaxNum; bitIndex >= 0; bitIndex--) {
        let bit = 1 << bitIndex;
        let lengths = splitBin(nums, bit);
        updateGammaEpsilon(gammaEpsilon, lengths, bit);
    }
}

function splitBin(nums: number[], bit: number): Pair {
    let bin = { zeros: [], ones: [] };
    for (let n of nums) {
        (bit & n ? bin.ones : bin.zeros).push(n);
    }
    return { first: bin.zeros.length, second: bin.ones.length }
}

function updateGammaEpsilon(gammaEpsilon: Pair, lengths: Pair, bit: number) {
    let value = lengths.first > lengths.second ? 0 : bit;
    gammaEpsilon.first += value;
    gammaEpsilon.second += bit - value;
}