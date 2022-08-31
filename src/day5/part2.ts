const fs = require("fs");
const { prepareGrid, readlines } = require("./part1");

export function part2(filename: string) {
    let points = readlines(filename);
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