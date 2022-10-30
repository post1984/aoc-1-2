import fs from "fs";

export interface Octopus {
    value: number,
    flashed: boolean
}

export function readlines(filename: string): Octopus[][] {
    return fs.readFileSync(filename, { encoding: "utf8" }).split(/\r?\n/).filter(Boolean).map(line => {
        return Array.from(line).map(ch => {
            return {
                value: parseInt(ch, 10),
                flashed: false
            };
        })
    });
}

export function part1(filename: string) {
    let octopi = readlines(filename);
    const totalSteps = 100;
    let flashes = 0;
    for (let step = 0; step < totalSteps; step++) {
        flashes += inplaceStep(octopi);
    }
    console.log(flashes);
}

export function inplaceStep(octopi: Octopus[][]): number {
    let numFlashes = 0;
    // increment all
    for (let line of octopi) {
        for (let octopus of line) {
            octopus.value++;
        }
    }

    let newFlashFound = true;
    while (newFlashFound) {
        newFlashFound = false;
        // find all new flashes
        for (let row = 0; row < octopi.length; row++) {
            for (let col = 0; col < octopi[row].length; col++) {
                let octopus = octopi[row][col];
                if (!octopus.flashed && octopus.value > 9) {
                    for (let pair of [[-1, -1], [-1, 0], [0, -1], [0, 0], [1, -1], [-1, 1], [0, 1], [1, 0], [1, 1]]) {
                        if (row + pair[0] >= 0 &&
                            row + pair[0] < octopi.length &&
                            col + pair[1] >= 0 &&
                            col + pair[1] < octopi[col].length) {
                                octopi[row + pair[0]][col + pair[1]].value++;
                            }
                    }
                    octopus.flashed = true;
                    newFlashFound = true;
                    numFlashes++;
                }
            }
        }
    }

    // flashes complete, set to off, reset to 0
    for (let line of octopi) {
        for (let octopus of line) {
            if (octopus.flashed) {
                octopus.value = 0;
            }
            octopus.flashed = false;
        }
    }

    return numFlashes;
}