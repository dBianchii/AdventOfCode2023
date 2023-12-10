import { readFileSync } from "fs";

const input = readFileSync("./Day06/input.txt", "utf-8");
const lines = input.split("\n");

const numberRegex = /\d+/g;
const times = lines[0].match(numberRegex)!.map((n) => Number(n));
const distanceRecords = lines[1].match(numberRegex)!.map((n) => Number(n));

const races = times.map((time, i) => ({
  time: time,
  distanceRecord: distanceRecords[i],
}));

const waysToWinPerRace: number[] = [];
for (const race of races) {
  let waysToWin = 0;
  for (let i = 0; i < race.time; i++) {
    const distanceTraveled = calculateDistanceTraveled(race.time, i);
    if (distanceTraveled > race.distanceRecord) waysToWin++;
  }
  waysToWinPerRace.push(waysToWin);
}
console.log(waysToWinPerRace.reduce((a, b) => a * b, 1));

function calculateDistanceTraveled(
  raceTime: number,
  timePressedButton: number
) {
  const totalTimeRacing = raceTime - timePressedButton;
  const mmPerMs = timePressedButton;
  const distanceTraveled = totalTimeRacing * mmPerMs;
  return distanceTraveled;
}
