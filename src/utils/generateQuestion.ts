import type { Question } from "../types/Question";
import { shuffleArray } from "./shuffleArray";

export const generateQuestion = (): Question => {
  const operators = ["+", "-", "×"];

  const operator =
    operators[Math.floor(Math.random() * operators.length)];

  let num1 = 0;
  let num2 = 0;
  let correctAnswer = 0;

  switch (operator) {
    case "+":
      num1 = Math.floor(Math.random() * 20) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
      correctAnswer = num1 + num2;
      break;

    case "-":
      num1 = Math.floor(Math.random() * 20) + 10;
      num2 = Math.floor(Math.random() * 10) + 1;
      correctAnswer = num1 - num2;
      break;

    case "×":
      num1 = Math.floor(Math.random() * 12) + 1;
      num2 = Math.floor(Math.random() * 12) + 1;
      correctAnswer = num1 * num2;
      break;
  }

  const wrongAnswers = new Set<number>();

  while (wrongAnswers.size < 3) {
    const variation =
      Math.floor(Math.random() * 10) + 1;

    const wrong =
      Math.random() > 0.5
        ? correctAnswer + variation
        : correctAnswer - variation;

    if (wrong > 0 && wrong !== correctAnswer) {
      wrongAnswers.add(wrong);
    }
  }

  const options = shuffleArray([
    correctAnswer,
    ...Array.from(wrongAnswers),
  ]);

  return {
    question: `${num1} ${operator} ${num2}`,
    correctAnswer,
    options,
  };
};