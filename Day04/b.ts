import { readFileSync } from "fs";

const input = readFileSync("./Day04/input.txt", "utf-8");
const cards = input.split("\n");

const numberRegex = /\d+/g;
const getCardId = (card: string) =>
  parseInt(card.split(":")[0].match(numberRegex)![0]);

const totalInstancesOfCardId = new Map<number, number>();
for (let i = 0; i < cards.length; i++) totalInstancesOfCardId.set(i + 1, 1);

const lastCardId = getCardId(cards[cards.length - 1]);
for (let i = 0; i < cards.length; i++) {
  const card = cards[i];
  const cardId = getCardId(card);

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

  const numOfCardsToAdd = totalInstancesOfCardId.get(cardId) ?? 0;
  for (let j = 0; j < matches; j++) {
    const toCountCardId = cardId + 1 + j;
    if (toCountCardId > lastCardId) break;

    totalInstancesOfCardId.set(
      toCountCardId,
      totalInstancesOfCardId.get(toCountCardId)! + numOfCardsToAdd
    );
  }
}

//get number of cards by using the total instances of each card id
let totalCards = Array.from(totalInstancesOfCardId.values()).reduce(
  (a, b) => a + b,
  0
);
console.log(totalCards);
