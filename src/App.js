import React, { useState } from "react";
import Dice from "react-dice-roll";

// Board image in public folder
const boardImage = "/torahpoly_board.png";

// Sample Bereshit Card
const bereshitCard = {
  name: "Bereshit",
  questions: [
    {
      question: "What day was Adam born?",
      answer: "The 6th day",
      points: 20,
    },
    {
      question: "What day was not 'good' but 'very' good?",
      answer: "The 6th day",
      points: 20,
    },
    {
      question: "Where do we see adding is sometimes subtracting?",
      answer:
        "Adam added 'don't touch' the tree. The snake used this to fool Chava.",
      points: 20,
    },
  ],
};

// Har HaBayit Card
const harHaBayitCard = {
  name: "Har HaBayit",
  questions: [
    {
      question: 'Which items were housed in the Kodesh ("holy") chamber?',
      answer: "The showbread table, menorah, and incense altar",
      points: 300,
    },
    {
      question:
        "What is the OJ associated with the Omer, the Two Loaves and the Lechem Hapanim?",
      answer: `That never was a disqualifying defect found in any of these 3 holy offerings. Explanation: 
a. The Omer, the barley offering brought on the 16th of Nissan, released the new crop for eating if a defect occurred, they wouldn't be able to bring the offering on that day and the new crop would have remained forbidden for the entire year!
b. If there was a defect in the Two Loaves brought on Shavuos, we would have been unable to bring this offering, and would then have been unable to use the new wheat crop for minchah on the mizbe'ach.
c. If a defect were found on the 12 loaves of the Lechem HaPanim that were baked before Shabbos, no new loaves would have been able to be set on the Shulchan until the following week.`,
      points: 600,
    },
  ],
};

// Mazal Card
const mazalCard = {
  name: "Mazal",
  text: `You had a dream of buried treasure in a far-off city. You travelled there and found the spot and began digging. A policeman stopped you, and after you explained the story, he said he had the same dream of a treasure buried under the floorboards of a tailor shop. You realized that he was describing your own house. You dropped the shovel and ran home to discover the treasure buried under your own bed.`,
  reward: 1000,
  rewardType: "money", // could also be "zchut"
};

function CardQA({ card, onFinish }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [accepted, setAccepted] = useState(
    Array(card.questions ? card.questions.length : 0).fill(false)
  );

  const isMazal = card.name === "Mazal";

  const toggleAnswer = () => setShowAnswer((v) => !v);

  const acceptCorrect = () => {
    setAccepted((prev) => {
      const copy = [...prev];
      copy[currentQ] = true;
      return copy;
    });
  };

  const prevQuestion = () => {
    setShowAnswer(false);
    setCurrentQ((i) => (i > 0 ? i - 1 : i));
  };

  const nextQuestion = () => {
    setShowAnswer(false);
    setCurrentQ((i) => (i < card.questions.length - 1 ? i + 1 : i));
  };

  const totalPoints = accepted.reduce(
    (sum, val, i) => (val ? sum + card.questions[i].points : sum),
    0
  );

  const allCorrect = accepted.every((val) => val === true);

  return (
    <div style={styles.qaContainer}>
      <h2>{card.name} Card</h2>

      {isMazal ? (
        <>
          <p style={{ fontWeight: "bold", whiteSpace: "pre-wrap" }}>{card.text}</p>
          {!showAnswer ? (
            <button onClick={toggleAnswer} style={styles.button}>
              Reveal Mazal
            </button>
          ) : (
            <p style={{ color: "green", fontWeight: "bold" }}>
              {card.rewardType === "money"
                ? `You won $${card.reward}!`
                : `You gained ${card.reward} Zchut points!`}
            </p>
          )}

          <button
            onClick={() => onFinish(true, card.reward, card.rewardType)}
            style={{ ...styles.button, marginTop: 20 }}
          >
            Close
          </button>
        </>
      ) : (
        <>
          <p>
            Question {currentQ + 1} of {card.questions.length}
          </p>
          <div style={styles.questionBox}>
            <p style={{ fontWeight: "bold" }}>
              {card.questions[currentQ].question}
            </p>
            {showAnswer ? (
              <p style={styles.answer}>{card.questions[currentQ].answer}</p>
            ) : (
              <button onClick={toggleAnswer} style={styles.button}>
                Reveal Answer
              </button>
            )}
          </div>
          <div style={{ marginTop: 10 }}>
            <button
              onClick={prevQuestion}
              disabled={currentQ === 0}
              style={styles.button}
            >
              Previous Question
            </button>
            <button
              onClick={nextQuestion}
              disabled={currentQ === card.questions.length - 1}
              style={{ ...styles.button, marginLeft: 10 }}
            >
              Next Question
            </button>
          </div>

          <div style={{ marginTop: 20 }}>
            {!accepted[currentQ] && showAnswer && (
              <button onClick={acceptCorrect} style={styles.acceptButton}>
                Accept Correct (Add {card.questions[currentQ].points} Zchut)
              </button>
            )}
            {accepted[currentQ] && (
              <p style={{ color: "green", fontWeight: "bold" }}>
                Accepted Correct ✔
              </p>
            )}
          </div>

          <div style={{ marginTop: 30 }}>
            <p>
              Total Zchut Points Earned: <strong>{totalPoints}</strong>
            </p>

            {allCorrect ? (
              <p style={{ color: "blue", fontWeight: "bold" }}>
                All questions answered correctly! You can proceed to the next
                card.
              </p>
            ) : (
              <p>You can finish now with current points or continue answering.</p>
            )}
          </div>

          <button
            onClick={() => onFinish(allCorrect, totalPoints, "zchut")}
            style={{ ...styles.button, marginTop: 20 }}
          >
            Finish Q&A
          </button>
        </>
      )}
    </div>
  );
}

