import fs, { read } from "fs";

// stores the sorted character representation of each digit
interface SevenSegmentDigits {
    zero: string
    one: string
    two: string
    three: string
    four: string
    five: string
    six: string
    seven: string
    eight: string
    nine: string
}

export function readlines(filename: string): string[][][] {
    // split newlines. remove empty lines
    return fs.readFileSync(filename, { encoding: "utf8" }).split(/\r?\n/).filter(Boolean)
        // split delimiter "|", left side are the possible segments, right side is the current display 
        .map(s =>
            s.split(" | ").map(s0 =>
                s0.split(/ /g).map(s1 => Array.from(s1).sort().join(""))
            )
        );
}

export function part1(filename: string) {
    // GOAL: count all interesting
    const simpleValues = [1, 4, 7, 8];
    // initialize sets that contain all possibilities.
    let lines = readlines(filename);
    let simpleCounted = 0;
    for (let [possibilities, display] of lines) {
        // sort by length and lexicographically
        possibilities = possibilities.sort((a, b) => Math.abs(b.localeCompare(a))).sort((a, b) => a.length - b.length);
        let displayValues = readDisplay(possibilities, display);
        for (let dVal of displayValues) {
            if (simpleValues.includes(dVal)) {
                simpleCounted++;
            }
        }
    }
    console.log(simpleCounted);
}

export function readDisplay(possibilities: string[], display: string[]): number[] {
    let segmentPossibilities: SevenSegmentDigits = generateSegmentMapping(possibilities);

    let segmentNumber = {};
    segmentNumber[segmentPossibilities.zero] = 0;
    segmentNumber[segmentPossibilities.one] = 1;
    segmentNumber[segmentPossibilities.two] = 2;
    segmentNumber[segmentPossibilities.three] = 3;
    segmentNumber[segmentPossibilities.four] = 4;
    segmentNumber[segmentPossibilities.five] = 5;
    segmentNumber[segmentPossibilities.six] = 6;
    segmentNumber[segmentPossibilities.seven] = 7;
    segmentNumber[segmentPossibilities.eight] = 8;
    segmentNumber[segmentPossibilities.nine] = 9;

    let mapping = display.map(d => {
        if (d in segmentNumber) {
            return segmentNumber[d]
        } else {
            console.error("Missing key:", d, Object.keys(segmentPossibilities).map(k => `${k}: ${segmentPossibilities[k]}`).join(", "));
            return Number.NEGATIVE_INFINITY;
        }
    });

    return mapping;
}

function generateSegmentMapping(possibilities: string[]): SevenSegmentDigits {
    let ssd: SevenSegmentDigits = {
        zero: "", one: "", two: "", three: "", four: "",
        five: "", six: "", seven: "", eight: "", nine: ""
    };
    for (let s of possibilities) {
        // possibilities is sorted by length, these should occur in order
        switch (s.length) {
            case 2: // always 1
                ssd.one = s;
                break;
            case 3: // always 7
                ssd.seven = s;
                break;
            case 4: // always 4
                ssd.four = s;
                break;
            case 5: // always one of 2, 3, 5
                if (stringIntersect(s, ssd.one).length === 2) {
                    ssd.three = s;
                }
                break;
            case 7: // always 8
                ssd.eight = s;
                break;
            default:
                break;
        }
    }
    // 13478 defined, missing 02569. Find available segments and construct them from scratch
    let topLeft = stringDifference(ssd.four, ssd.three);
    let center = stringDifference(ssd.four, ssd.one, topLeft);
    let bottomLeft = stringDifference(ssd.eight, ssd.three, topLeft);

    // missing 02569
    ssd.zero = stringDifference(ssd.eight, center);
    ssd.nine = stringUnion(ssd.three, topLeft);
    ssd.two = possibilities.filter(p => p.length === 5 && stringIntersect(p, bottomLeft).length === 1)[0];
    ssd.five = possibilities.filter(p => p.length === 5 && stringIntersect(p, topLeft).length === 1)[0];
    ssd.six = possibilities.filter(p => p.length === 6 && stringIntersect(p, ssd.one).length === 1)[0];

    return ssd;
}

function stringIntersect(a: string, ...intersects: string[]): string {
    let result = a;
    for (let ch of a) {
        if (intersects.filter(s => !s.includes(ch)).length > 0) {
            result = result.replace(ch, "");
        }
    }
    return Array.from(result).sort().join("");
}

function stringDifference(a: string, ...differences: string[]): string {
    let result = a;
    for (let diff of differences) {
        for (let ch of diff) {
            result = result.replace(ch, "");
        }
    }
    return Array.from(result).sort().join("");
}

function stringUnion(a: string, ...unions: string[]): string {
    let characterSet = new Set<string>();
    for (let ch of a) {
        characterSet.add(ch);
    }
    for (let s of unions) {
        for (let ch of s) {
            characterSet.add(ch);
        }
    }
    return Array.from(characterSet).sort().join("");
}