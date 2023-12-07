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

for (let i = 0; i < seeds.length; i++) {
  let value = seeds[i];

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
  seeds[i] = value;
}

const lowest = Math.min(...seeds);
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
