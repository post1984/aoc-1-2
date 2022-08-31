import { newFlag, parseFlags } from "./flags/flags";
import { part1 as day1_1, part2 as day1_2 } from "./day1";
import { part1 as day2_1, part2 as day2_2 } from "./day2";
import { part1 as day3_1, part2 as day3_2 } from "./day3";
import { part1 as day4_1, part2 as day4_2 } from "./day4";
import { part1 as day5_1, part2 as day5_2 } from "./day5";

if (process.argv.length === 1) {
    console.error("Expected flags: (d)ay, (p)art");
} else {
    newFlag("d", { usage: "-d <dayNum>", required: true });
    newFlag("p", { usage: "-p <partNum>", required: true });
    newFlag("f", { usage: "-f <filepath>", required: true });
    let flagMap = parseFlags();
    switch (flagMap.get("d")) {
        case "1":
            switchPart(flagMap.get("p"), flagMap.get("f"), day1_1, day1_2);
            break;
        case "2":
            switchPart(flagMap.get("p"), flagMap.get("f"), day2_1, day2_2);
            break;
        case "3":
            switchPart(flagMap.get("p"), flagMap.get("f"), day3_1, day3_2);
            break;
        case "4":
            switchPart(flagMap.get("p"), flagMap.get("f"), day4_1, day4_2);
            break;
        case "5":
            switchPart(flagMap.get("p"), flagMap.get("f"), day5_1, day5_2);
            break;
        default:
            console.error(`unhandled day number ${flagMap.get("d")}`);
    }
}

function switchPart(part: string, filename: string, part1: Function, part2: Function) {
    if (part === "1") {
        part1(filename);
    } else if (part === "2") {
        part2(filename);
    } else {
        console.error(`unhandled part number ${part}`);
    }
}