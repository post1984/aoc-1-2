import { readlines } from "./part1";

export function part2(filename: string) {
    let count = 0, lastSum = Number.POSITIVE_INFINITY, lastN = [];
    for (let n of readlines(filename)) {
        lastN.push(n);
        if (lastN.length > 3) {
            lastN = lastN.splice(1);
        }
        if (lastN.length == 3) {
            let sum = lastN.reduce((a, b) => a + b, 0);
            count += (lastSum < sum ? 1 : 0);
            lastSum = sum;
        }
    }
    count += (lastSum < lastN.reduce((a, b) => a + b, 0) ? 1 : 0);
    console.log(lastN)
    console.log(count);
}