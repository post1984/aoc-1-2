import { newFlag, parseFlags } from "./flags";

type DayImport = {
  part1: (filename: String) => void;
  part2: (filename: String) => void;
};

if (process.argv.length === 1) {
  console.error("Expected flags: (d)ay, (p)art");
} else {
  newFlag("d", { usage: "-d <dayNum>", required: true });
  newFlag("p", { usage: "-p <partNum>", required: true });
  newFlag("f", { usage: "-f <filepath>", required: true });

  const flagMap = parseFlags();
  const day = flagMap.get("d");
  const part = flagMap.get("p");
  const filename = flagMap.get("f");

  import(`./day${day}`)
    .then((dayImport: DayImport) => {
      console.log(`Running Day ${day}, Part ${part} against file ${filename}`);
      if (part === "1") {
        dayImport.part1(filename);
      } else if (part === "2") {
        dayImport.part2(filename);
      } else {
        console.error(`Part number not recognized. Exiting.`);
        process.exit(1);
      }
    })
    .catch((err) => console.error(err));
}
