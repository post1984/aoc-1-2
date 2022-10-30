import { readlines, stepPolymer, countCharactersInTemplate } from "./part1";

export function part2(filename: string) {
  const NUM_STEPS = 40;
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
