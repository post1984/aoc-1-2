import fs from "fs";

export function readlines(filename: string): number[] {
    return fs.readFileSync(filename, { encoding: "utf8" }).split(/\r?\n/).filter(Boolean).map(line => parseInt(line));
}

export function part1(filename: string) {
    let count = 0, lastN = undefined;
    for (let n of readlines(filename)) {
        if (lastN !== undefined && lastN < n) {
            count++;
        }
        lastN = n;
    }
    console.log(count);
}