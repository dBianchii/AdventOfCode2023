import { readFileSync } from "fs";

const input = readFileSync("./Day04/input.txt", "utf-8");
const lines = input.split("\n");

let score = 0;
for (const line of lines) {
  const numbers = line.split(":")[1];

  const winningNumbers = numbers
    .split(" | ")[0]
    .trim()
    .split(" ")
    .map((n) => parseInt(n))
    .filter((n) => isNaN(n) === false);

  const myNumbers = numbers
    .split(" | ")[1]
    .trim()
    .split(" ")
    .map((n) => parseInt(n))
    .filter((n) => isNaN(n) === false);

  let matches = 0;
  for (const number of myNumbers)
    if (winningNumbers.includes(number)) matches++;

  score += Math.pow(2, matches - 1);
}
console.log(score);
