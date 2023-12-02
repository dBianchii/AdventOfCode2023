import { readFileSync } from "fs";

const input = readFileSync("./Day01/input.txt", "utf-8");

const lines = input.split("\n");

const NUMBERSMAP = {
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
} as const;

const NUMBERSASWORDS = Object.keys(NUMBERSMAP);
const biggestWordLength = Math.max(...NUMBERSASWORDS.map((x) => x.length));

const FIRSTCHAROFNUMBERS = NUMBERSASWORDS.map((x) => x[0]);

let sum = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  let firstNumber: null | string = null;
  let lastNumber: null | string = null;

  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    //Do normal calculation if char is a number
    if (!isNaN(Number(char))) {
      if (!firstNumber) {
        firstNumber = char;
      }

      if (firstNumber) {
        lastNumber = char;
      }
      continue;
    }

    //Do calculation if we have a trailing number as a string
    if (FIRSTCHAROFNUMBERS.includes(char)) {
      const sliceOfStringFromCurrentCharUntilEndOfLine = line.slice(
        j,
        line.length
      );
      const possibleNumber = getFirstPossibleNumberFromStringSlice(
        sliceOfStringFromCurrentCharUntilEndOfLine
      );

      if (possibleNumber) {
        if (!firstNumber) {
          firstNumber = possibleNumber;
        }
        if (firstNumber) {
          lastNumber = possibleNumber;
        }
      }
    }
  }
  sum += Number(`${firstNumber}${lastNumber}`);
}

function getFirstPossibleNumberFromStringSlice(sliceOfString: string) {
  for (let i = 0; i < sliceOfString.length; i++) {
    const smallerSlice = sliceOfString.slice(0, i + 1);

    const possibleNumberWord = NUMBERSASWORDS.find((x) => x === smallerSlice);
    if (possibleNumberWord) {
      return NUMBERSMAP[possibleNumberWord];
    }
  }
}

console.log(sum);
