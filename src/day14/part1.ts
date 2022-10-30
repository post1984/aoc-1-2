import fs from "fs";

type Polymer = {
  pairCounts: Map<string, number>;
  mapping: Map<string, string[]>;
};

function getPairCounts(template: string): Map<string, number> {
  let pairCounts = new Map<string, number>();
  for (let i = 0; i < template.length - 1; i++) {
    const slice = template.slice(i, i + 2);
    if (!pairCounts.has(slice)) {
      pairCounts.set(slice, 0);
    }
    pairCounts.set(slice, pairCounts.get(slice) + 1);
  }
  return pairCounts;
}

export function readlines(filename: string): Polymer {
  const lines = fs
    .readFileSync(filename, { encoding: "utf8" })
    .split(/\r?\n/)
    .filter(Boolean);
  const pairCounts = getPairCounts(lines.shift());

  const mapping = new Map<string, string[]>();
  lines.forEach((line) => {
    const [pair, inserted] = line.split(/ -> /).map((s) => s.trim());
    if (mapping[pair]) {
      console.log(
        `pair already exists mapping["${pair}"]="${mapping[pair]}, while trying to insert "${inserted}""`
      );
    }
    mapping.set(pair, [`${pair[0]}${inserted}`, `${inserted}${pair[1]}`]);
  });

  return {
    pairCounts: pairCounts,
    mapping: mapping,
  };
}

// inplace update of polymer
export function stepPolymer(polymer: Polymer) {
  const nextPairCounts = new Map<string, number>();
  for (const [pair, count] of polymer.pairCounts.entries()) {
    for (const pairing of polymer.mapping.get(pair)) {
      if (!nextPairCounts.has(pairing)) {
        nextPairCounts.set(pairing, 0);
      }
      nextPairCounts.set(pairing, nextPairCounts.get(pairing) + count);
    }
  }
  polymer.pairCounts = nextPairCounts;
}

export function countCharactersInTemplate(pairCounts: Map<string, number>) {
  const charCounts = new Map<string, number>();
  for (const [pair, count] of pairCounts) {
    for (const ch of pair) {
      if (!charCounts.has(ch)) {
        charCounts.set(ch, 0);
      }
      charCounts.set(ch, charCounts.get(ch) + count);
    }
  }
  // all characters that are not on the ends are double counted when referring to the template string.
  // Divide through by 2
  for (const [pair, count] of charCounts) {
	charCounts.set(pair, Math.ceil(count / 2.0));
  }
  return charCounts;
}

export function part1(filename: string) {
  const NUM_STEPS = 10;
  const polymer = readlines(filename);
  for (let i = 0; i < NUM_STEPS; i++) {
    stepPolymer(polymer);
  }
  const characterCounts = countCharactersInTemplate(polymer.pairCounts);
  const max = Math.max(...characterCounts.values());
  const min = Math.min(...characterCounts.values());
  console.log(`max: ${max}, min: ${min}`);
  console.log(`max - min: ${max - min}`);
}
