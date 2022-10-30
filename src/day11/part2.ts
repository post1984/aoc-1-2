import { readlines, inplaceStep, Octopus } from "./part1";

export function part2(filename: string) {
    let octopi = readlines(filename);
    let step = 0;
    while (test(octopi)) {
        inplaceStep(octopi);
        step++;
    }
    console.log(step);
}

function test(octopi: Octopus[][]): boolean {
    return 0 != octopi.map((oArr => oArr.map(o => o.value).reduce((a, b) => Math.max(a, b), 0))).reduce((a, b) => Math.max(a, b));
}