import { readFileSync } from "fs";

const input = readFileSync("./Day05/input.txt", "utf-8");
const lines = input.split("\n");

const temp = lines[0].trim().split(" ");
temp.shift();
const seedInfo = temp.map((x) => parseInt(x));
const seedsRange: {
  start: number;
  length: number;
}[] = [];
for (let i = 0; i < seedInfo.length - 1; i += 2) {
  seedsRange.push({ start: seedInfo[i], length: seedInfo[i + 1] });
}

let maps = getSequentialMaps(lines);

//Sort the maps by sourceRangeStart order
maps = maps.map((m) =>
  m.sort((a, b) => a.sourceRangeStart - b.sourceRangeStart)
);

const seeds: number[] = [];
for (let i = 0; i < seedsRange.length; i++) {
  const range = seedsRange[i];
  for (let j = range.start; j < range.start + range.length; j++) {
    seeds.push(j);
  }
}
const uniqueSeeds = Array.from(new Set(seeds));

for (let p = 0; p < uniqueSeeds.length; p++) {
  let value = uniqueSeeds[p];

  for (let j = 0; j < maps.length; j++) {
    const map = maps[j];
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
      if (value === sourceEnd) continue; //The next instruction takes priority apparently
      if (value >= sourceStart && value <= sourceEnd) {
        const relativeValue = value - sourceStart;
        const newValue = destinationStart + relativeValue;
        value = newValue;
        break;
      }
    }
  }
  uniqueSeeds[p] = value;
}

const lowest = Math.min(...uniqueSeeds);
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
