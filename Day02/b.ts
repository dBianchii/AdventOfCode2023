import { readFileSync } from "fs";

const input = readFileSync("./Day02/input.txt", "utf-8");
const lines = input.split("\n");

let sum = 0;
for (let i = 0; i < lines.length; i++) {
  const currGameId = i + 1;

  const gameInfo = getGameInfo(lines[i], currGameId);
  //Defaults to 1 for multiplication purposes
  const maximumRed = Math.max(...gameInfo.map((round) => round.red || 1));
  const maximumGreen = Math.max(...gameInfo.map((round) => round.green || 1));
  const maximumBlue = Math.max(...gameInfo.map((round) => round.blue || 1));

  const power = maximumRed * maximumGreen * maximumBlue;
  sum += power;
}
console.log(sum);

//----     FUNCTIONS    ----//
type Round = {
  red?: number;
  green?: number;
  blue?: number;
};

type GameInfo = Round[];

function getGameInfo(line: string, gameId: number) {
  const regex = new RegExp(`Game ${gameId}: (.*?)(?=Game \\d|$)`, "s");
  const match = line.match(regex);

  const restOfString = match![1].trim();
  const rounds = restOfString.split(";").map((round) => round.trim());

  const gameInfo: GameInfo = [];

  let obj = {};
  for (const round of rounds) {
    const parts = round.split(", ");
    for (const part of parts) {
      const subParts = part.split(" ");
      const color = subParts[1];
      const number = parseInt(subParts[0]);

      obj = { ...obj, [color]: number };
    }
    obj && gameInfo.push(obj);
  }

  return gameInfo;
}
