import { readFileSync } from "fs";

const input = readFileSync("./Day04/input.txt", "utf-8");
const cards = input.split("\n");

const numberRegex = /\d+/g;
const getCardId = (card: string) =>
  parseInt(card.split(":")[0].match(numberRegex)![0]);

let currentCardId = 1;
for (let i = 0; i < cards.length; i++) {
  const card = cards[i];

  const cardId = getCardId(card);
  if (cardId !== currentCardId) {
    currentCardId = cardId;
    console.log(cardId);
  }

  const numbers = card.split(":")[1];
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

  for (let j = 0; j < matches; j++) {
    const toAddCardId = cardId + 1 + j;
    const cardToAdd = cards.find(
      (card) => getCardId(card) === toAddCardId
    ) as string;
    if (!cardToAdd) continue;

    const indexOfPlacement = findLastIndex(toAddCardId) + 1;
    cards.splice(indexOfPlacement, 0, cardToAdd);
  }
}

function findLastIndex(cardId: number) {
  for (let i = cards.length - 1; i >= 0; i--) {
    const card = cards[i];
    if (getCardId(card) === cardId) return i;
  }
  return -1;
}

console.log(cards.length);
