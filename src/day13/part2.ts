import { readlines, stepInput, printGraph } from "../day13";

export function part2(filename: string) {
  const input = readlines(filename);
  while (input.instructions.length) {
    stepInput(input);
  }
  printGraph(input);
}
