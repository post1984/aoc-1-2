import { readlines, IllegalCharacter } from "./part1"

export function part2(filename: string) {
    let scores = [];
    for (let line of readlines(filename)) {
        let stack = findErrorStack(line).reverse();
        if (stack.length) {
            let stackScore = calculateScore(stack);
            scores.push(stackScore);
        }
    }
    scores.sort((a, b) => a - b);
    console.log(scores[Math.floor(scores.length / 2)]);
}

function findErrorStack(s: string): string[] {
    const closings = ")]>}";
    let stack = [];
    for (let ch of s) {
        if (closings.includes(ch)) {
            let opening = stack.pop();
            if (!openingMatchesClosing(opening, ch)) {
                return [];
            }
        } else {
            stack.push(ch);
        }
    }
    return stack;
}

function openingMatchesClosing(opening: any, closing: string) {
    const openingMatches = { "{": "}", "[": "]", "(": ")", "<": ">" };
    return openingMatches[opening] == closing;
}

function calculateScore(unmatchedOpeningCharacters: string[]): number {
    const openingMatches = { "{": "}", "[": "]", "(": ")", "<": ">" };
    const scoring: IllegalCharacter = {
        ")": 1,
        "]": 2,
        "}": 3,
        ">": 4
    }

    let sum = 0;
    for (let ch of unmatchedOpeningCharacters) {
        sum *= 5;
        sum += scoring[openingMatches[ch]];
    }
    return sum;
}