function App() {
  const [boardRotation, setBoardRotation] = useState(0);
  const [playerPosition, setPlayerPosition] = useState(0);
  const [turnCount, setTurnCount] = useState(1);
  const [playerName, setPlayerName] = useState("");
  const [qaMode, setQaMode] = useState(false);
  const [zchutPoints, setZchutPoints] = useState(0);
  const [money, setMoney] = useState(0);
  const [currentCard, setCurrentCard] = useState(null);

  const rotateBoard = () => {
    setBoardRotation((prev) => (prev + 90) % 360);
  };

  const startQA = (card) => {
    setCurrentCard(card);
    setQaMode(true);
  };

  const finishQA = (allCorrect, points, rewardType = "zchut") => {
    setQaMode(false);
    if (rewardType === "zchut") {
      setZchutPoints((prev) => prev + points);
    } else if (rewardType === "money") {
      setMoney((prev) => prev + points);
    }
    setCurrentCard(null);
  };

  const endTurn = () => {
    setTurnCount((prev) => prev + 1);
  };

  return (
    <div style={styles.container}>
      <h1>TorahPoly Monopoly Game</h1>

      {!qaMode && (
        <>
          <div style={{ marginBottom: 20 }}>
            <label>
              Enter Player Name:{" "}
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                style={styles.input}
                placeholder="Your Name"
              />
            </label>
            {playerName && (
              <p>
                Player: <strong>{playerName}</strong>
              </p>
            )}
          </div>

          {/* ROTATING BOARD */}
          <div
            style={{
              position: "relative",
              display: "inline-block",
              marginBottom: 20,
              transform: `rotate(${boardRotation}deg)`,
              transition: "transform 0.5s ease",
            }}
          >
            <img
              src={boardImage}
              alt="Game Board"
              style={{
                width: 900,
                maxWidth: "95vw",
                border: "2px solid #333",
                borderRadius: 12,
              }}
            />

            {/* Deck Buttons */}
            <button
              onClick={() => startQA(mazalCard)}
              style={{
                position: "absolute",
                top: "20%",
                left: "38%",
                transform: "translate(-50%, -50%)",
                padding: "6px 12px",
                fontSize: 14,
                backgroundColor: "#28a745",
                color: "#fff",
                border: "2px solid #000",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Mazal Deck
            </button>

            <button
              onClick={() => startQA(harHaBayitCard)}
              style={{
                position: "absolute",
                top: "20%",
                left: "62%",
                transform: "translate(-50%, -50%)",
                padding: "6px 12px",
                fontSize: 14,
                backgroundColor: "#6f42c1",
                color: "#fff",
                border: "2px solid #000",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Har HaBayit Deck
            </button>

            <button
              onClick={() => startQA(bereshitCard)}
              style={{
                position: "absolute",
                top: "43%",
                left: "54%",
                transform: "translate(-50%, -50%)",
                padding: "6px 12px",
                fontSize: 14,
                backgroundColor: "#ffc107",
                color: "#000",
                border: "2px solid #333",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Tzadik Deck
            </button>

            <button
              onClick={() => startQA(bereshitCard)}
              style={{
                position: "absolute",
                top: "58%",
                left: "70%",
                transformOrigin: "left center",
                transform: "translate(-50%, -50%) rotateX(40deg)",
                padding: "6px 12px",
                fontSize: 14,
                backgroundColor: "#17a2b8",
                color: "#fff",
                border: "2px solid #000",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Parsha Deck
            </button>
          </div>

          <button onClick={rotateBoard} style={styles.button}>
            Rotate Board 90°
          </button>

          <div style={{ marginBottom: 30, marginTop: 20 }}>
            <h2>Roll Dice</h2>
            <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
              <Dice sides={6} onRoll={(val) => {}} faceColor="#007bff" dotColor="#fff" rollTime={1} />
              <Dice sides={6} onRoll={(val) => {}} faceColor="#007bff" dotColor="#fff" rollTime={1} />
            </div>

            <button
              onClick={endTurn}
              style={{ ...styles.button, marginTop: 15 }}
            >
              End Turn
            </button>

            <p>Turn: {turnCount}</p>
            <p>Player Position: {playerPosition}</p>
            <p>Total Zchut Points: {zchutPoints}</p>
            <p>Money: ${money}</p>
          </div>
        </>
      )}

      {qaMode && currentCard && (
        <CardQA card={currentCard} onFinish={finishQA} />
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: 20,
    backgroundColor: "#f0f2f5",
    minHeight: "100vh",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: 8,
    padding: "10px 20px",
    fontSize: 16,
    cursor: "pointer",
  },
  input: {
    fontSize: 16,
    padding: "5px 10px",
    borderRadius: 4,
    border: "1px solid #ccc",
  },
  qaContainer: {
    fontFamily: "Arial, sans-serif",
    maxWidth: 500,
    margin: "20px auto",
    padding: 20,
    border: "2px solid #333",
    borderRadius: 10,
    backgroundColor: "#fefefe",
    textAlign: "center",
  },
  questionBox: {
    marginTop: 20,
    padding: 15,
    border: "1px solid #999",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  answer: {
    marginTop: 10,
    fontStyle: "italic",
    color: "#007700",
    fontWeight: "bold",
  },
  acceptButton: {
    padding: "10px 18px",
    fontSize: 16,
    marginTop: 15,
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    backgroundColor: "#28a745",
    color: "#fff",
  },
};

export default App;