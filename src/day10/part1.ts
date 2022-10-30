import fs from "fs"

export function readlines(filename: string): string[] {
    return fs.readFileSync(filename, { encoding: "utf8" }).split(/\r?\n/).filter(Boolean);
}

export interface IllegalCharacter {
    ")": number
    "]": number
    "}": number
    ">": number
}

export function part1(filename: string) {
    const score: IllegalCharacter = {
        ")": 3,
        "]": 57,
        "}": 1197,
        ">": 25137
    };
    const counts: IllegalCharacter = {
        ")": 0,
        "]": 0,
        "}": 0,
        ">": 0
    };

    for (let line of readlines(filename)) {
        let char = findFirstErroredSymbol(line);
        if (char) {
            counts[char]++;
        }
    }

    console.log(calculateScore(counts, score))
}

function findFirstErroredSymbol(s: string) {
    const closings = ")]>}";
    let stack = [];
    for (let ch of s) {
        if (closings.includes(ch)) {
            let opening = stack.pop();
            if (!openingMatchesClosing(opening, ch)) {
                return ch;
            }
        } else {
            stack.push(ch);
        }
    }
}

function calculateScore(counts: IllegalCharacter, scoring: IllegalCharacter) {
    let sum = 0;
    for (let key of Object.keys(counts)) {
        sum += scoring[key] * counts[key];
    }
    return sum;
}

function openingMatchesClosing(opening: any, closing: string) {
    const openingMatches = { "{": "}", "[": "]", "(": ")", "<": ">" };
    return openingMatches[opening] == closing;
}
