import { readFileSync } from "fs";

const input = readFileSync("./Day03/input.txt", "utf-8");

const lines = input.split("\n");
const NOTSYMOBLS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const isASymbol = (char: string) => !NOTSYMOBLS.includes(char);
const isANumber = (char: string) => !isNaN(Number(char));

type Coordinate = {
  x: number;
  y: number;
};
const includedNumberCoords: Coordinate[] = [];
function isAlreadyInludedCoordinate(coord: Coordinate) {
  return includedNumberCoords.some(
    (element) => element.x === coord.x && element.y === coord.y
  );
}

const map = constructMap(lines);
let sum = 0;
for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    const char = map[y][x];

    if (isASymbol(char)) {
      const numbers = ExtractNumbers({ x, y });
      sum += numbers.reduce((acc, curr) => acc + curr, 0);
    }
  }
}
console.log(sum);

function constructMap(lines: string[]) {
  const map: string[][] = [];
  for (const line of lines) {
    map.push(line.split(""));
  }
  return map;
}

function ExtractNumbers(coord: Coordinate) {
  let topLeft: number | undefined;
  let top: number | undefined;
  let topRight: number | undefined;
  let left: number | undefined;
  let right: number | undefined;
  let bottomLeft: number | undefined;
  let bottom: number | undefined;
  let bottomRight: number | undefined;

  topLeft = GetNumsFromCoord({
    x: coord.x - 1,
    y: coord.y - 1,
  });
  top = GetNumsFromCoord({ x: coord.x, y: coord.y - 1 });
  topRight = GetNumsFromCoord({ x: coord.x + 1, y: coord.y - 1 });
  left = GetNumsFromCoord({ x: coord.x - 1, y: coord.y });
  right = GetNumsFromCoord({ x: coord.x + 1, y: coord.y });
  bottomLeft = GetNumsFromCoord({ x: coord.x - 1, y: coord.y + 1 });
  bottom = GetNumsFromCoord({ x: coord.x, y: coord.y + 1 });
  bottomRight = GetNumsFromCoord({ x: coord.x + 1, y: coord.y + 1 });

  return [
    topLeft,
    top,
    topRight,
    left,
    right,
    bottomLeft,
    bottom,
    bottomRight,
  ].filter((num) => num !== undefined) as number[];
}

function GetNumsFromCoord(searchCoord: Coordinate) {
  let numbers = "";

  if (!isANumber(map[searchCoord.y][searchCoord.x])) {
    return;
  }
  if (isAlreadyInludedCoordinate(searchCoord)) {
    return;
  }
  //This is a number, and it has not been included yet.
  includedNumberCoords.push(searchCoord);

  //Let's look horizontally for start and end Coords
  let leftCoord = searchCoord;
  let rightCoord = searchCoord;

  let tempCoord = searchCoord;
  while (true) {
    tempCoord = { ...tempCoord, x: tempCoord.x - 1 };
    if (isANumber(map[tempCoord.y][tempCoord.x])) leftCoord = tempCoord;
    else break;
  }

  tempCoord = searchCoord;
  while (true) {
    tempCoord = { ...tempCoord, x: tempCoord.x + 1 };
    if (isANumber(map[tempCoord.y][tempCoord.x])) rightCoord = tempCoord;
    else break;
  }

  //Now we have the start and end coords, let's get the numbers and include them.
  for (let x = leftCoord.x; x <= rightCoord.x; x++) {
    numbers += map[searchCoord.y][x];
    includedNumberCoords.push({ x, y: searchCoord.y });
  }

  return Number(numbers);
}
