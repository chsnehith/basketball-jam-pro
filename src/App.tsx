import { useState, useEffect } from "react";
import "./App.css";

import { generateQuestion } from "./utils/generateQuestion";
import { calculatePoints } from "./utils/scoring";

function App() {
  const [question, setQuestion] = useState(generateQuestion());

  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);

  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);

  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver]);

  const handleAnswer = (answer: number) => {
    if (gameOver) return;

    if (answer === question.correctAnswer) {
      const newCombo = combo + 1;

      setCombo(newCombo);

      setScore((prev) => prev + calculatePoints(newCombo));

      setFeedback("🏀 SWISH!");
    } else {
      setCombo(0);

      setFeedback("❌ MISS!");
    }

    setTimeout(() => {
      setFeedback("");
    }, 1000);

    setQuestion(generateQuestion());
  };

  const getStreakMessage = () => {
    if (combo >= 10) return "🏀 UNSTOPPABLE!";
    if (combo >= 5) return "🔥 ON FIRE!";
    if (combo >= 3) return "🔥 HEATING UP!";

    return "";
  };

  if (gameOver) {
    return (
      <div className="game-over">
        <h1>🏆 GAME OVER</h1>

        <h2>Final Score: {score}</h2>

        <h2>Best Combo: {combo}</h2>

        <button
          className="play-again"
          onClick={() => window.location.reload()}
        >
          PLAY AGAIN
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="overlay">
        <h1 className="game-title">
          BASKETBALL <span className="orange">JAM PRO</span>
        </h1>

        <div className="hud">
          <div className="hud-card">
            🏆 Score: {score}
          </div>

          <div className="hud-card">
            🔥 Combo: x{combo}
          </div>

          <div className="hud-card">
            ⏱ {timeLeft}s
          </div>
        </div>

        <div className="question-card">
          <div className="question">
            {question.question}
          </div>
        </div>

        <div
          className={
            feedback === "🏀 SWISH!"
              ? "feedback-correct"
              : "feedback-wrong"
          }
        >
          {feedback}
        </div>

        <div className="answers">
          {question.options.map((option) => (
            <button
              key={option}
              className="answer-btn"
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="streak">
          {getStreakMessage()}
        </div>
      </div>
    </div>
  );
}

export default App;