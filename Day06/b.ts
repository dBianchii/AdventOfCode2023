import { readFileSync } from "fs";

const input = readFileSync("./Day06/input.txt", "utf-8");
const lines = input.split("\n");

const numberRegex = /\d+/g;
const time = Number(
  lines[0].match(numberRegex)!.reduce((a, b) => `${a}${b}`, "")
);
const distanceRecord = Number(
  lines[1].match(numberRegex)!.reduce((a, b) => `${a}${b}`, "")
);

const waysToWinPerRace: number[] = [];
let waysToWin = 0;
for (let i = 0; i < time; i++) {
  const distanceTraveled = calculateDistanceTraveled(time, i);
  if (distanceTraveled > distanceRecord) waysToWin++;
}
console.log(waysToWin);

function calculateDistanceTraveled(
  raceTime: number,
  timePressedButton: number
) {
  const totalTimeRacing = raceTime - timePressedButton;
  const mmPerMs = timePressedButton;
  const distanceTraveled = totalTimeRacing * mmPerMs;
  return distanceTraveled;
}
