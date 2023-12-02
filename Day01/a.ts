import { readFileSync } from "fs";

const input = readFileSync("./Day01/input.txt", "utf-8");

const lines = input.split("\n");

let sum = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  let firstNumber: null | string = null;
  let lastNumber: null | string = null;

  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    if (!isNaN(Number(char))) {
      if (!firstNumber) {
        firstNumber = char;
      }
      if (firstNumber) {
        lastNumber = char;
      }
    }
  }
  sum += Number(`${firstNumber}${lastNumber}`);
}
console.log(sum);
