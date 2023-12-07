import { readFileSync } from "fs";

const input = readFileSync("./Day05/input.txt", "utf-8");
const lines = input.split("\n");

const temp = lines[0].trim().split(" ");
temp.shift();
const seeds = temp.map((x) => parseInt(x));

let maps = getSequentialMaps(lines);

//Sort the maps by sourceRangeStart order
maps = maps.map((m) =>
  m.sort((a, b) => a.sourceRangeStart - b.sourceRangeStart)
);

for (let seed of seeds) {
  let value = seed;

  for (let i = 0; i < maps.length; i++) {
    const map = maps[i];
    const firstInstruction = map[0];
    const lastInstruction = map[map.length - 1];

    if (
      value < firstInstruction.sourceRangeStart ||
      value > lastInstruction.sourceRangeStart + lastInstruction.rangeLength
    )
      continue;

    for (const instruction of map) {
      const sourceStart = instruction.sourceRangeStart;
      const sourceEnd = sourceStart + instruction.rangeLength;

      const destinationStart = instruction.destinationRangeStart;
      const destinationEnd = destinationStart + instruction.rangeLength;

      if (value >= sourceStart && value <= sourceEnd) {
        const relativeValue = value - sourceStart;
        value = destinationStart + relativeValue;
      }
    }
  }
  seed = value;
}

const lowest = Math.max(...seeds);
console.log(lowest);

function getSequentialMaps(lines: string[]) {
  type Instruction = {
    destinationRangeStart: number;
    sourceRangeStart: number;
    rangeLength: number;
  };
  type Map = Instruction[];

  const maps: Map[] = [];
  let instructions: Instruction[] = [];

  lines.shift();
  lines.shift();
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.includes("map")) continue;

    if (line.length === 0 || i === lines.length - 1) {
      maps.push(instructions);
      instructions = [];
      continue;
    }

    const values = line.split(" ").map((n) => parseInt(n));

    instructions.push({
      destinationRangeStart: values[0],
      sourceRangeStart: values[1],
      rangeLength: values[2],
    });
  }

  return maps;
}
