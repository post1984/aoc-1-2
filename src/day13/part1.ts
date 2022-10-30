import fs from "fs";

type Point = {
  x: number;
  y: number;
};

type Axis = {
  axis: string;
  index: number;
};

type Input = {
  points: Array<Point>;
  instructions: Array<Axis>;
};

export function readlines(filename: string): Input {
  const input: Input = {
    points: [],
    instructions: [],
  };
  fs.readFileSync(filename, { encoding: "utf8" })
    .split(/\r?\n/)
    .filter(Boolean)
    .forEach((line: String) => {
      if (line.includes(",")) {
        // refers to a point
        const [x, y] = line.split(/,/);
        input.points.push({
          x: parseInt(x),
          y: parseInt(y),
        });
      } else if (line.includes("=")) {
        // refers to an instruction
        line = line.replace("fold along ", "");
        const [axis, index] = line.split(/=/);
        input.instructions.push({
          axis: axis,
          index: parseInt(index),
        });
      } else {
        console.error(`unhandled line: "${line}"`);
      }
    });
  return input;
}

export function printGraph(input: Input) {
  // find the area that the points reference, minX minY maxX maxY
  const xs = input.points.map((p) => p.x);
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);

  const ys = input.points.map((p) => p.y);
  const yMin = Math.min(...ys);
  const yMax = Math.max(...ys);

  // if < 0, shift minX/Y forward
  let xOffset = 0;
  if (xMin < 0) {
    xOffset -= xMin;
  }
  let yOffset = 0;
  if (yMin < 0) {
    yOffset -= yMin;
  }

  const graph = Array.apply(null, Array(yMax + yOffset + 1)).map(() =>
    Array.apply(null, Array(xMax + xOffset + 1)).fill(".")
  );
  for (let point of input.points) {
    graph[point.y + yOffset][point.x + xOffset] = "#";
  }

  console.log(
    `${JSON.stringify(input.instructions[0])}\tnumPoints: ${
      input.points.length
    }`
  );
  console.log(
    JSON.stringify(graph)
      .replace(/]/g, "\n")
      .replace(/[\[|"|,]/g, "")
  );
}

export function stepInput(input: Input) {
  // update the input in place.
  const instruction = input.instructions.shift();
  const index = instruction.index;
  const axis = instruction.axis;
  // reflect all remaining points that are above `index` across the same axis
  // remove any duplicates by recounting where all the points landed
  const counts: Set<number>[] = [];
  input.points.forEach((p) => {
    if (p[axis] > index) {
      p[axis] = index * 2 - p[axis];
    }

    let x = p.x;
    if (!counts[x]) {
      counts[x] = new Set<number>();
    }
    counts[x].add(p.y);
  });
  // readd all unique points
  input.points = [];
  for (let x in counts) {
    for (let y of counts[x]) {
      input.points.push({ x: parseInt(x), y: y });
    }
  }
}

export function part1(filename: string) {
  const input = readlines(filename);
  stepInput(input);
  console.log(
    `${JSON.stringify(input.instructions[0])}\tnumPoints: ${
      input.points.length
    }`
  );
}
