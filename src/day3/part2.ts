import { readlines } from "./part1";

interface Bin {
    zeros: number[],
    ones: number[],
}

export function part2(filename: string): void {
    let nums = readlines(filename);
    let logMaxNum = nums.reduce((a, b) => Math.max(a, b), 0);
    logMaxNum = 1 << Math.floor(Math.log2(logMaxNum));

    let bin = splitBin(nums, logMaxNum)
    console.log(logMaxNum);
    console.log("gamma")
    let gamma = splitSelect(gammaSelector(bin), logMaxNum >> 1, gammaSelector)
    console.log("epsilon")
    let epsilon = splitSelect(epsilonSelector(bin), logMaxNum >> 1, epsilonSelector)

    console.log(gamma, epsilon, gamma * epsilon)
}

function gammaSelector({ zeros, ones }: Bin): number[] {
    if (zeros.length == 0) return ones;
    return zeros.length > ones.length ? zeros : ones;
}

function epsilonSelector({ zeros, ones }: Bin): number[] {
    if (zeros.length == 0) return ones;
    return zeros.length > ones.length ? ones : zeros;
}

function splitSelect(nums: number[], bit: number, selector: Function): number {
    if (nums == null || nums.length < 1) {
        throw new Error("Not enough numbers left to continue. Failed at bit=" + bit + ", nums.length=" + nums?.length);
    } else if (nums.length == 1) {
        return nums[0];
    }
    nums = selector(splitBin(nums, bit));
    console.log(bit, nums.length);
    return splitSelect(nums, bit >> 1, selector);
}

function splitBin(nums: number[], bit: number): Bin {
    let bin: Bin = { zeros: [], ones: [] }
    for (let n of nums) {
        (bit & n ? bin.ones : bin.zeros).push(n);
    }
    return bin;
}
