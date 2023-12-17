import { readFileSync } from "fs";

const input = readFileSync("./Day07/input.txt", "utf-8");
const lines = input.split("\n");

const cardsInStrengthOrder = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];
cardsInStrengthOrder.reverse(); //so that the index is the strength

BubbleSortRanks(lines);

const set = lines.map((l) => {
  const parts = l.split(" ");
  return {
    hand: parts[0],
    bid: parseInt(parts[1]),
  };
});

let sum = 0;
for (let i = 0; i < set.length; i++) {
  const rank = i + 1;
  sum += rank * set[i].bid;
}
console.log(sum);

function BubbleSortRanks(lines: string[]) {
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines.length - i - 1; j++) {
      const hand = lines[j].split(" ")[0];
      const nextHand = lines[j + 1].split(" ")[0];
      if (isHand1StrongerThanHand2(hand, nextHand)) {
        const temp = lines[j];
        lines[j] = lines[j + 1];
        lines[j + 1] = temp;
      }
    }
  }
}

function isHand1StrongerThanHand2(hand1: string, hand2: string) {
  const hand1Power = getHandTypePower(hand1);
  const hand2Power = getHandTypePower(hand2);

  if (hand1Power > hand2Power) return true;
  if (hand1Power < hand2Power) return false;
  //if we're here theyre the same type.

  for (let i = 0; i < hand1.length; i++) {
    if (getCardPower(hand1[i]) > getCardPower(hand2[i])) return true;
    if (getCardPower(hand1[i]) < getCardPower(hand2[i])) return false;

    if (i === hand1.length - 1) return false; //if we're here theyre the same hand. Doesn't matter the order
  }
  throw new Error("Shouldn't be here");

  function getHandTypePower(hand: string) {
    const distinctCopies = getDistinctCopies(hand);

    if (distinctCopies.some((x) => x === hand.length)) return 6; //Five of a kind
    if (distinctCopies.some((x) => x === hand.length - 1)) return 5; //Four of a kind
    if (
      distinctCopies.some((x) => x === 3) &&
      distinctCopies.some((x) => x === 2)
    )
      return 4; //Full House
    if (distinctCopies.some((x) => x === 3)) return 3; //Three of a kind
    if (distinctCopies.some((x) => x === 2) && distinctCopies.length === 3)
      return 2; //Two pair
    if (distinctCopies.some((x) => x === 2)) return 1; //One pair
    return 0; //High card

    function getDistinctCopies(hand: string) {
      const numberOfCards: { [card: string]: number } = {};

      const cards = hand.split("");
      for (const card of cards)
        numberOfCards[card] = numberOfCards[card]
          ? (numberOfCards[card] += 1)
          : 1;

      return Object.values(numberOfCards);
    }
  }

  function getCardPower(card: string) {
    return cardsInStrengthOrder.findIndex((x) => x === card);
  }
}
