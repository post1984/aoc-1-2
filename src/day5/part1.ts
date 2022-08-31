const fs = require("fs");

export function readlines(filename: string): number[][] {
    return fs.readFileSync(filename, "utf8").toString()
        .split(/\r?\n/)
        .filter(Boolean)
        .map((s: string) => s.split(/\s*->\s*/)
            .flatMap(p => p.split(/,/).map(p => parseInt(p, 10))));
}

export function prepareGrid(points: number[][]): number[][] {
    let maxX: number = 0, maxY: number = 0;
    for (const [x1, y1, x2, y2] of points) {
        maxX = Math.max(x1, x2, maxX);
        maxY = Math.max(y1, y2, maxY);
    }
    return Array.apply(null, Array(maxY+1)).map(() => Array.apply(null, Array(maxX+1)).map(() => 0));
}

function getGridRepresentation(grid: number[][]): string {
    return grid.map(row => row.join("").replace(/NaN/g, "?").replace(/0/g, ".")).join("\n");
}

export function part1(filename: string) {
    let points = readlines(filename);
    points = points.filter(([x1, y1, x2, y2]) => x1 == x2 || y1 == y2);
    let grid = prepareGrid(points);
    for (const [x1, y1, x2, y2] of points) {
        let currentX = x1, currentY = y1;
        do {
            grid[currentY][currentX]++;
            currentX = currentX + (currentX < x2 ? 1 : currentX > x2 ? -1 : 0);
            currentY = currentY + (currentY < y2 ? 1 : currentY > y2 ? -1 : 0);
        } while (currentX != x2 || currentY != y2);
        grid[y2][x2]++;
    }
    console.log(grid.flatMap(g => g.filter(v => v > 1)).length)
}