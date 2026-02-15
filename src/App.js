  // TEMP: Test button to land on 21
  const testLandOn21 = () => {
    if (!gameStarted) return;
    const player = players[currentPlayerIndex];
    const steps = (21 - player.position + boardPositions.length) % boardPositions.length;
    if (steps === 0) return; // Already on 21
    movePlayerBy(steps);
  };
// --- Manna Foods Modal ---
function MannaFoodsModal({ open, onClose, currentPlayer, onPay }) {
  if (!open) return null;

  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const amount = parseInt(inputValue);
    if (isNaN(amount) || amount <= 0) {
      setError("Invalid amount.");
      return;
    }
    if (currentPlayer.money < amount) {
      setError("You don't have enough money!");
      return;
    }
    setError("");
    onPay(amount);
    onClose();
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <h2>Manna Foods</h2>
        <h3>The Gift That Keeps on Giving</h3>
        <p>Cover the cost of a Manna Foods Banquet</p>
        <p>Pay whatever price you like</p>
        <p>
          The next player that lands here returns your expense.<br />
          But the players after that? That is the gift that keeps on giving.
        </p>
        <input
          type="number"
          min="1"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Enter amount"
          style={{ marginBottom: 8, padding: 6, fontSize: 16, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <div style={{ color: 'red', minHeight: 20 }}>{error}</div>
        <button style={modalStyles.button} onClick={handleSubmit}>Pay</button>
        <button style={modalStyles.button} onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

// src/App.js
import React, { useState, useEffect } from "react";
import { TorahPolyBoardButtons } from "./TorahPolyBoardButtons";
import MannaFoodsPayModal from "./MannaFoodsPayModal";

// --- Mazal Card Modal ---
import { mazalCards, harHaBayitCards, tzadikCard, parshaCard, tzadikCards } from "./TorahPolyBoardButtons";
// --- Parsha Card Modal ---
function ParshaCardModal({ open, onClose, currentPlayer, setPlayers }) {
  const [shownAnswers, setShownAnswers] = useState([]);
  const [claimedQuestions, setClaimedQuestions] = useState([]);
  const [cardIndex, setCardIndex] = useState(0); // 0: Noach, 1: Bereshit, etc.
  const [shuffled, setShuffled] = useState(false);
  const [cardsState, setCardsState] = useState(null);
  const [originalCards, setOriginalCards] = useState(null);
  useEffect(() => {
    if (open && !cardsState) {
      setCardsState(cards);
      setOriginalCards(cards);
      setShuffled(false);
      // Do not reset cardIndex here
    }
    if (!open && cardsState) {
      setCardsState(null);
      setOriginalCards(null);
      setShuffled(false);
      // Do not reset cardIndex here
    }
    // eslint-disable-next-line
  }, [open]);

  // Shuffle only the qa cards, keep deck cards in place
  const handleShuffle = () => {
    if (!cardsState) return;
    // Separate qa and deck cards
    const qaCards = cardsState.filter(card => card.type === 'qa');
    const deckCards = cardsState.filter(card => card.type === 'deck');
    // Shuffle qa cards
    const shuffledQa = [...qaCards];
    for (let i = shuffledQa.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledQa[i], shuffledQa[j] ] = [shuffledQa[j], shuffledQa[i]];
    }
    // Rebuild alternating array
    const newCards = [];
    let qaIdx = 0, deckIdx = 0;
    for (let i = 0; i < cardsState.length; i++) {
      if (cardsState[i].type === 'qa') {
        newCards.push(shuffledQa[qaIdx++]);
      } else {
        newCards.push(deckCards[deckIdx++]);
      }
    }
    setCardsState(newCards);
    setShuffled(true);
    setCardIndex(0);
    setShownAnswers([]);
    setClaimedQuestions([]);
  };

  // Restore original order
  const handleReturn = () => {
    if (originalCards) {
      setCardsState(originalCards);
      setShuffled(false);
      setCardIndex(0);
      setShownAnswers([]);
      setClaimedQuestions([]);
    }
  };

  if (!open) return null;

  const cards = [
    {
      type: 'qa',
      title: 'Parsha Bereshit (Sefer Bereshit)',
      questions: [
        {
          question: 'What day was Adam born?',
          answer: 'The 6th day',
          zchut: 50,
        },
        {
          question: "What day was not 'good' but 'very' good?",
          answer: 'The 6th day',
          zchut: 50,
        },
        {
          question: 'Where do we see adding is sometimes subtracting?',
          answer: "Adam added 'don't touch' the tree. The snake used this to fool Chava. He pushed her against the tree and said, 'See you didn't die!'",
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Noach (Sefer Bereshit)',
      questions: parshaCard.questions,
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Lech Lecha (Sefer Bereshit)',
      questions: [
        {
          question: 'What were the Canaanites doing in the Land of Canaan when Avram arrived?',
          answer: 'They were in the process of conquering the Land from the descendants of Shem.',
          zchut: 50,
        },
        {
          question: 'Who accompanied Avraham in the battle against the four kings?',
          answer: 'Eliezer',
          zchut: 50,
        },
        {
          question: 'When did the decree of 400 years exile begin?',
          answer: 'With the birth of Itzchak',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Vayera (Sefer Bereshit)',
      questions: [
        {
          question: 'Why was Avraham sitting at the entrance of his tent?',
          answer: 'He was looking for guests.',
          zchut: 50,
        },
        {
          question: 'What were the missions of the three angels?',
          answer: "To announce Yitzchak's birth, to heal Avraham, and to destroy Sodom",
          zchut: 50,
        },
        {
          question: 'After the miraculous birth of Yitzchak why would Hashem command him to be sacrificed?',
          answer: 'Measure for measure Avraham denigrated the open miracle by making a pact with Avimelech soon after (Rashbam).',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Chayei Sarah (Sefer Bereshit)',
      questions: [
        {
          question: 'Name the four couples buried in Kiryat Arba?',
          answer: 'Adam and Chava, Avraham and Sara, Yitzchak and Rivka, Yaakov and Leah.',
          zchut: 50,
        },
        {
          question: 'Eliezer is referred to more than ten times in this Parsha. How many times is his name mentioned?',
          answer: "None. Why? He had no self-interest, referred only as Avraham's servant interested only in fulfilling Avraham's mission",
          zchut: 50,
        },
        {
          question: 'Who was Ketura?',
          answer: 'Hagar',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Toldot (Sefer Bereshit)',
      questions: [
        {
          question: 'What did Esav sell for a bowl of soup?',
          answer: 'The birthright',
          zchut: 50,
        },
        {
          question: 'If Esav already sold the birthright for a bowl of soup why was he so angry when Yacov stole the blessing?',
          answer: 'Envy. Envy is not only jealousy of anothers posssesions but possesions that you never valued until it passed into the hands of another more worthy than you.',
          zchut: 50,
        },
        {
          question: 'Yacov comes from the word heel. Why was he given this name?',
          answer: 'Because he was grasping on to his twin brothers heel as they were born.',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Vayetze (Sefer Bereshit)',
      questions: [
        {
          question: 'Why did Yaakov cry when he met Rachel?',
          answer: 'He saw prophetically that they would not be buried together; or because he was penniless.',
          zchut: 50,
        },
        {
          question: 
            "Why were Leah's eyes tender?",
          answer: 'She cried continually because she thought she was destined to marry Esav.',
          zchut: 50,
        },
        {
          question: 'How old was Yaakov when he married?',
          answer: 'Eighty-four',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Vayishlach (Sefer Bereshit)',
      questions: [
        {
          question: 'In what three ways did Yaakov prepare for his encounter with Esav?',
          answer: 'He sent gifts, he prayed, and he prepared for war',
          zchut: 50,
        },
        {
          question: 'What was the angel forced to do before Yaakov agreed to release him?',
          answer: 'Admit that the blessings given by Yitzchak rightfully belong to Yaakov.',
          zchut: 50,
        },
        {
          question: 'Where was Yacov wounded? Why?',
          answer: "The Gid Hanasheh (sciatic nerve). Yacov's weakness is running and not confronting his adversary yet he becomes a reluctant conqueror when confronted by this adversary who proclaims that from now on his name will be Israel.",
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Vayeishev (Sefer Bereshit)',
      questions: [
        {
          question: '"These are the offspring of Yaakov: Yosef...." Give three reasons why Yosef is considered Yaakov\'s main offspring?',
          answer: '(a) Yosef was the son of Rachel, Yaakov\'s primary wife. (b) Yosef looked like Yaakov. (c) All that befell Yaakov befell Yosef.',
          zchut: 50,
        },
        {
          question: 'For how long did Yaakov mourn the loss of Yosef?',
          answer: 'Twenty-two years',
          zchut: 50,
        },
        {
          question: 'How was Yosef punished for asking the butler for help?',
          answer: 'He remained in prison an additional two years',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Mikeitz (Sefer Bereshit)',
      questions: [
        {
          question: 'When did Yosef know that his dreams were being fulfilled?',
          answer: 'When his brothers bowed to him',
          zchut: 50,
        },
        {
          question: 'What did Yosef require the Egyptians to do before he would sell them grain?',
          answer: 'Become circumcised',
          zchut: 50,
        },
        {
          question: 'Who was the interpreter between Yosef and his brothers?',
          answer: 'His son Menashe',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Vayigash (Sefer Bereshit)',
      questions: [
        {
          question: 'What two things did the brothers see that helped prove that he was really Yosef?',
          answer: 'He was circumcised like they were, and he spoke Lashon Hakodesh',
          zchut: 50,
        },
        {
          question: 'Why did Binyamin weep on Yosef\'s neck?',
          answer: 'Binyamin wept for the destruction of Mishkan Shilo built in Yosef\'s territory.',
          zchut: 50,
        },
        {
          question: 'What returned to Yaakov when he realized Yosef was alive?',
          answer: 'His ruach hakodesh (prophetic spirit) returned',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Vayechi (Sefer Bereshit)',
      questions: [
        {
          question: 'Why is kindness towards the dead called "chesed shel emet" — kindness of truth?',
          answer: 'Because the giver expects no reward from the recipient',
          zchut: 50,
        },
        {
          question: 'What congregation from Yaakov\'s offspring did Yaakov not want to be associated with?',
          answer: 'Korach and his congregation',
          zchut: 50,
        },
        {
          question: 'Which two sons of Yaakov did not carry his coffin? Why not?',
          answer: 'Levi, because he would carry the Aron Kodesh (Holy Ark). Yosef, because he was a king.',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Shmot (Sefer Shmot)',
      questions: [
        {
          question: 'Which Hebrew men were fighting each other?',
          answer: 'Datan and Aviram',
          zchut: 50,
        },
        {
          question: 'About which plague was Pharoah warned first? (Shmot 4:23)',
          answer: 'Death of the first born',
          zchut: 50,
        },
        {
          question: 'How were the shotrim rewarded for accepting the beatings on behalf of their fellow Jews?',
          answer: 'They were chosen to be on the Sanhedrin.',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Va\'eira (Sefer Shmot)',
      questions: [
        {
          question: 'Why did Pharoah go to the Nile every morning?',
          answer: 'To relieve himself. Pharoah pretended to be a god who did not need to attend to his bodily functions.',
          zchut: 50,
        },
        {
          question: "Why didn't Moshe strike the dust to initiate the plague of lice?",
          answer: 'Because the dust protected Moshe by hiding the body of the Egyptian that Moshe killed.',
          zchut: 50,
        },
        {
          question: "Who was Aaron's wife? Who was her brother?",
          answer: 'Elisheva, sister of Nachshon.',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Bo (Sefer Shmot)',
      questions: [
        {
          question: 'Prior to the Exodus from Egypt, what two mitzvot involving blood did Hashem give to the Jewish People?',
          answer: 'Circumcision and Korban Pesach',
          zchut: 50,
        },
        {
          question: 'Why did Pharaoh ask Moshe to bless him?',
          answer: "So he wouldn't die, for he himself was a firstborn",
          zchut: 50,
        },
        {
          question: 'What three historical events occurred on the 15th of Nissan, prior to the event of the Exodus from Egypt?',
          answer: 'The angels came to promise that Sarah would have a son, Yitzchak was born, and the exile of the "covenant between the parts" was decreed',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Beshalach (Sefer Shmot)',
      questions: [
        {
          question: 'What percentage of the Jewish people died during the plague of darknes?',
          answer: 'Eighty percent (four-fifths)',
          zchut: 50,
        },
        {
          question: 'Why did the Egyptians want to pursue the Jewish People?',
          answer: 'To regain their wealth',
          zchut: 50,
        },
        {
          question: 'Where did the Egyptians get animals to pull their chariots?',
          answer: 'From those Egyptians who feared the word of Hashem and kept their animals inside during the plagues.',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Yitro (Sefer Shmot)',
      questions: [
        {
          question: 'How did the encampment at Sinai differ from the other encampments? What was unique among the tribes at this moment?',
          answer: 'The Jewish People were united',
          zchut: 50,
        },
        {
          question: 'What suggestion did Yitro give Moshe?',
          answer: 'That he deputize judges to assist him with his work',
          zchut: 50,
        },
        {
          question: 'How many commandments did Israel hear from the Almighty?',
          answer: 'The first two',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Mishpatim (Sefer Shmot)',
      questions: [
        {
          question: 'In what context is a mezuza mentioned in this week\'s Parsha?',
          answer: 'If a Hebrew slave desires to remain enslaved his owner brings him "to the door post mezuza" to pierce his ear.',
          zchut: 50,
        },
        {
          question: 'An ox gores another ox. What is the maximum the owner of the damaging ox must pay, provided his animal had gored no more than twice previously?',
          answer: 'The full value of his own animal',
          zchut: 50,
        },
        {
          question: 'A person borrows his employee\'s car. The car is struck by lightning. How much must he pay?',
          answer: 'Nothing',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Trumah (Sefer Shmot)',
      questions: [
        {
          question: 'What did the faces of the keruvim resemble?',
          answer: 'The faces of children',
          zchut: 50,
        },
        {
          question: 'How did Moshe know the shape of the menorah?',
          answer: 'Hashem showed Moshe a menorah of fire',
          zchut: 50,
        },
        {
          question: 'Describe the uses of: a) oil; b) spices; c) jewels?',
          answer: 'Anointing, Incense, Choshen',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Tetzaveh (Sefer Shmot)',
      questions: [
        {
          question: 'In which order were the names of the Tribes inscribed on the Choshen?',
          answer: 'In order of birth',
          zchut: 50,
        },
        {
          question: 'The stones of the Choshen bore the inscription of the names of the sons of Yaakov. Why?',
          answer: 'So that Hashem would see their names and recall their righteousness.',
          zchut: 50,
        },
        {
          question: "This is the one Parsha where Moshe's name is not mentioned. Where do we see it hidden and why?",
          answer: 'The two Shoham stones spell Moshe. From these stones the Choshen is held by two chains. The Tzaddik holds Israel upon his shoulders, even when we don\'t see him',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Ki Tissa (Sefer Shmot)',
      questions: [
        {
          question: 'How many ingredients compromise the incense of the Mishkan?',
          answer: 'Eleven',
          zchut: 50,
        },
        {
          question: 'How has the sin of the Golden Calf affected the Jewish people throughout history?',
          answer: 'Whenever Hashem punished the Jewish people, part of that punishment comes for the sin of the Golden Calf.',
          zchut: 50,
        },
        {
          question: 'How did Hashem show that He forgave the Jewish people?',
          answer: 'He agreed to let His Schechina dwell among them.',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Vayakhel (Sefer Shmot)',
      questions: [
        {
          question: 'Why is the prohibition of work on Shabbat written prior to the instructions for building?',
          answer: 'To teach that building the Mishkan does not supersede Shabbat.',
          zchut: 50,
        },
        {
          question: 'Why did the Princes contribute last? How does the Torah show dissatisfaction with this?',
          answer: 'The princes wanted the people to contribute first, and only then would they contribute whatever was lacking. Hence the Torah omits a letter from their title.',
          zchut: 50,
        },
        {
          question: 'Who were the two primary builders of the Mishkan? What tribes were they from?',
          answer: 'Betzalel ben Uri from Yehuda, and Oholiav ben Achisamach from Dan.',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Pekudei (Sefer Shmot)',
      questions: [
        {
          question: 'What does Betzalel mean?',
          answer: '"In the shadow of G-d"',
          zchut: 50,
        },
        {
          question: 'On which day was the Mishkan first erected and not dismantled?',
          answer: 'Rosh Chodesh Nissan of the second year. For seven days before this, Moshe erected and dismantled the Mishkan.',
          zchut: 50,
        },
        {
          question: 'On which day did Moshe and Aharon both serve as the Kohanim?',
          answer: 'On the eighth day of the Mishkan\'s consecration.',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    // --- MannaFoodsPayModal is now used for subsequent players ---
    // --- MannaFoodsModal (set your price) is used for first buyer ---
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Shmini (Sefer Vayikra)',
      questions: [
        {
          question: 'What tragic event happened to Aharon\'s sons Nadav and Avihu?',
          answer: 'They died after bringing unauthorized fire before Hashem.',
          zchut: 50,
        },
        {
          question: 'Which animals are kosher according to Parshat Shmini?',
          answer: 'Animals that have split hooves and chew their cud.',
          zchut: 50,
        },
        {
          question: 'What is the main lesson of the laws of kashrut in Shmini?',
          answer: 'To be holy and separate, as Hashem is holy.',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    // --- Added: Deck and Parsha Tazria (Sefer Vayikra) ---
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Tazria (Sefer Vayikra)',
      questions: [
        {
          question: "Who determines whether a person is a metzora tamei (person with ritually impure tzara'at) or is tahor?",
          answer: 'A kohen',
          zchut: 50,
        },
        {
          question: 'When does a woman who has given birth to a son go to the mikveh?',
          answer: 'At the end of seven days',
          zchut: 50,
        },
        {
          question: "What disqualifies a kohen from being able to give a ruling in a case of tzara'as?",
          answer: 'Poor vision',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
      // --- Added: Deck and Parsha Metzora (Sefer Vayikra) ---
      {
        type: 'deck',
        title: 'Parsha Deck',
        image: '/cards/Parsha Deck.png',
        note: '',
      },
      {
        type: 'qa',
        title: 'Parsha Metzora (Sefer Vayikra)',
        questions: [
          {
            question: 'What is the main topic of Parshat Metzora?',
            answer: 'The laws of purification for a metzora (person afflicted with tzara’at).',
            zchut: 50,
          },
          {
            question: 'What ritual is performed with two birds for the metzora?',
            answer: 'One bird is slaughtered, the other is set free after being dipped in the blood of the first.',
            zchut: 50,
          },
          {
            question: 'What does the metzora do after being declared pure?',
            answer: 'He brings offerings and shaves his hair.',
            zchut: 50,
          },
        ],
        note: 'If you get all three answers you can pick a Har HaBayit card',
      },
        // --- Added: Deck and Parsha Acharei Mot (Sefer Vayikra) ---
        {
          type: 'deck',
          title: 'Parsha Deck',
          image: '/cards/Parsha Deck.png',
          note: '',
        },
        {
          type: 'qa',
          title: 'Parsha Acharei Mot (Sefer Vayikra)',
          questions: [
            {
              question: 'Why does the Torah emphasize that Parshat Acharei Mot was taught after the death of Aharon\'s sons?',
              answer: 'To strengthen the warning not to enter the Holy of Holies except on Yom Kippur',
              zchut: 50,
            },
            {
              question: 'How long did the first Beit Hamikdash stand?',
              answer: '410 years',
              zchut: 50,
            },
            {
              question: 'What is the difference between "mishpat" and "chok"?',
              answer: 'A "mishpat" conforms to the human sense of justice. A "chok" is a law whose reason is not given to us and can only be understood as Hashem\'s decree.',
              zchut: 50,
            },
          ],
          note: 'If you get all three answers you can pick a Har HaBayit card',
        },
          // --- Added: Deck and Parsha Kedoshim (Sefer Vayikra) ---
          {
            type: 'deck',
            title: 'Parsha Deck',
            image: '/cards/Parsha Deck.png',
            note: '',
          },
          {
            type: 'qa',
            title: 'Parsha Kedoshim (Sefer Vayikra)',
            questions: [
              {
                question: 'Why was Parshat Kedoshim said in front of all the Jewish People?',
                answer: 'Because it contains the fundamental teachings of the Torah',
                zchut: 50,
              },
              {
                question: 'Why does the Torah mention the duty to honor one\'s father before it mentions the duty to honor one\'s mother?',
                answer: 'Since it is more natural to honor one\'s mother, the Torah stresses the obligation to honor one\'s father.',
                zchut: 50,
              },
              {
                question: 'Why is the command to fear one\'s parents followed by the command to keep Shabbat?',
                answer: 'To teach that one must not violate Torah law even at the command of one\'s parents..',
                zchut: 50,
              },
            ],
            note: 'If you get all three answers you can pick a Har HaBayit card',
          },
            // --- Added: Deck and Parsha Emor (Sefer Vayikra) ---
            {
              type: 'deck',
              title: 'Parsha Deck',
              image: '/cards/Parsha Deck.png',
              note: '',
            },
            {
              type: 'qa',
              title: 'Parsha Emor (Sefer Vayikra)',
              questions: [
                {
                  question: 'Who in the household of a kohen may eat terumah?',
                  answer: 'He, his wife, his sons, his unmarried daughters and his non-Jewish slaves.',
                  zchut: 50,
                },
                {
                  question: 'Why do we begin counting the omer at night?',
                  answer: 'The Torah requires counting seven complete weeks. If we begin counting in the daytime, the seven weeks would not be complete, because according to the Torah a day starts at nightfall.',
                  zchut: 50,
                },
                {
                  question: 'What is unusual about the wood of the etrog tree?',
                  answer: 'It has the same taste as the fruit',
                  zchut: 50,
                },
              ],
              note: 'If you get all three answers you can pick a Har HaBayit card',
            },
              // --- Added: Deck and Parsha Behar (Sefer Vayikra) ---
              {
                type: 'deck',
                title: 'Parsha Deck',
                image: '/cards/Parsha Deck.png',
                note: '',
              },
              {
                type: 'qa',
                title: 'Parsha Behar (Sefer Vayikra)',
                questions: [
                  {
                    question: 'Why does the Torah specify that the laws of shemita were taught on Har Sinai?',
                    answer: 'To teach us that just as shemita was taught in detail on Har Sinai, so too, all the mitzvot were taught in detail on Har Sinai',
                    zchut: 50,
                  },
                  {
                    question: 'What is the punishment for neglecting the laws of shemita?',
                    answer: 'Exile (Vayikra 25:18)',
                    zchut: 50,
                  },
                  {
                    question: 'To what is one who leaves Eretz Yisrael compared?',
                    answer: 'To one who worships idols (Vayikra 25:38)',
                    zchut: 50,
                  },
                ],
                note: 'If you get all three answers you can pick a Har HaBayit card',
              },
                // --- Added: Deck and Parsha Bechukotai (Sefer Vayikra) ---
                {
                  type: 'deck',
                  title: 'Parsha Deck',
                  image: '/cards/Parsha Deck.png',
                  note: '',
                },
                {
                  type: 'qa',
                  title: 'Parsha Bechukotai (Sefer Vayikra)',
                  questions: [
                    {
                      question: 'The word “bechukotai”(in My statutes) is related to the word “chakikah”(engraved).  Why?',
                      answer: 'We must toil in the study of Torah until Torah becomes engraved in us. Jewish destiny is also engraved in us and we cannot escape it',
                      zchut: 50,
                    },
                    {
                      question: 'Mathematically, if five Jewish soldiers can defeat 100 enemy soldiers, how many enemy soldiers should 100 Jewish soldiers beable to defeat?',
                      answer: 'Two thousand',
                      zchut: 50,
                    },
                    {
                      question: 'Which "progression" of seven transgressions are taught in Chapter 26, and why in that particular order?',
                      answer: 'Not studying Torah, not observing mitzvot, rejecting those who observe mitzvot, hating Sages, preventing others from observing mitzvot, denying that G-d gave the mitzvot, denying the existence of G-d. They are listed in this order because each transgression leads to the next',
                      zchut: 50,
                    },
                  ],
                  note: 'If you get all three answers you can pick a Har HaBayit card',
                },
                  // --- Added: Deck and Parsha Bamidbar (Sefer Bamidbar) ---
                  {
                    type: 'deck',
                    title: 'Parsha Deck',
                    image: '/cards/Parsha Deck.png',
                    note: '',
                  },
                  {
                    type: 'qa',
                    title: 'Parsha Bamidbar (Sefer Bamidbar)',
                    questions: [
                      {
                        question: 'Why were the Jewish People counted so frequently?',
                        answer: 'They are very dear to Hashem',
                        zchut: 50,
                      },
                      {
                        question: 'Why are Aharon\'s sons called "sons of Aharon and Moshe?',
                        answer: 'Since Moshe taught them Torah, it’s as if he gave birth to them',
                        zchut: 50,
                      },
                      {
                        question: 'The firstborn males of the Jewish People were redeemed for five shekalim. Why five shekalim?',
                        answer: 'To atone for the sale of Yosef, Rachel’s firstborn, who was sold by his brothers for five shekalim (20 pieces of silver.)',
                        zchut: 50,
                      },
                    ],
                    note: 'If you get all three answers you can pick a Har HaBayit card',
                  },
                    // --- Added: Deck and Parsha Nasso (Sefer Bamidbar) ---
                    {
                      type: 'deck',
                      title: 'Parsha Deck',
                      image: '/cards/Parsha Deck.png',
                      note: '',
                    },
                    {
                      type: 'qa',
                      title: 'Parsha Nasso (Sefer Bamidbar)',
                      questions: [
                        {
                          question: 'Why are the verses about matanot kehuna followed by the verses of the Sotah?',
                          answer: 'To teach that someone who withholds the gifts due to the Kohanim is deserving of eventually bringing his wife to the Kohanim to be tried as a Sotah.',
                          zchut: 50,
                        },
                        {
                          question: 'The holy basin was made from the mirrors of the righteous women who left Egypt. What was holy about their mirors?',
                          answer: 'During slavery, they used these mirrors to awaken their husbands affection and subsequently became the mothers of many children.',
                          zchut: 50,
                        },
                        {
                          question: 'What is the meaning of the blessing "May Hashem bless you and guard you?"',
                          answer: '"May Hashem bless you that your property may increase, "and guard you" from robbery.',
                          zchut: 50,
                        },
                      ],
                      note: 'If you get all three answers you can pick a Har HaBayit card',
                    },
                      // --- Added: Deck and Parsha Beha'alotcha (Sefer Bamidbar) ---
                      {
                        type: 'deck',
                        title: 'Parsha Deck',
                        image: '/cards/Parsha Deck.png',
                        note: '',
                      },
                      {
                        type: 'qa',
                        title: "Parsha Beha'alotcha (Sefer Bamidbar)",
                        questions: [
                          {
                            question: "Why did G-d claim the first-born of the Jewish people His possesion?",
                            answer: "Because in Egypt He spared them during Makat Bechorot.",
                            zchut: 50,
                          },
                          {
                            question: "Moshe was commanded to choose 70 elders to help him lead the Jewish people. What happened to the elders who led the Jewish people in Egypt?",
                            answer: "They were consumed in the fire at Taverah.",
                            zchut: 50,
                          },
                          {
                            question: "Whom did Moshe choose as the new leadership?",
                            answer: "People who were supervisors in Egypt and had pity on Bnei Israel at risk to themselves. They took beatings for their brothers.",
                            zchut: 50,
                          },
                        ],
                            note: 'If you get all three answers you can pick a Har HaBayit card',
                          },
                            // --- Added: Deck and Parsha Shlach (Sefer Bamidbar) ---
                            {
                              type: 'deck',
                              title: 'Parsha Deck',
                              image: '/cards/Parsha Deck.png',
                              note: '',
                            },
                            {
                              type: 'qa',
                              title: 'Parsha Shlach (Sefer Bamidbar)',
                              questions: [
                                {
                                  question: "Why is the portion about the spies written immediately after the portion about Miriam's tzara'at?",
                                  answer: "To show the evil of the meraglim (spies), that they saw Miriam punished for lashon hara yet failed to take a lesson from it.",
                                  zchut: 50,
                                },
                                {
                                  question: "On what day did Bnei Yisrael cry due to the meraglim's report? How did this affect future generations?",
                                  answer: "The 9th of Av (Tisha B'av). This date therefore became a day of crying for all future generations: Both Temples were destroyed on this date",
                                  zchut: 50,
                                },
                                {
                                  question: "Why did the meraglim begin by saying the land is 'flowing with milk and honey'?",
                                  answer: "Any lie which doesn't start with an element of truth won't be believed; therefore, they began their false report with a true statement",
                                  zchut: 50,
                                },
                              ],
                              note: 'If you get all three answers you can pick a Har HaBayit card',
                            },
                          // --- Added: Deck and Parsha Korach (Sefer Bamidbar) ---
                          {
                            type: 'deck',
                            title: 'Parsha Deck',
                            image: '/cards/Parsha Deck.png',
                            note: '',
                          },
                          {
                            type: 'qa',
                            title: 'Parsha Korach (Sefer Bamidbar)',
                            questions: [
                              {
                                question: 'What motivated Korach to rebel?',
                                answer: 'Korach was jealous that Elizafan ben Uziel was appointed as leader of the family of Kehat instead of himself.',
                                zchut: 50,
                              },
                              {
                                question: 'What did Korach and company do when Moshe said that a techelet garment needs tzizit?',
                                answer: 'They laughed.',
                                zchut: 50,
                              },
                              {
                                question: 'What event did Korach not foresee?',
                                answer: 'That his sons would repent',
                                zchut: 50,
                              },
                            ],
                            note: 'If you get all three answers you can pick a Har HaBayit card',
                          },
                            // --- Added: Deck and Parsha Chukat (Sefer Bamidbar) ---
                            {
                              type: 'deck',
                              title: 'Parsha Deck',
                              image: '/cards/Parsha Deck.png',
                              note: '',
                            },
                            {
                              type: 'qa',
                              title: 'Parsha Chukat (Sefer Bamidbar)',
                              questions: [
                                {
                                  question: 'The red heifer is burned completely including ts dung. What does it represent?',
                                  answer: 'The Jewish people from the loftiest to the lowest are all burned together (Zohar)',
                                  zchut: 50,
                                  pays: 40,
                                },
                                {
                                  question: 'The water of sprinkling (Mei Nidah) makes some pure and some temporarily impure. What Hebrew word has the same letters as Mei Niddah?',
                                  answer: 'Medina (State)',
                                  zchut: 50,
                                  pays: 60,
                                },
                                {
                                  question: 'How is the persecution of a Tzadik similar to the Cohen who sprinkles?',
                                  answer: 'Many prophets were despised, considered impure and stoned but the Torah they clung to eventually purifies; even those who once persecuted the Tzadik',
                                  zchut: 50,
                                  pays: 80,
                                },
                              ],
                              note: 'If you get all three answers you can pick a Har HaBayit card',
                            },
    // --- Added: Deck and Parsha Balak (Sefer Bamidbar) ---
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Balak (Sefer Bamidbar)',
      questions: [
        {
          question: 'Although Balak was evil and tried to destroy Israel one of his descendents became a very holy Jew. Who was that?',
          answer: 'Ruth',
          zchut: 50,
        },
        {
          question: 'The water of sprinkling (Mei Nidah) makes some pure and some temporarily impure. What Hebrew word has the same letters as Mei Nidah?',
          answer: 'Medina (State).',
          zchut: 50,
        },
        {
          question: 'Pharoah had three advisors,Yitro,Iyov and Bilaam. What were their fates and why?',
          answer: 'Yitro protested Pharoahs decrees and had to run for his life. He later had the honor of having a Torah Parsha named after him. Iyov was silent and suffered later for that silence. Bilaam advised Pharoah to torture the Jews and died by the sword of Israel.',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    // --- Added: Deck and Parsha Pinchas (Sefer Bamidbar) ---
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Pinchas (Sefer Bamidbar)',
      questions: [
        {
          question: 'Why was Pinchas not originally a kohen?',
          answer: 'He was a grandson born before Aaron and his sons were annointed',
          zchut: 50,
        },
        {
          question: 'How does the Torah show us that Pinchas went against his nature to be zealous for Hashem?',
          answer: 'Pinchas is written with a small yud',
          zchut: 50,
        },
        {
          question: 'What trait did Tzlofchad\'s daughters exhibit that their ancestor Yosef also exhibited?',
          answer: 'Love for Eretz Yisrael',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    // --- Added: Deck and Parsha Matot (Sefer Bamidbar) ---
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Matot (Sefer Bamidbar)',
      questions: [
        {
          question: 'Those selected to fight Midian went unwillingly. Why?',
          answer: 'They knew that Moshe\'s death would follow',
          zchut: 50,
        },
        {
          question: 'How many soldiers died when they took vengeance against the Midianites?',
          answer: 'None',
          zchut: 50,
        },
        {
          question: '"We will build sheep-pens here for our livestock and cities for our little ones." What was improper about this statement?',
          answer: 'They showed more regard for their property than for their children.',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    // --- Added: Deck and Parsha Masei (Sefer Bamidbar) ---
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Masei (Sefer Bamidbar)',
      questions: [
        {
          question: 'Why did the King of Arad feel at liberty to attack the Jewish People?',
          answer: 'When Aharon died, the clouds of glory protecting the Jewish People departed.',
          zchut: 50,
        },
        {
          question: 'What did God say would happen if the Israelites did not drive out all of the inhabitants?',
          answer: 'God promises: “Those that remain will be as thorns in your eyes, as pricks in your sides, and they shall harass you in the land where you dwell”',
          zchut: 50,
        },
        {
          question: 'In order to be safe, how long must the person who has fled to a city of refuge remain?',
          answer: 'The person must remain until the death of the high priest',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    // --- Added: Deck and Parsha Dvarim (Sefer Dvarim) ---
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Dvarim (Sefer Dvarim)',
      questions: [
        {
          question: 'Moshe rebuked the Jewish People shortly before his death. From whom did he learn this?',
          answer: 'From Yaakov, who rebuked his sons shortly before his death.',
          zchut: 50,
        },
        {
          question: 'Moshe was looking for several qualities in the judges he chose. Which quality couldn\'t he find?',
          answer: 'Men of understanding',
          zchut: 50,
        },
        {
          question: 'Why were the Jewish People not permitted to conquer the Philistines?',
          answer: 'Because Avraham had made a peace treaty with Avimelech, King of the Philistines.',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    // --- Added: Deck and Parsha V'etchanan (Sefer Dvarim) ---
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: "Parsha V'etchanan (Sefer Dvarim)",
      questions: [
        {
          question: 'And I prayed to Hashem at that time." Why "at that time"?',
          answer: 'Defeating Sichon and Og, Moshe thought perhaps Hashem had annulled the vow against his entering the Land',
          zchut: 50,
        },
        {
          question: 'The word “Va’etchanan” has the numerical value of five hundred and fifteen, what does this teaches us?',
          answer: 'Moshe prayed five hundred and fifteen prayers to Hashem to be permitted to enter Eretz Yisrael',
          zchut: 50,
        },
        {
          question: 'What is meant by "Hashem, our G-d, Hashem is One"?',
          answer: 'Hashem, who is now our G-d, but not [accepted as] G-d of the other nations, will eventually be [accepted as] the one and only G-d',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    // --- Added: Deck and Parsha Ekev (Sefer Dvarim) ---
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Ekev (Sefer Dvarim)',
      questions: [
        {
          question: 'On what day did Moshe come down from Mt. Sinai having received complete forgiveness for the Jewish People?',
          answer: 'The tenth of Tishrei, Yom Kippur',
          zchut: 50,
        },
        {
          question: 'How was Aharon punished for his role in the golden calf?',
          answer: 'His two sons died',
          zchut: 50,
        },
        {
          question: "What is meant by circumcising one's heart?",
          answer: 'To remove those things that block the words of Torah from entering.',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    // --- Added: Deck and Parsha Re'eh (Sefer Dvarim) ---
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: "Parsha Re'eh (Sefer Dvarim)",
      questions: [
        {
          question: 'What were the sites designated for the "blessings and the curses" to be pronounced by the people?',
          answer: 'Mt. Gerizim and Mt. Eval, respectively',
          zchut: 50,
        },
        {
          question: 'In the future will poverty cease to exist in Israel?',
          answer: "No. 'For destitute people will not cease to exist within the Land' (15:11)",
          zchut: 50,
        },
        {
          question: 'Which four individuals are under Hashem\'s "special protection"?',
          answer: 'A levi, convert, orphan, and widow',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    // --- Added: Deck and Parsha Shoftim (Sefer Dvarim) ---
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Shoftim (Sefer Dvarim)',
      questions: [
        {
          question: 'What is the role of shoftim? What is the role of shotrim?',
          answer: 'Shoftim are judges who pronounce judgment. Shotrim are officers who enforce it.',
          zchut: 50,
        },
        {
          question: "What does Hashem promise a king who doesn't amass much gold, doesn't raise many horses and doesn't marry many wives?",
          answer: 'That his kingdom will endure',
          zchut: 50,
        },
        {
          question: 'Why are reasons for the mitzvot not given?',
          answer: 'Because in two places they were given even the wise King Shlomo stumbled in them.  He amassed too many horses and wives.',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    // --- Added: Deck and Parsha Ki Tetzei (Sefer Dvarim) ---
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Ki Tetzei (Sefer Dvarim)',
      questions: [
        {
          question: 'How does the Torah indirectly warn of dire consequences of marrying a captured woman by the subjects that follow in the Torah reading?',
          answer: 'If you marry her, in time you will come to hate her, and she will give you a rebellious son who may have to be executed',
          zchut: 50,
        },
        {
          question: 'Why does the Torah forbid wearing the clothing of the opposite gender?',
          answer: 'It leads to immorality',
          zchut: 50,
        },
        {
          question: 'Why does the Torah link the mitzvah of sending away the mother bird to a long life?',
          answer: 'The mother can lay more eggs and bring more life into the world. One who is sensitive to perpetuation of life should have his own life lengthened',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    // --- Added: Deck and Parsha Ki Tavo (Sefer Dvarim) ---
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Ki Tavo (Sefer Dvarim)',
      questions: [
        {
          question: 'Bikkurim are from which crops?',
          answer: 'The seven species for which Eretz Yisrael is praised',
          zchut: 50,
        },
        {
          question: 'How is the manner of expressing the curses in Parshat Bechukotai more severe than in this week\'s parsha?',
          answer: "In Bechukotai the Torah speaks in the plural, whereas in this week's Parsha the curses are mentioned in the singular.",
          zchut: 50,
        },
        {
          question: 'Which four groups benefit from the tithes?',
          answer: 'Levites, strangers, widows, and orphans benefit from tithes',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    // --- Added: Deck and Parsha Nitzavim (Sefer Dvarim) ---
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Nitzavim (Sefer Dvarim)',
      questions: [
        {
          question: 'Hashem promises that he will return us to our Land and we will enjoy more goodness than our ancestors.  What will He do to our heart at that time?',
          answer: 'He will circumsize our heart',
          zchut: 50,
        },
        {
          question: '"The hidden things are for Hashem, our G-d, and the revealed things are for us" What does this mean?',
          answer: 'There is collective culpability only for "open" sins, but not for "hidden" ones.',
          zchut: 50,
        },
        {
          question: 'Where is the Torah not to be found? Where is it to be found?',
          answer: 'The Torah is not found in heaven nor across the ocean. Rather, it is "very close to you, in your mouth and in your heart."',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    // --- Added: Deck and Parsha Vayelech (Sefer Dvarim) ---
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: 'Parsha Vayelech (Sefer Dvarim)',
      questions: [
        {
          question: 'How old was Moshe when he died',
          answer: '120',
          zchut: 50,
        },
        {
          question: 'What did Moshe command Yehoshua to be?',
          answer: 'Strong and Courageous',
          zchut: 50,
        },
        {
          question: 'How often does the hakhel (assembly of the Jewish People) take place?',
          answer: 'Once every seven years, in the first year of the new shemitah period.',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    // --- Added: Deck and Parsha Ha'azinu (Sefer Dvarim) ---
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: "Parsha Ha'azinu (Sefer Dvarim)",
      questions: [
        {
          question: 'What is so special about the heavens and the earth that Moshe chooses them as witnesses?',
          answer: 'They endure forever',
          zchut: 50,
        },
        {
          question: 'Why did Hashem separate the peoples of the world into exactly 70 nations?',
          answer: 'Corresponding to the 70 Bnei Yisrael who entered Egypt',
          zchut: 50,
        },
        {
          question: 'If Moshe had spoken to the rock rather than striking it, what would the Jewish People have learned?',
          answer: 'If the rock had produced water without being struck, then the Jewish People would have reasoned that if a rock, which receives no reward or punishment, obeys Hashem\'s commands, all the more so they should too',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
    // --- Added: Deck and Parsha V'Zot HaBracha (Sefer Dvarim) ---
    {
      type: 'deck',
      title: 'Parsha Deck',
      image: '/cards/Parsha Deck.png',
      note: '',
    },
    {
      type: 'qa',
      title: "Parsha V'Zot HaBracha (Sefer Dvarim)",
      questions: [
        {
          question: 'Why was Binyamin blessed before Yosef?',
          answer: 'Because the Beit Hamikdash, built in Binyamin\'s portion, was "more beloved" than the Mishkan built in Yosef\'s portion.',
          zchut: 50,
        },
        {
          question: 'Who wrote the last eight verses in the Torah, starting with the verse "and Moshe died"?',
          answer: 'According to one opinion, Yehoshua wrote it. Rabbi Meir says Moshe himself wrote it with tears.',
          zchut: 50,
        },
        {
          question: 'Who buried Moshe?',
          answer: 'According to one opinion, Hashem buried Moshe. According to Rabbi Yishmael, Moshe buried himself.',
          zchut: 50,
        },
      ],
      note: 'If you get all three answers you can pick a Har HaBayit card',
    },
  ]; // End of cards array

  const handleShowAnswer = (idx) => {
    setShownAnswers((prev) => [...prev, idx]);
  };

  const handleClaimZchut = (idx) => {
    if (claimedQuestions.includes(idx)) return;
    setClaimedQuestions((prev) => [...prev, idx]);
    const zchut = (cardsState || cards)[cardIndex].questions[idx].zchut;
    setPlayers((prevPlayers) => {
      return prevPlayers.map((p) =>
        p.index === currentPlayer.index ? { ...p, zchutPoints: (p.zchutPoints || 0) + zchut } : p
      );
    });
    alert(`${currentPlayer.name} received ${zchut} Zchut!`);
  };

  const handleNext = () => {
    setShownAnswers([]);
    setClaimedQuestions([]);
    setCardIndex((prev) => Math.min(prev + 1, (cardsState || cards).length - 1));
  };

  const handleBack = () => {
    setShownAnswers([]);
    setClaimedQuestions([]);
    setCardIndex((prev) => Math.max(prev - 1, 0));
  };

  const safeIndex = Math.max(0, Math.min(cardIndex, (cardsState || cards).length - 1));
  const currentCard = (cardsState || cards)[safeIndex];

  if (!currentCard) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <h2>{currentCard.title}</h2>
        {currentCard.type === 'deck' ? (
          <div style={{ textAlign: 'center', margin: '32px 0' }}>
            <img
              src={currentCard.image}
              alt="Parsha Deck"
              style={{
                maxWidth: '650px',
                width: '95%',
                maxHeight: '480px',
                height: 'auto',
                margin: '0 auto 32px auto',
                borderRadius: 16,
                boxShadow: '0 4px 24px #aaa',
                display: 'block',
              }}
            />
          </div>
        ) : (
          <>
            {currentCard.questions.map((q, idx) => (
              <div key={idx} style={{ marginBottom: 18, textAlign: 'left', borderBottom: '1px solid #eee', paddingBottom: 10 }}>
                <strong>Q{idx + 1}: {q.question}</strong><br />
                <span style={{ color: '#28a745' }}>Zchut:</span> {q.zchut}<br />
                {!shownAnswers.includes(idx) && (
                  <button style={modalStyles.button} onClick={() => handleShowAnswer(idx)}>Show Answer</button>
                )}
                {shownAnswers.includes(idx) && (
                  <>
                    <span style={{ color: '#007bff' }}>Answer:</span> {q.answer}<br />
                    <button
                      style={{ ...modalStyles.button, backgroundColor: claimedQuestions.includes(idx) ? '#ccc' : '#28a745' }}
                      onClick={() => handleClaimZchut(idx)}
                      disabled={claimedQuestions.includes(idx)}
                    >
                      {claimedQuestions.includes(idx) ? 'Zchut Claimed' : 'Claim Zchut'}
                    </button>
                  </>
                )}
              </div>
            ))}
            <div style={{ margin: '16px 0', color: '#6f42c1', fontWeight: 'bold' }}>
              {currentCard.note}
            </div>
          </>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
          <button style={modalStyles.button} onClick={handleBack} disabled={safeIndex === 0}>Back</button>
          <button style={modalStyles.button} onClick={handleNext} disabled={safeIndex === (cardsState || cards).length - 1}>Next</button>
          <button style={modalStyles.button} onClick={onClose}>Close</button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 12 }}>
          <button style={{ ...modalStyles.button, backgroundColor: '#ff9800' }} onClick={handleShuffle}>Shuffle Parsha</button>
          <button style={{ ...modalStyles.button, backgroundColor: '#007bff' }} onClick={handleReturn}>Return Parsha</button>
        </div>
      </div>
    </div>
  );
}
// --- Tzadik Card Modal ---
function TzadikCardModal({ open, onClose, currentPlayer, setPlayers, cardIndex, setCardIndex }) {
  const [shownAnswers, setShownAnswers] = useState([]);
  const [claimedQuestions, setClaimedQuestions] = useState([]);
  if (!open) return null;

  const currentCard = tzadikCards[cardIndex];

  const handleShowAnswer = (idx) => {
    setShownAnswers((prev) => [...prev, idx]);
  };

  const handleClaimZchut = (idx) => {
    if (claimedQuestions.includes(idx)) return;
    setClaimedQuestions((prev) => [...prev, idx]);
    const zchut = currentCard.questions[idx].zchut;
    setPlayers((prevPlayers) => {
      return prevPlayers.map((p) =>
        p.index === currentPlayer.index ? { ...p, zchutPoints: (p.zchutPoints || 0) + zchut } : p
      );
    });
    alert(`${currentPlayer.name} received ${zchut} Zchut!`);
  };

  const handleNextCard = () => {
    setCardIndex((prev) => (prev + 1) % tzadikCards.length);
    setShownAnswers([]);
    setClaimedQuestions([]);
  };
  const handlePrevCard = () => {
    setCardIndex((prev) => (prev - 1 + tzadikCards.length) % tzadikCards.length);
    setShownAnswers([]);
    setClaimedQuestions([]);
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <h2>{currentCard.name} Card</h2>
        {currentCard.questions.map((q, idx) => (
          <div key={idx} style={{ marginBottom: 18, textAlign: 'left', borderBottom: '1px solid #eee', paddingBottom: 10 }}>
            <strong>Q{idx + 1}: {q.question}</strong><br />
            <span style={{ color: '#28a745' }}>Zchut:</span> {q.zchut}<br />
            {!shownAnswers.includes(idx) ? (
              <button style={modalStyles.button} onClick={() => handleShowAnswer(idx)}>Show Answer</button>
            ) : (
              <>
                <span style={{ color: '#007bff' }}>Answer:</span> {q.answer}<br />
                <button
                  style={{ ...modalStyles.button, backgroundColor: claimedQuestions.includes(idx) ? '#ccc' : '#28a745' }}
                  onClick={() => handleClaimZchut(idx)}
                  disabled={claimedQuestions.includes(idx)}
                >
                  {claimedQuestions.includes(idx) ? 'Zchut Claimed' : 'Claim Zchut'}
                </button>
              </>
            )}
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <button style={modalStyles.button} onClick={handlePrevCard}>Previous</button>
          <button style={modalStyles.button} onClick={handleNextCard}>Next</button>
        </div>
        <button style={modalStyles.button} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
// --- Har HaBayit Card Modal ---
// ...existing code...
function HarHaBayitCardModal({ open, onClose, currentPlayer, setPlayers, cardIndex, setCardIndex }) {
  const [shownAnswers, setShownAnswers] = React.useState([]);
  const [claimedQuestions, setClaimedQuestions] = React.useState([]);
  React.useEffect(() => {
    if (!open) {
      setShownAnswers([]);
      setClaimedQuestions([]);
    }
  }, [open]);
  if (!open) return null;

  const currentCard = harHaBayitCards[cardIndex];

  const handleShowAnswer = (idx) => {
    setShownAnswers((prev) => [...prev, idx]);
  };

  const handleClaimZchut = (idx) => {
    if (claimedQuestions.includes(idx)) return;
    setClaimedQuestions((prev) => [...prev, idx]);
    // Support both 'points' and 'zchut' fields for compatibility
    const q = currentCard.questions[idx];
    const zchut = q.zchut || q.points || 0;
    setPlayers((prevPlayers) => {
      return prevPlayers.map((p) =>
        p.index === currentPlayer.index ? { ...p, zchutPoints: (p.zchutPoints || 0) + zchut } : p
      );
    });
    alert(`${currentPlayer.name} received ${zchut} Zchut!`);
  };

  const handleNextCard = () => {
    setCardIndex((prev) => (prev + 1) % harHaBayitCards.length);
    setShownAnswers([]);
    setClaimedQuestions([]);
  };
  const handlePrevCard = () => {
    setCardIndex((prev) => (prev - 1 + harHaBayitCards.length) % harHaBayitCards.length);
    setShownAnswers([]);
    setClaimedQuestions([]);
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <h2>{currentCard.name} Card</h2>
        {currentCard.questions.map((q, idx) => (
          <div key={idx} style={{ marginBottom: 18, textAlign: 'left', borderBottom: '1px solid #eee', paddingBottom: 10 }}>
            <strong>Q{idx + 1}: {q.question}</strong><br />
            <span style={{ color: '#28a745' }}>Zchut:</span> {q.zchut || q.points}<br />
            {!shownAnswers.includes(idx) && (
              <button style={modalStyles.button} onClick={() => handleShowAnswer(idx)}>Show Answer</button>
            )}
            {shownAnswers.includes(idx) && (
              <>
                <span style={{ color: '#007bff' }}>Answer:</span> {q.answer}<br />
                <button
                  style={{ ...modalStyles.button, backgroundColor: claimedQuestions.includes(idx) ? '#ccc' : '#28a745' }}
                  onClick={() => handleClaimZchut(idx)}
                  disabled={claimedQuestions.includes(idx)}
                >
                  {claimedQuestions.includes(idx) ? 'Zchut Claimed' : 'Claim Zchut'}
                </button>
              </>
            )}
          </div>
        ))}
        <div style={{ margin: '16px 0', color: '#6f42c1', fontWeight: 'bold' }}>
          If you get all answers correct you can pick a Tzadik card
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <button style={modalStyles.button} onClick={handlePrevCard}>Previous</button>
          <button style={modalStyles.button} onClick={handleNextCard}>Next</button>
        </div>
        <button style={modalStyles.button} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
function MazalCardModal({ open, onClose, currentPlayer, setPlayers, mazalCard, onAccept }) {
  const [showReward, setShowReward] = useState(false);
  useEffect(() => {
    if (open) {
      setShowReward(false);
    }
  }, [open, mazalCard]);
  if (!open) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <h2>{mazalCard.name} Card</h2>
        <p>{mazalCard.text}</p>
        {!showReward ? (
          <button style={modalStyles.button} onClick={() => setShowReward(true)}>Show Mazal</button>
        ) : (
          <>
            {/* Special logic for Aliyah boom card */}
            {mazalCard.special === "aliyahBoom" ? (
              <button style={modalStyles.button} onClick={() => {
                // Get owned properties
                const ownedProps = Object.values(boardEvents)
                  .map(e => e.card)
                  .filter(card => card.ownerIndex === currentPlayer.index && card.type === "property");
                if (ownedProps.length === 0) {
                  alert("You don't own any properties!");
                  onClose();
                  return;
                }
                let propList = ownedProps.map((p, i) => (i+1) + ': ' + p.name + ' (Houses: ' + (p.houses||0) + ', Hotel: ' + (p.hotel ? 'Yes' : 'No') + ')').join('\n');
                let idx = parseInt(prompt('Choose a property for your free house/hotel (enter number):\n' + propList));
                if (isNaN(idx) || idx < 1 || idx > ownedProps.length) {
                  alert('Invalid selection.');
                  return;
                }
                let prop = ownedProps[idx-1];
                if (!prop.hotel && prop.houses < 4) {
                  prop.houses = (prop.houses || 0) + 1;
                  alert('You received a free house on ' + prop.name + '!');
                } else if (!prop.hotel && prop.houses === 4) {
                  prop.houses = 0;
                  prop.hotel = true;
                  alert('You received a free hotel on ' + prop.name + '!');
                } else {
                  alert('This property already has a hotel. No upgrade possible.');
                }
                onClose();
              }}>
                Choose Property for Free House/Hotel
              </button>
            ) : (
              <>
                {typeof mazalCard.reward !== 'undefined' && (
                  mazalCard.rewardType === "moneyAndZchut" ? (
                    <>
                      <p>Reward: $ {mazalCard.reward.money} and {mazalCard.reward.zchut} Zchut</p>
                      <button style={modalStyles.button} onClick={onAccept}>Accept Reward</button>
                    </>
                  ) : (
                    <>
                      <p>Reward: {mazalCard.rewardType === "zchut" ? (mazalCard.reward + ' Zchut') : ('$' + mazalCard.reward)}</p>
                      <button style={modalStyles.button} onClick={onAccept}>Accept Reward</button>
                    </>
                  )
                )}
              </>
            )}
            {mazalCard.penalty && (
              <>
                <p>Penalty: {mazalCard.penaltyType === "zchut" ? (mazalCard.penalty + ' Zchut') : ('$' + mazalCard.penalty)}</p>
                {/* Show Tzedaka fund note only for the two $1000 penalty cards */}
                {(mazalCard.buttonText === "Give the bank $1000") && (
                  <div style={{ fontSize: 13, color: '#555', margin: '8px 0 0 0' }}>
                    Note: The bank has given these funds to the Tzedaka fund. So you may end up getting this back.
                  </div>
                )}
                <button style={modalStyles.button} onClick={onAccept}>{mazalCard.buttonText || "Accept Penalty"}</button>
              </>
            )}
          </>
        )}
        <button style={modalStyles.button} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
import Dice from "react-dice-roll";

// --- Board Image path ---
const boardImage = "/torahpoly_board.png";

// --- Red Properties ---
const schemRoyalEstates = { type: "property", name: "Schem Royal Estates", colorGroup: "red", price: 300, rent: { base: 60, house1: 150, house2: 350, house3: 700, hotel: 800 }, buildCost: { house: 200, hotel: 300 }, houses: 0, hotel: false, ownerIndex: null };
const schemYosephGardens = { type: "property", name: "Schem Yoseph Gardens", colorGroup: "red", price: 300, rent: { base: 60, house1: 150, house2: 350, house3: 700, hotel: 800 }, buildCost: { house: 200, hotel: 300 }, houses: 0, hotel: false, ownerIndex: null };
const schemDreamResorts = { type: "property", name: "Schem Dream Resorts", colorGroup: "red", price: 300, rent: { base: 50, house1: 100, house2: 650, house3: 750, hotel: 750 }, buildCost: { house: 150, hotel: 250 }, houses: 0, hotel: false, ownerIndex: null };

// --- Yellow Property ---
const ephraimHilltops = { type: "property", name: "Ephraim Hilltops", colorGroup: "yellow", price: 300, rent: { base: 50, house1: 300, house2: 400, house3: 500, hotel: 800 }, buildCost: { house: 50, hotel: 100 }, houses: 0, hotel: false, ownerIndex: null };

// --- Green Properties ---
const gushKatif = { type: "property", name: "Gush Katif", colorGroup: "green", price: 350, rent: { base: 60, house1: 150, house2: 350, house3: 700, hotel: 1000 }, buildCost: { house: 150, hotel: 250 }, houses: 0, hotel: false, ownerIndex: null };
const neveDekalim = { type: "property", name: "Neve Dekalim", colorGroup: "green", price: 350, rent: { base: 50, house1: 200, house2: 300, house3: 650, hotel: 800 }, buildCost: { house: 150, hotel: 200 }, houses: 0, hotel: false, ownerIndex: null };
const ganOr = { type: "property", name: "Gan Or", colorGroup: "green", price: 350, rent: { base: 50, house1: 100, house2: 300, house3: 650, hotel: 800 }, buildCost: { house: 150, hotel: 200 }, houses: 0, hotel: false, ownerIndex: null };

// --- Purple Properties ---
const jerusalemHills = { type: "property", name: "Jerusalem Hills", colorGroup: "purple", price: 150, rent: { base: 10, house1: 200, house2: 250, house3: 300, hotel: 400 }, buildCost: { house: 50, hotel: 100 }, houses: 0, hotel: false, ownerIndex: null };
const jerusalemHillsOrchard = { type: "property", name: "Jerusalem Hills Orchard", colorGroup: "purple", price: 150, rent: { base: 10, house1: 200, house2: 250, house3: 300, hotel: 400 }, buildCost: { house: 50, hotel: 100 }, houses: 0, hotel: false, ownerIndex: null };

// --- Gold Properties ---
const hevronElonMamrei = { type: "property", name: "Hevron Elon Mamrei", colorGroup: "gold", price: 240, rent: { base: 30, house1: 70, house2: 200, house3: 550, hotel: 650 }, buildCost: { house: 80, hotel: 150 }, houses: 0, hotel: false, ownerIndex: null };
const hevronLuxuryCondos = { type: "property", name: "Hevron Luxury Condos", colorGroup: "gold", price: 180, rent: { base: 25, house1: 60, house2: 175, house3: 500, hotel: 600 }, buildCost: { house: 60, hotel: 100 }, houses: 0, hotel: false, ownerIndex: null };
const hevronHiTech = { type: "property", name: "Hevron Hi Tech", colorGroup: "gold", price: 180, rent: { base: 25, house1: 60, house2: 175, house3: 500, hotel: 600 }, buildCost: { house: 60, hotel: 100 }, houses: 0, hotel: false, ownerIndex: null };

// --- Board events map ---
const boardEvents = {
  1: { type: "property", card: schemYosephGardens },
  3: { type: "property", card: schemRoyalEstates },
  4: { type: "property", card: schemDreamResorts },
  7: { type: "property", card: ephraimHilltops },
  11: { type: "property", card: gushKatif },
  12: { type: "property", card: neveDekalim },
  14: { type: "property", card: ganOr },
  28: { type: "property", card: jerusalemHillsOrchard },
  29: { type: "property", card: jerusalemHills },
  35: { type: "property", card: hevronElonMamrei },
  37: { type: "property", card: hevronLuxuryCondos },
  38: { type: "property", card: hevronHiTech },
};

// --- Build 44 board positions ---
function buildBoardPositions(refSize = 1200, margin = 100, spacesPerSide = 11) {
  const positions = [];
  const step = (refSize - 2 * margin) / (spacesPerSide - 1);

  const topY = margin;
  for (let i = 0; i < spacesPerSide; i++) positions.push({ x: Math.round(margin + i * step), y: topY });
  const rightX = refSize - margin;
  for (let i = 1; i < spacesPerSide; i++) positions.push({ x: rightX, y: Math.round(topY + i * step) });
  const bottomY = refSize - margin;
  for (let i = 1; i < spacesPerSide; i++) positions.push({ x: Math.round(rightX - i * step), y: bottomY });
  const leftX = margin;
  for (let i = 1; i < spacesPerSide - 1; i++) positions.push({ x: leftX, y: Math.round(bottomY - i * step) });

  return positions.slice(0, 44);
}

const referenceSize = 1200;
const defaultBoardPositions = buildBoardPositions(referenceSize, 100, 11);

// --- Helper to calculate rent ---
const calculateRent = (card) => {
  if (card.hotel) return card.rent.hotel;
  switch (card.houses) {
    case 3: return card.rent.house3;
    case 2: return card.rent.house2;
    case 1: return card.rent.house1;
    default: return card.rent.base;
  }
};



// --- Rescue Modal ---

function RescueModal({ open, onClose, currentPlayer, rentAmount, players, setPlayers }) {
  if (!open) return null;
  const shortfall = rentAmount - (currentPlayer.money || 0);
  // Zchut calculation: needy player can sell up to their zchutPoints (2 Zchut per $1)
  const zchutAvailable = currentPlayer.zchutPoints || 0;
  const maxZchutDollars = Math.min(500, Math.floor(zchutAvailable / 2));
  const maxZchut = maxZchutDollars * 2;
  // List properties at 25% discount
  const ownedProperties = Object.values(boardEvents)
    .map(e => e.card)
    .filter(card => card.ownerIndex === currentPlayer.index);

  // Handle Buy Zchut
  const handleBuyZchut = () => {
    // Prompt for rescuing player
    const rescuers = players.filter(p => p.index !== currentPlayer.index);
    if (rescuers.length === 0) {
      alert("No other players to rescue!");
      return;
    }
    const rescuerNames = rescuers.map((p, i) => `${i + 1}: ${p.name}`).join("\n");
    const rescuerIdx = parseInt(prompt(`Who wants to buy Zchut from ${currentPlayer.name}?\n${rescuerNames}\nEnter number:`));
    if (isNaN(rescuerIdx) || rescuerIdx < 1 || rescuerIdx > rescuers.length) {
      alert("Invalid player selection.");
      return;
    }
    const rescuer = rescuers[rescuerIdx - 1];
    // Max the rescuer can buy is the lesser of their money or the needy player's available Zchut
    const maxBuyableDollars = Math.min(rescuer.money, maxZchutDollars);
    if (maxBuyableDollars < 1) {
      alert("Not enough money to buy Zchut or not enough Zchut to sell.");
      return;
    }
    const amount = parseInt(prompt(`How much money do you want to give to ${currentPlayer.name}? (Max $${maxBuyableDollars})`));
    if (isNaN(amount) || amount <= 0 || amount > maxBuyableDollars) {
      alert("Invalid amount.");
      return;
    }
    // Update players: needy player loses Zchut, gets money; rescuer loses money, gains Zchut
    const updatedPlayers = players.map(p => {
      if (p.index === currentPlayer.index) {
        return { ...p, money: p.money + amount, zchutPoints: p.zchutPoints - amount * 2 };
      } else if (p.index === rescuer.index) {
        return { ...p, money: p.money - amount, zchutPoints: (p.zchutPoints || 0) + amount * 2 };
      } else {
        return p;
      }
    });
    setPlayers(updatedPlayers);
    alert(`${rescuer.name} gave $${amount} to ${currentPlayer.name}.\n${rescuer.name} receives ${amount * 2} Zchut!`);
    onClose();
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <h2>Rescue Options</h2>
        <p>
          {currentPlayer.name}, you cannot pay ${rentAmount} rent.<br />
          <b>Current Money:</b> ${currentPlayer.money || 0}<br />
          <b>Current Zchut:</b> {currentPlayer.zchutPoints || 0}<br />
          You are missing <b>${shortfall > 0 ? shortfall : 0}</b>.
        </p>
        <p style={{ marginTop: 18, fontWeight: 'bold', color: '#007bff' }}>Any offers to rescue {currentPlayer.name}?</p>

        <button style={{ ...modalStyles.button, backgroundColor: "#28a745" }} onClick={handleBuyZchut}>Buy Zchut</button>
        <div style={{ fontSize: 14, marginBottom: 10, color: '#333' }}>
          {currentPlayer.name} needs money and can sell Zchut!<br />
          <br />
          Get 2 Zchut for every $1<br />
          Get up to {maxZchut} Zchut for ${maxZchutDollars} (if you buy all available)
        </div>

        <button style={{ ...modalStyles.button, backgroundColor: "#ffc107", color: "#333" }} onClick={() => {
          if (ownedProperties.length === 0) {
            alert("This player owns no properties.");
            onClose();
            return;
          }
          // Prompt for buyer
          const buyers = players.filter(p => p.index !== currentPlayer.index);
          if (buyers.length === 0) {
            alert("No other players to buy property!");
            onClose();
            return;
          }
          const buyerNames = buyers.map((p, i) => `${i + 1}: ${p.name}`).join("\n");
          const buyerIdx = parseInt(prompt(`Who wants to buy a property from ${currentPlayer.name}?\n${buyerNames}\nEnter number:`));
          if (isNaN(buyerIdx) || buyerIdx < 1 || buyerIdx > buyers.length) {
            alert("Invalid player selection.");
            return;
          }
          const buyer = buyers[buyerIdx - 1];
          // Prompt for property
          const propList = ownedProperties.map((prop, i) => `${i + 1}: ${prop.name} ($${Math.round(prop.price * 0.75)})`).join("\n");
          const propIdx = parseInt(prompt(`Which property to buy from ${currentPlayer.name}? Enter number:\n` + propList));
          if (isNaN(propIdx) || propIdx < 1 || propIdx > ownedProperties.length) {
            alert("Invalid property selection.");
            return;
          }
          const prop = ownedProperties[propIdx - 1];
          const price = Math.round(prop.price * 0.75);
          // Offer to pay more (chesed)
          const chesedOffer = prompt(`Do a chesed for ${currentPlayer.name} and offer to pay more than the property is worth.\nEnter your offer (minimum $${price}):`);
          const offerAmount = parseInt(chesedOffer);
          if (isNaN(offerAmount) || offerAmount < price) {
            alert(`Offer must be at least $${price} and a valid number.`);
            return;
          }
          if (buyer.money < offerAmount) {
            alert(`${buyer.name} does not have enough money for this offer.`);
            return;
          }
          // Accept offer
          if (!window.confirm(`${currentPlayer.name}, do you accept this offer of $${offerAmount} for ${prop.name} from ${buyer.name}?`)) {
            alert("Offer not accepted.");
            return;
          }
          // Update property owner and player balances
          prop.ownerIndex = buyer.index;
          const updatedPlayers = players.map(p => {
            if (p.index === currentPlayer.index) {
              return { ...p, money: p.money + offerAmount };
            } else if (p.index === buyer.index) {
              return { ...p, money: p.money - offerAmount };
            } else {
              return p;
            }
          });
          setPlayers(updatedPlayers);
          alert(`${buyer.name} bought ${prop.name} from ${currentPlayer.name} for $${offerAmount}`);
          onClose();
        }}>Buy Property</button>
        <div style={{ fontSize: 14, color: '#333', marginBottom: 10 }}>
          {ownedProperties.length === 0 ? (
            <span>This player owns no properties.</span>
          ) : (
            <>
              <span>Properties available at 25% discount:</span>
              <ul style={{ textAlign: 'left', margin: '8px 0 0 20px', padding: 0 }}>
                {ownedProperties.map((prop, idx) => (
                  <li key={idx}>
                    {prop.name}: <s>${prop.price}</s> <b>${Math.round(prop.price * 0.75)}</b>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <button style={modalStyles.button} onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

// --- Card Modal ---
function CardModal({ card, onClose, mode, currentPlayer, updatePlayer, players, updatePlayers, onRescue }) {
    // Helper: Can buy house?
    const canBuyHouse = () => {
      return card.ownerIndex === currentPlayer.index && !card.hotel && card.houses < 4 && currentPlayer.money >= card.buildCost.house;
    };
    // Helper: Can buy hotel?
    const canBuyHotel = () => {
      return card.ownerIndex === currentPlayer.index && !card.hotel && card.houses === 4 && currentPlayer.money >= card.buildCost.hotel;
    };

    const handleBuyHouse = () => {
      if (!canBuyHouse()) {
        alert('Cannot buy house. Make sure you own the property, have less than 4 houses, no hotel, and enough money.');
        return;
      }
      const updatedPlayers = [...players];
      updatedPlayers[currentPlayer.index] = { ...currentPlayer, money: currentPlayer.money - card.buildCost.house };
      card.houses = (card.houses || 0) + 1;
      updatePlayers(updatedPlayers);
      alert('You bought a house on ' + card.name + ' for $' + card.buildCost.house + '.');
    };

    const handleBuyHotel = () => {
      if (!canBuyHotel()) {
        alert('Cannot buy hotel. You need 4 houses, no hotel, and enough money.');
        return;
      }
      const updatedPlayers = [...players];
      updatedPlayers[currentPlayer.index] = { ...currentPlayer, money: currentPlayer.money - card.buildCost.hotel };
      card.houses = 0;
      card.hotel = true;
      updatePlayers(updatedPlayers);
      alert('You bought a hotel on ' + card.name + ' for $' + card.buildCost.hotel + '.');
    };
  if (!card) return null;
  const isProperty = mode === "property";

  const handleBuyProperty = () => {
    if (currentPlayer.money < card.price) { alert("Not enough money!"); return; }
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayer.index] = { ...currentPlayer, money: currentPlayer.money - card.price };
    card.ownerIndex = currentPlayer.index;
    updatePlayers(updatedPlayers);
    alert(`${currentPlayer.name} bought ${card.name} for $${card.price}`);
    onClose();
  };

  const handlePayRent = () => {
    if (card.ownerIndex === null || card.ownerIndex === currentPlayer.index) {
      alert("No rent needed.");
      onClose();
      return;
    }

    const rentAmount = calculateRent(card);

    if (currentPlayer.money >= rentAmount) {
      const updatedPlayers = [...players];
      updatedPlayers[currentPlayer.index].money -= rentAmount;
      updatedPlayers[card.ownerIndex].money += rentAmount;
      updatePlayers(updatedPlayers);
      alert(`${currentPlayer.name} paid $${rentAmount} rent to ${players[card.ownerIndex].name}`);
      onClose();
    } else {
      // Trigger Rescue Modal if not enough money
      onClose();
      if (onRescue) onRescue(currentPlayer, rentAmount);
    }
  };

  const handleTrade = () => {
    const targetPlayerIndex = prompt("Enter the player number you want to trade with:");
    const targetPlayer = players.find(p => p.index === parseInt(targetPlayerIndex));
    if (!targetPlayer) { alert("Invalid player!"); return; }

    const targetProps = Object.values(boardEvents).map(e => e.card).filter(c => c.ownerIndex === targetPlayer.index);
    if (targetProps.length === 0) { alert(`${targetPlayer.name} owns no properties.`); return; }

    const propIndex = prompt(`Which property to buy from ${targetPlayer.name}? Enter number:\n` +
      targetProps.map((p, i) => `${i}: ${p.name}`).join("\n")
    );
    const selectedProp = targetProps[propIndex];
    if (!selectedProp) { alert("Invalid property choice."); return; }

    const offerAmount = parseInt(prompt(`Offer how much money for ${selectedProp.name}?`));
    if (isNaN(offerAmount) || offerAmount <= 0) { alert("Invalid amount."); return; }
    if (currentPlayer.money < offerAmount) { alert("You don't have enough money."); return; }

    const updatedPlayers = [...players];
    updatedPlayers[currentPlayer.index].money -= offerAmount;
    updatedPlayers[targetPlayer.index].money += offerAmount;
    selectedProp.ownerIndex = currentPlayer.index;
    updatePlayers(updatedPlayers);
    alert(`${currentPlayer.name} bought ${selectedProp.name} from ${targetPlayer.name} for $${offerAmount}`);
    onClose();
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <h2>{card.name}</h2>
        {isProperty && (
          <>
            <div style={{ height: 20, backgroundColor: card.colorGroup, marginBottom: 10, borderRadius: 4 }}></div>
            <p>Price: ${card.price}</p>
            <p>Rent: ${card.rent.base}</p>
            <p>Rent with 1 House: ${card.rent.house1}</p>
            <p>Rent with 2 Houses: ${card.rent.house2}</p>
            <p>Rent with 3 Houses: ${card.rent.house3}</p>
            <p>Rent with Hotel: ${card.rent.hotel}</p>
            <p>Houses: {card.houses || 0} (Cost: ${card.buildCost.house} each)</p>
            <p>Hotel: {card.hotel ? 'Yes' : 'No'} (Cost: ${card.buildCost.hotel})</p>
            <p>Owner: {card.ownerIndex !== null ? `Player ${card.ownerIndex + 1}` : "None"}</p>
            <p>Your Money: ${currentPlayer.money}</p>
            <p>Your Zchut Points: {currentPlayer.zchutPoints}</p>

            {card.ownerIndex === null && <button style={{ ...modalStyles.button, backgroundColor: "green" }} onClick={handleBuyProperty}>Buy Property</button>}
            {card.ownerIndex !== currentPlayer.index && card.ownerIndex !== null && <button style={{ ...modalStyles.button, backgroundColor: "orange" }} onClick={handlePayRent}>Pay Rent</button>}
            {card.ownerIndex !== currentPlayer.index && <button style={{ ...modalStyles.button, backgroundColor: "purple" }} onClick={handleTrade}>Trade Property</button>}
            {/* Buy House/Hotel buttons for property owner */}
            {card.ownerIndex === currentPlayer.index && !card.hotel && card.houses < 4 && (
              <button style={{ ...modalStyles.button, backgroundColor: '#007bff', color: '#fff' }} onClick={handleBuyHouse}>
                Buy House (${card.buildCost.house})
              </button>
            )}
            {card.ownerIndex === currentPlayer.index && !card.hotel && card.houses === 4 && (
              <button style={{ ...modalStyles.button, backgroundColor: '#b8860b', color: '#fff' }} onClick={handleBuyHotel}>
                Buy Hotel (${card.buildCost.hotel})
              </button>
            )}
            <button style={modalStyles.button} onClick={onClose}>Close</button>
          </>
        )}
      </div>
    </div>
  );
}

// --- Player Panel Modal ---
function PlayerPanelModal({ player, onClose }) {
  if (!player) return null;

  const ownedProperties = Array.from(
    new Set(
      Object.values(boardEvents)
        .map((e) => e.card)
        .filter((card) => card.ownerIndex === player.index)
    )
  );

  const calculateCurrentRent = (card) => {
    if (card.hotel) return card.rent.hotel;
    switch (card.houses) {
      case 3: return card.rent.house3;
      case 2: return card.rent.house2;
      case 1: return card.rent.house1;
      default: return card.rent.base;
    }
  };

  const useTwoColumns = ownedProperties.length > 5;
  const columnStyle = useTwoColumns
    ? { display: "flex", flexWrap: "wrap", justifyContent: "space-between" }
    : { textAlign: "left" };
  const itemStyle = useTwoColumns
    ? { width: "48%", marginBottom: 12 }
    : { marginBottom: 8 };

  // Access currentPlayerIndex from window if available (since modal is outside main App scope)
  const currentPlayerIndex = window?.currentPlayerIndex;
  const isCurrentPlayer = typeof currentPlayerIndex === 'number' && player.index === currentPlayerIndex;

  const handleBuyHouseHotel = () => {
    if (ownedProperties.length === 0) {
      alert("You don't own any properties!");
      return;
    }
    // Prompt for property
    const propList = ownedProperties.map((p, i) => `${i + 1}: ${p.name} (Houses: ${p.houses || 0}, Hotel: ${p.hotel ? 'Yes' : 'No'}, House Cost: $${p.buildCost.house}, Hotel Cost: $${p.buildCost.hotel})`).join('\n');
    const idx = parseInt(prompt(`Choose a property to build on (enter number):\n${propList}`));
    if (isNaN(idx) || idx < 1 || idx > ownedProperties.length) {
      alert('Invalid selection.');
      return;
    }
    const prop = ownedProperties[idx - 1];
    // Determine build type
    let buildType = 'house';
    if (!prop.hotel && prop.houses === 4) buildType = 'hotel';
    if (prop.hotel) {
      alert('This property already has a hotel. No upgrade possible.');
      return;
    }
    // Check funds
    const cost = buildType === 'house' ? prop.buildCost.house : prop.buildCost.hotel;
    if (player.money < cost) {
      alert(`Not enough money. You need $${cost} to buy a ${buildType}.`);
      return;
    }
    // Confirm
    if (!window.confirm(`Buy a ${buildType} on ${prop.name} for $${cost}?`)) return;
    // Update player and property
    // Update boardEvents and players globally
    if (typeof window.setPlayers === 'function') {
      window.setPlayers(prevPlayers => prevPlayers.map(p =>
        p.index === player.index ? { ...p, money: p.money - cost } : p
      ));
    }
    // Update property
    prop.houses = buildType === 'house' ? (prop.houses || 0) + 1 : 0;
    prop.hotel = buildType === 'hotel';
    alert(`You bought a ${buildType} on ${prop.name}!`);
    // Force asset update by closing and reopening modal
    onClose();
    setTimeout(() => window.setShowPanel && window.setShowPanel(player.index), 300);
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <h2>{player.name}'s Properties</h2>
        {ownedProperties.length === 0 ? (
          <p>No properties owned.</p>
        ) : (
          <div style={columnStyle}>
            {ownedProperties.map((prop, idx) => (
              <div key={idx} style={itemStyle}>
                <div style={{ height: 16, width: 60, backgroundColor: prop.colorGroup, borderRadius: 4, marginBottom: 4 }}></div>
                <strong>{prop.name}</strong><br />
                Price: ${prop.price}<br />
                Houses: {prop.houses}, Hotel: {prop.hotel ? "Yes" : "No"}<br />
                House Cost: ${prop.buildCost.house}, Hotel Cost: ${prop.buildCost.hotel}<br />
                Current Rent: ${calculateCurrentRent(prop)}
              </div>
            ))}
          </div>
        )}
        <div style={{ marginTop: 16 }}>
          <button
            style={{ ...modalStyles.button, backgroundColor: isCurrentPlayer ? '#28a745' : '#ccc', marginRight: 8 }}
            onClick={handleBuyHouseHotel}
            disabled={!isCurrentPlayer}
          >
            Buy House/Hotel
          </button>
          <button style={modalStyles.button} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}



// --- Main App ---

function App() {
          // Square 21: Sell your brother event state
          const [pendingSellBrother, setPendingSellBrother] = useState(false);
          const [sellBrotherPlayerIndex, setSellBrotherPlayerIndex] = useState(null);
        // --- Jewish Idea Yeshiva event state ---
        const [yeshivaState, setYeshivaState] = useState({}); // { [playerIndex]: { count: 0, active: false } }
      // TEMP: Test button to land on 15
      const testLandOn15 = () => {
        if (!gameStarted) return;
        const player = players[currentPlayerIndex];
        const steps = (15 - player.position + boardPositions.length) % boardPositions.length;
        if (steps === 0) return; // Already on 15
        movePlayerBy(steps);
      };

      // TEMP: Test button to land on 21
      const testLandOn21 = () => {
        if (!gameStarted) return;
        const player = players[currentPlayerIndex];
        const steps = (21 - player.position + boardPositions.length) % boardPositions.length;
        if (steps === 0) return; // Already on 21
        movePlayerBy(steps);
      };
    // --- Special event for square 15 ---
    const [pendingHamanReward, setPendingHamanReward] = useState(false);
    const [hamanPlayerIndex, setHamanPlayerIndex] = useState(null);
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerColor, setNewPlayerColor] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  // Expose currentPlayerIndex for modals
  useEffect(() => {
    window.currentPlayerIndex = currentPlayerIndex;
  }, [currentPlayerIndex]);
  const [qaMode, setQaMode] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [boardWidth, setBoardWidth] = useState(Math.min(window.innerWidth * 0.95, referenceSize));
  const [boardPositions, setBoardPositions] = useState(defaultBoardPositions);
  const [diceRolls, setDiceRolls] = useState([]);
  const [showPanel, setShowPanel] = useState(null);
  // Rescue modal state
  const [showRescueModal, setShowRescueModal] = useState(false);
  const [rescueInfo, setRescueInfo] = useState({ player: null, rent: 0 });
  // Manna Foods modal state
  const [showMannaModal, setShowMannaModal] = useState(false);
  // Manna Foods state
  const [mannaPayer, setMannaPayer] = useState(null);
  const [mannaAmount, setMannaAmount] = useState(0);
  // Mazal card modal state
  const [showMazalModal, setShowMazalModal] = useState(false);
  const [mazalCardIndex, setMazalCardIndex] = useState(0);
  // Har HaBayit card modal state
  const [showHarHaBayitModal, setShowHarHaBayitModal] = useState(false);
  const [harHaBayitCardIndex, setHarHaBayitCardIndex] = useState(0);
  // Tzadik card modal state
  const [showTzadikModal, setShowTzadikModal] = useState(false);
  const [tzadikCardIndex, setTzadikCardIndex] = useState(0);
  // Parsha card modal state
  const [showParshaModal, setShowParshaModal] = useState(false);
  // Tzedakah and Zchut fund state
  const [tzedakahAmount, setTzedakahAmount] = useState(0);
  const [zchutFundAmount, setZchutFundAmount] = useState(0);

  // Expose rescue modal setters for MannaFoodsModal
  useEffect(() => {
    window.setRescueInfo = setRescueInfo;
    window.setShowRescueModal = setShowRescueModal;
  }, []);

  // Close Har HaBayit modal when player changes
  useEffect(() => {
    setShowHarHaBayitModal(false);
  }, [currentPlayerIndex]);

  const availableColors = ["black", "purple", "blue", "brown", "orange", "red", "green"];
  const maxPlayers = 7;
  const scale = boardWidth / referenceSize;

  useEffect(() => {
    const handleResize = () => setBoardWidth(Math.min(window.innerWidth * 0.95, referenceSize));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const addPlayer = () => {
    if (!newPlayerName || !newPlayerColor) return;
    if (players.some((p) => p.color === newPlayerColor)) { alert("Color taken!"); return; }
    setPlayers([...players, { name: newPlayerName, color: newPlayerColor, position: 0, zchutPoints: 1000, money: 2000, missTurn: false, index: players.length }]);
    setNewPlayerName("");
    setNewPlayerColor("");
  };

  const startGame = () => {
    if (players.length < 2) { alert("At least 2 players required."); return; }
    setGameStarted(true);
  };

  const updateCurrentPlayer = (updatedPlayer) => {
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex] = updatedPlayer;
    setPlayers(updatedPlayers);
  };

  const [pendingMannaPay, setPendingMannaPay] = useState(false);
  const movePlayerBy = (steps) => {
    if (steps <= 0 || players.length === 0) return;
    const speedMs = 220;
    const updatedPlayers = [...players];
    const startIndex = updatedPlayers[currentPlayerIndex].position;
    let stepCount = 0;
    let passedGo = false;

    const doStep = () => {
      stepCount++;
      // Calculate new position
      const prevPosition = updatedPlayers[currentPlayerIndex].position;
      const boardLen = boardPositions.length;
      const newPosition = (prevPosition + 1) % boardLen;
      updatedPlayers[currentPlayerIndex].position = newPosition;

      // Check if passed Go (not starting turn on Go)
      if (newPosition === 0 && stepCount > 1) {
        updatedPlayers[currentPlayerIndex].money += 200;
        setPlayers([...updatedPlayers]);
        alert("$200 Parnassah has arrived in your account.");
        passedGo = true;
      }

      setPlayers([...updatedPlayers]);

      if (stepCount < steps) setTimeout(doStep, speedMs);
      else {
        const landedIndex = updatedPlayers[currentPlayerIndex].position;
        // If landed on Go (square 0), give $400 and special message
        if (landedIndex === 0) {
          // If already passedGo in this move, add $200 more (total $400)
          if (passedGo) {
            updatedPlayers[currentPlayerIndex].money += 200;
            setPlayers([...updatedPlayers]);
            alert("In addition to your Parnassah, your Bubbie sent you $200.");
          } else {
            // Landed directly on Go (not passing), give full $400 and both messages
            updatedPlayers[currentPlayerIndex].money += 400;
            setPlayers([...updatedPlayers]);
            alert("$200 Parnassah has arrived in your account.\nIn addition to your Parnassah, your Bubbie sent you $200.");
          }
        }
            // Jewish Idea Yeshiva event for squares 17 and 31
            if (landedIndex === 17 || landedIndex === 31) {
              const stay = window.confirm(
                "Welcome to the Jewish Idea Yeshiva! You can leave the material world for a while and come and learn with us. You will miss next turn but get a stipend of 200 Torahpoly money and 400 Zchut. If you miss another turn your reward is doubled. And a third turn your reward is tripled. You will have to move on after the 3rd turn so we can make room for new students.\n\nDo you want to stay in Yeshiva this turn? (OK = Yes, Cancel = No)"
              );
              if (stay) {
                setYeshivaState(prev => ({ ...prev, [currentPlayerIndex]: { count: 1, active: true } }));
                setPlayers(prevPlayers => prevPlayers.map((p, idx) =>
                  idx === currentPlayerIndex
                    ? { ...p, money: (typeof p.money === 'number' ? p.money : 0) + 200, zchutPoints: (p.zchutPoints || 0) + 400, missTurn: true }
                    : p
                ));
                setCurrentPlayerIndex(prev => (players.length > 0 ? (prev + 1) % players.length : 0));
              }
              // If player chooses not to stay, do nothing special and let the turn continue
              return;
            }

            // Square 21: Sell your brother event
            if (landedIndex === 21) {
              alert("How could you sell your brother for 20 shekels?? Roll the dice and pay 50 times the amount in zchut and torahpoly money to the Tzedakah fund. Maybe you will find some atonement.");
              setPendingSellBrother(true);
              setSellBrotherPlayerIndex(currentPlayerIndex);
              return;
            }
            // Special event: Haman's gallows on square 15
            if (landedIndex === 15) {
              alert("Haman is hung on his own gallows! He raised lots of money to destroy the Jewish people. The study of Torah and teshuva was worth more than all of his money and brought about his downfall.  Roll the dice to see how much money he spent trying to destroy Israel. Guess where that money is going now? Your own personal Geula - 400 times your dice roll. Good luck.");
              setPendingHamanReward(true);
              setHamanPlayerIndex(currentPlayerIndex);
            }
        const event = boardEvents[landedIndex];
        // Exile: Landed on square 10
        if (landedIndex === 10) {
          // Move player to square 30 and set missTurn, then immediately advance to next player
          setPlayers(prevPlayers => {
            const updatedPlayers = [...prevPlayers];
            updatedPlayers[currentPlayerIndex].position = 30;
            updatedPlayers[currentPlayerIndex].missTurn = true;
            return updatedPlayers;
          });
          alert(`${players[currentPlayerIndex].name} has been exiled! Go back to Egypt and miss a turn. Slavery sucks.`);
          // Advance to next player after state update
          setTimeout(() => {
            setCurrentPlayerIndex(prev => (players.length > 0 ? (prev + 1) % players.length : 0));
          }, 100);
        } else if (landedIndex === 16) {
          if (players[currentPlayerIndex].money >= 100) {
            const updatedPlayers = [...players];
            updatedPlayers[currentPlayerIndex].money -= 100;
            setPlayers(updatedPlayers);
            setTzedakahAmount(prev => prev + 100);
            alert(`${players[currentPlayerIndex].name} paid $100 to Tzedakah!`);
          } else {
            alert(`${players[currentPlayerIndex].name} does not have enough money to pay Tzedakah!`);
          }
        } else if (landedIndex === 20) {
          // Landed on square 20: collect all Tzedakah and Zchut fund
          if (tzedakahAmount > 0 || zchutFundAmount > 0) {
            const updatedPlayers = [...players];
            if (tzedakahAmount > 0) {
              updatedPlayers[currentPlayerIndex].money += tzedakahAmount;
            }
            if (zchutFundAmount > 0) {
              updatedPlayers[currentPlayerIndex].zchutPoints = (updatedPlayers[currentPlayerIndex].zchutPoints || 0) + zchutFundAmount;
            }
            setPlayers(updatedPlayers);
            let msg = `${players[currentPlayerIndex].name} collected`;
            if (tzedakahAmount > 0) msg += ` $${tzedakahAmount}`;
            if (zchutFundAmount > 0) msg += `${tzedakahAmount > 0 ? ' and' : ''} ${zchutFundAmount} Zchut`;
            msg += ' from the fund!';
            alert(msg);
            setTzedakahAmount(0);
            setZchutFundAmount(0);
          } else {
            alert("Both the Tzedakah and Zchut funds are empty.");
          }
        } else if (landedIndex === 25) {
          // If no payer, show modal to pay (first buyer)
          if (mannaPayer === null) {
            setPendingMannaPay(true);
          } else if (currentPlayerIndex === mannaPayer) {
            // Owner landed again, do nothing (no prompt, no payment)
          } else {
            // If payer exists and not the payer, show new MannaFoodsPayModal
            setPendingMannaPay(true);
          }
        } else if (event?.type === "property") {
          setQaMode("property");
          setCurrentCard(event.card);
        }
      }
    };
    doStep();
  };

  const rollDice = (val) => {
    // Jewish Idea Yeshiva event: handle missed turns and prompt
    if (yeshivaState[currentPlayerIndex]?.active) {
      const count = yeshivaState[currentPlayerIndex].count;
      let rewardMoney = 200 * count;
      let rewardZchut = 400 * count;
      let message = `You are in the Jewish Idea Yeshiva!\nYou will miss this turn and receive $${rewardMoney} and ${rewardZchut} Zchut.`;
      if (count === 1) message += "\nIf you miss another turn your reward is doubled.";
      if (count === 2) message += "\nIf you miss a third turn your reward is tripled.";
      if (count === 3) message += "\nYou must leave after this turn to make room for new students.";
      let stay = true;
      if (count < 3) {
        stay = window.confirm(message + "\nDo you want to stay another turn?");
      } else {
        alert(message + "\nYou must leave after this turn.");
      }
      setPlayers(prevPlayers => prevPlayers.map((p, idx) =>
        idx === currentPlayerIndex
          ? { ...p, money: (typeof p.money === 'number' ? p.money : 0) + rewardMoney, zchutPoints: (p.zchutPoints || 0) + rewardZchut }
          : p
      ));
      if (stay && count < 3) {
        setYeshivaState(prev => ({ ...prev, [currentPlayerIndex]: { count: count + 1, active: true } }));
        // Miss turn again
        setPlayers(prevPlayers => prevPlayers.map((p, idx) =>
          idx === currentPlayerIndex ? { ...p, missTurn: true } : p
        ));
        setCurrentPlayerIndex(prev => (players.length > 0 ? (prev + 1) % players.length : 0));
      } else {
        // Leaving yeshiva
        setYeshivaState(prev => ({ ...prev, [currentPlayerIndex]: { count: 0, active: false } }));
        setPlayers(prevPlayers => prevPlayers.map((p, idx) =>
          idx === currentPlayerIndex ? { ...p, missTurn: false } : p
        ));
        setCurrentPlayerIndex(prev => (players.length > 0 ? (prev + 1) % players.length : 0));
      }
      return;
    }
    // Prevent rolling if player should miss turn
    if (players[currentPlayerIndex]?.missTurn) {
      // Clear missTurn and skip to next player
      const updatedPlayers = [...players];
      updatedPlayers[currentPlayerIndex].missTurn = false;
      setPlayers(updatedPlayers);
      alert(`${players[currentPlayerIndex].name} misses this turn!`);
      setCurrentPlayerIndex(prev => (players.length > 0 ? (prev + 1) % players.length : 0));
      return;
    }
    // Special event: Haman's gallows reward
    if (pendingHamanReward && hamanPlayerIndex === currentPlayerIndex) {
      const reward = val * 400;
      setPlayers(prevPlayers => prevPlayers.map((p, idx) =>
        idx === currentPlayerIndex
          ? { ...p, money: (typeof p.money === 'number' ? p.money : 0) + reward, zchutPoints: (p.zchutPoints || 0) + reward }
          : p
      ));
      alert(`${players[currentPlayerIndex].name} receives $${reward} and ${reward} Zchut!`);
      setPendingHamanReward(false);
      setHamanPlayerIndex(null);
      return;
    }

    // Special event: Sell Brother (square 21)
    if (pendingSellBrother && sellBrotherPlayerIndex === currentPlayerIndex) {
      const penalty = val * 50;
      setPlayers(prevPlayers => prevPlayers.map((p, idx) =>
        idx === currentPlayerIndex
          ? { ...p,
              money: Math.max((typeof p.money === 'number' ? p.money : 0) - penalty, 0),
              zchutPoints: Math.max((p.zchutPoints || 0) - penalty, 0)
            }
          : p
      ));
      setTzedakahAmount(prev => prev + penalty);
      setZchutFundAmount(prev => prev + penalty);
      alert(`${players[currentPlayerIndex].name} pays $${penalty} and ${penalty} Zchut to the Tzedakah fund for atonement.`);
      setPendingSellBrother(false);
      setSellBrotherPlayerIndex(null);
      return;
    }
    setDiceRolls(prev => {
      const newRolls = [...prev, val];
      if (newRolls.length === 2) {
        movePlayerBy(newRolls[0] + newRolls[1]);
        return [];
      }
      return newRolls;
    });
  };

  const endTurn = () => {
    const updatedPlayers = [...players];
    if (updatedPlayers[currentPlayerIndex].missTurn) {
      updatedPlayers[currentPlayerIndex].missTurn = false;
      alert(`${updatedPlayers[currentPlayerIndex].name} skips this turn!`);
    }
    setPlayers(updatedPlayers);
    setCurrentPlayerIndex(prev => (players.length > 0 ? (prev + 1) % players.length : 0));
  };

  const handleSquareClick = (index) => {
    const event = boardEvents[index];
    if (event?.type === "property") {
      setQaMode("property");
      setCurrentCard(event.card);
    }
  };


  // TEMP: Test button to land on 25
  const testLandOn25 = () => {
    if (!gameStarted) return;
    const player = players[currentPlayerIndex];
    const steps = (25 - player.position + boardPositions.length) % boardPositions.length;
    if (steps === 0) return; // Already on 25
    movePlayerBy(steps);
  };

  // TEMP: Test button to land on 16
  const testLandOn16 = () => {
    if (!gameStarted) return;
    const player = players[currentPlayerIndex];
    const steps = (16 - player.position + boardPositions.length) % boardPositions.length;
    if (steps === 0) return; // Already on 16
    movePlayerBy(steps);
  };

  // TEMP: Test button to land on 20
  const testLandOn20 = () => {
    if (!gameStarted) return;
    const player = players[currentPlayerIndex];
    const steps = (20 - player.position + boardPositions.length) % boardPositions.length;
    if (steps === 0) return; // Already on 20
    movePlayerBy(steps);
  };

  // TEMP: Test button to land on 10 (Exile)
  const testLandOn10 = () => {
    if (!gameStarted) return;
    const player = players[currentPlayerIndex];
    const steps = (10 - player.position + boardPositions.length) % boardPositions.length;
    if (steps === 0) return; // Already on 10
    movePlayerBy(steps);
  };

  return (
    <div style={styles.container}>
      <h1>TorahPoly Monopoly Game</h1>
      {/* TEMP TEST BUTTONS: Remove after testing */}
      {gameStarted && (
        <>
          <button onClick={testLandOn15} style={{ background: '#f0c', color: '#000', fontWeight: 'bold', margin: 8, padding: '8px 16px', border: '2px solid #888', borderRadius: 6 }}>
            TEST: Land on 15 (Haman)
          </button>
          <button onClick={testLandOn25} style={{ background: '#ff0', color: '#000', fontWeight: 'bold', margin: 8, padding: '8px 16px', border: '2px solid #888', borderRadius: 6 }}>
            TEST: Land on 25
          </button>
          <button onClick={testLandOn16} style={{ background: '#fc0', color: '#000', fontWeight: 'bold', margin: 8, padding: '8px 16px', border: '2px solid #888', borderRadius: 6 }}>
            TEST: Land on 16
          </button>
          <button onClick={testLandOn20} style={{ background: '#cfc', color: '#000', fontWeight: 'bold', margin: 8, padding: '8px 16px', border: '2px solid #888', borderRadius: 6 }}>
            TEST: Land on 20
          </button>
          <button onClick={testLandOn10} style={{ background: '#f88', color: '#000', fontWeight: 'bold', margin: 8, padding: '8px 16px', border: '2px solid #888', borderRadius: 6 }}>
            TEST: Land on 10 (Exile)
          </button>
          <button onClick={testLandOn21} style={{ background: '#aaf', color: '#000', fontWeight: 'bold', margin: 8, padding: '8px 16px', border: '2px solid #888', borderRadius: 6 }}>
            TEST: Land on 21 (Sell Brother)
          </button>
        </>
      )}
      {/* ...existing code... */}
      {!gameStarted ? (
        <>
          {players.length < maxPlayers && (
            <div style={styles.inputRow}>
              <input type="text" placeholder="Player Name" value={newPlayerName} onChange={(e) => setNewPlayerName(e.target.value)} style={styles.input} />
              <select value={newPlayerColor} onChange={(e) => setNewPlayerColor(e.target.value)} style={styles.input}>
                <option value="">Choose Color</option>
                {availableColors.filter(c => !players.some(p => p.color === c)).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <button onClick={addPlayer} style={styles.button}>Add Player</button>
            </div>
          )}
          <h2>Joined Players ({players.length}/{maxPlayers})</h2>
          <ul>
            {players.map((p, i) => (
              <li key={i} style={{ color: p.color, fontWeight: i === currentPlayerIndex ? "bold" : "normal" }}>
                {p.name} ({p.color})
                <button onClick={() => setShowPanel(i)} style={{ marginLeft: 10 }}>View Properties</button>
              </li>
            ))}
          </ul>
          <button onClick={startGame} style={{ ...styles.button, marginTop: 20 }}>Start Game</button>
        </>
      ) : (
        <>
          <div style={{ marginBottom: 20 }}>
            <h2>Players</h2>
            <ul>
              {players.map((p, i) => (
                <li key={i} style={{ color: p.color, fontWeight: i === currentPlayerIndex ? "bold" : "normal" }}>
                  {p.name} - Position: {p.position}, Zchut: {p.zchutPoints}, Money: ${typeof p.money === 'number' ? p.money : (p.money && p.money.money ? p.money.money : 0)} {i === currentPlayerIndex && "(Your Turn)"} {p.missTurn && "(Miss next turn)"}
                  <button onClick={() => setShowPanel(i)} style={{ marginLeft: 10 }}>View Properties</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Game Board */}
          <div style={{ position: "relative", display: "inline-block", marginBottom: 20 }}>
            <img src={boardImage} alt="Game Board" style={{ width: boardWidth, maxWidth: "95vw", height: "auto", border: "2px solid #333", borderRadius: 12, display: "block" }} />
            {players.map((player, idx) => {
              const pos = boardPositions[player.position % boardPositions.length];
              const left = Math.round(pos.x * scale - 12);
              const top = Math.round(pos.y * scale - 12);
              return (
                <div key={idx} title={`${player.name}`} style={{ position: "absolute", left, top, width: 24, height: 24, borderRadius: "50%", backgroundColor: player.color, border: idx === currentPlayerIndex ? "3px solid gold" : "1px solid #000", display: "flex", justifyContent: "center", alignItems: "center", fontSize: 12, color: "#fff", cursor: "pointer" }} onClick={() => handleSquareClick(player.position)}>
                  {idx + 1}
                </div>
              );
            })}
            {/* TorahPoly Board Buttons overlay - does not affect any other logic */}
            <TorahPolyBoardButtons
              startQA={(card) => {
                if (card.name === "Mazal") {
                  setMazalCardIndex((prev) => (prev + 1) % mazalCards.length);
                  setShowMazalModal(true);
                } else if (card.name === "Har HaBayit") {
                  setShowHarHaBayitModal(true);
                } else if (card.name === "Tzadik") {
                  setShowTzadikModal(true);
                } else if (card.name && card.name.startsWith("Parsha")) {
                  setShowParshaModal(true);
                } else {
                  alert(card.name + " card clicked!");
                }
              }}
              onShuffleParsha={() => setShowParshaModal(true)}
              onReturnParsha={() => setShowParshaModal(true)}
              tzedakahAmount={tzedakahAmount}
              zchutFundAmount={zchutFundAmount}
            />
                      {/* Parsha Card Modal */}
                      <ParshaCardModal
                        open={showParshaModal}
                        onClose={() => setShowParshaModal(false)}
                        currentPlayer={players[currentPlayerIndex]}
                        setPlayers={setPlayers}
                      />
                {/* Tzadik Card Modal */}
                <TzadikCardModal
                  open={showTzadikModal}
                  onClose={() => setShowTzadikModal(false)}
                  currentPlayer={players[currentPlayerIndex]}
                  setPlayers={setPlayers}
                  cardIndex={tzadikCardIndex}
                  setCardIndex={setTzadikCardIndex}
                />
          </div>

          {/* Dice and Turn */}
          <div style={{ marginTop: 20 }}>
            <h2>Roll Dice</h2>
            <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
              <Dice sides={6} onRoll={rollDice} rollTime={1} />
              <Dice sides={6} onRoll={rollDice} rollTime={1} />
            </div>
            <button onClick={endTurn} style={{ ...styles.button, marginTop: 15 }}>End Turn</button>
          </div>
        </>
      )}

      {/* Property Modal */}
      {qaMode && currentCard && (
        <CardModal
          card={currentCard}
          mode={qaMode}
          currentPlayer={players[currentPlayerIndex]}
          updatePlayer={updateCurrentPlayer}
          players={players}
          updatePlayers={setPlayers}
          onClose={() => setQaMode(false)}
          onRescue={(player, rent) => {
            setRescueInfo({ player, rent });
            setShowRescueModal(true);
          }}
        />
      )}

      {/* Rescue Modal */}
      <RescueModal
        open={showRescueModal}
        onClose={() => setShowRescueModal(false)}
        currentPlayer={rescueInfo.player || { name: "", zchutPoints: 0, money: 0, index: -1 }}
        rentAmount={rescueInfo.rent}
        players={players}
        setPlayers={setPlayers}
      />

      {/* Manna Foods Modal logic */}
      {/* Show 'set your price' modal if unowned, else show MannaFoodsPayModal */}
      {pendingMannaPay && (mannaPayer == null) && (
        <MannaFoodsModal
          open={pendingMannaPay}
          onClose={() => setPendingMannaPay(false)}
          currentPlayer={players[currentPlayerIndex]}
          onPay={(amount) => {
            if (players[currentPlayerIndex].money < amount) {
              alert("You don't have enough money! Triggering Rescue...");
              setRescueInfo({ player: players[currentPlayerIndex], rent: amount });
              setShowRescueModal(true);
              return;
            }
            const updatedPlayers = players.map(p =>
              p.index === players[currentPlayerIndex].index
                ? { ...p, money: p.money - amount }
                : p
            );
            setPlayers(updatedPlayers);
            setMannaPayer(currentPlayerIndex);
            setMannaAmount(amount);
            alert(`You paid $${amount} for the Manna Foods Banquet!\nThe next player that lands here will return your expense.`);
            setPendingMannaPay(false);
          }}
        />
      )}
      {pendingMannaPay && (mannaPayer != null) && (
        <MannaFoodsPayModal
          open={pendingMannaPay}
          amount={mannaAmount || 0}
          ownerName={players[mannaPayer]?.name || ""}
          playerName={players[currentPlayerIndex]?.name || ""}
          canAfford={players[currentPlayerIndex]?.money >= (mannaAmount || 0)}
          onPay={() => {
            // Deduct money, pay owner, pay tzedakah, give zchut, etc.
            if (players[currentPlayerIndex].money < (mannaAmount || 0)) {
              alert("You don't have enough money! Triggering Rescue...");
              setRescueInfo({ player: players[currentPlayerIndex], rent: mannaAmount });
              setShowRescueModal(true);
              return;
            }
            // Pay owner and tzedakah, give zchut
            let updatedPlayers = players.map((p, idx) => {
              if (idx === currentPlayerIndex) {
                return { ...p, money: p.money - (mannaAmount || 0), zchutPoints: (p.zchutPoints || 0) + 200 };
              } else if (idx === mannaPayer && mannaPayer !== currentPlayerIndex) {
                return { ...p, money: p.money + (mannaAmount || 0) };
              }
              return p;
            });
            setPlayers(updatedPlayers);
            setTzedakahAmount(prev => prev + (mannaAmount || 0));
            // Do NOT change ownership unless trade button is used
            // setMannaPayer(currentPlayerIndex); <-- REMOVE this line
            setMannaAmount(mannaAmount);
            alert(`You paid $${mannaAmount} for the Manna Foods Banquet!\nYou also received 200 zchut points!`);
            setPendingMannaPay(false);
          }}
          onTrade={() => {
            const owner = players[mannaPayer];
            const buyer = players[currentPlayerIndex];
            if (!owner || !buyer) {
              alert("Invalid players for trade.");
              return;
            }
            const minOffer = Math.max(1, Math.floor(mannaAmount * 0.5));
            const offerStr = prompt(`How much do you want to offer to buy the mitzvah from ${owner.name}? (Minimum $${minOffer})`);
            const offer = parseInt(offerStr);
            if (isNaN(offer) || offer < minOffer) {
              alert(`Offer must be at least $${minOffer} and a valid number.`);
              return;
            }
            if (buyer.money < offer) {
              alert(`${buyer.name} does not have enough money for this offer.`);
              return;
            }
            if (!window.confirm(`${owner.name}, do you accept this offer of $${offer} from ${buyer.name}?`)) {
              alert("Offer not accepted.");
              return;
            }
            // Transfer money and ownership
            let updatedPlayers = players.map((p, idx) => {
              if (idx === currentPlayerIndex) {
                return { ...p, money: p.money - offer };
              } else if (idx === mannaPayer) {
                return { ...p, money: p.money + offer };
              }
              return p;
            });
            setPlayers(updatedPlayers);
            setMannaPayer(currentPlayerIndex);
            alert(`${buyer.name} bought the mitzvah from ${owner.name} for $${offer}!`);
            setPendingMannaPay(false);
          }}
          onClose={() => setPendingMannaPay(false)}
        />
      )}

      {/* Mazal Card Modal */}
      <MazalCardModal
        open={showMazalModal}
        onClose={() => setShowMazalModal(false)}
        currentPlayer={players[currentPlayerIndex]}
        setPlayers={setPlayers}
        mazalCard={mazalCards[mazalCardIndex]}
        onAccept={() => {
          const card = mazalCards[mazalCardIndex];
          if (card.reward) {
            if (card.rewardType === "moneyAndZchut") {
              setPlayers((prevPlayers) =>
                prevPlayers.map((p) => {
                  if (p.index === players[currentPlayerIndex].index) {
                    const addMoney = typeof card.reward.money === 'number' ? card.reward.money : 0;
                    const addZchut = typeof card.reward.zchut === 'number' ? card.reward.zchut : 0;
                    // Move to Gush Katif if this is the Gush Katif card
                    if (card.text && card.text.includes('Return to rebuild Gush Katif')) {
                      return {
                        ...p,
                        money: (typeof p.money === 'number' ? p.money : 0) + addMoney,
                        zchutPoints: (p.zchutPoints || 0) + addZchut,
                        position: 11,
                      };
                    }
                    return {
                      ...p,
                      money: (typeof p.money === 'number' ? p.money : 0) + addMoney,
                      zchutPoints: (p.zchutPoints || 0) + addZchut,
                    };
                  }
                  return p;
                })
              );
              alert(`${players[currentPlayerIndex].name} received $${card.reward.money} and ${card.reward.zchut} Zchut Mazal reward!`);
            } else {
              setPlayers((prevPlayers) =>
                prevPlayers.map((p) =>
                  p.index === players[currentPlayerIndex].index
                    ? card.rewardType === "zchut"
                      ? { ...p, zchutPoints: (p.zchutPoints || 0) + card.reward }
                      : { ...p, money: (typeof p.money === 'number' ? p.money : 0) + card.reward }
                    : p
                )
              );
              alert(`${players[currentPlayerIndex].name} received ${card.rewardType === "zchut" ? card.reward + ' Zchut' : '$' + card.reward} Mazal reward!`);
            }
          } else if (card.penalty) {
            setPlayers((prevPlayers) =>
              prevPlayers.map((p) => {
                if (p.index === players[currentPlayerIndex].index) {
                  if (card.penaltyType === "zchut") {
                    return { ...p, zchutPoints: Math.max(0, (p.zchutPoints || 0) - card.penalty) };
                  } else {
                    return { ...p, money: Math.max(0, p.money - card.penalty) };
                  }
                }
                return p;
              })
            );
            if (card.target === "tzedakah") {
              if (card.penaltyType === "zchut") {
                setZchutFundAmount((prev) => prev + card.penalty);
              } else {
                setTzedakahAmount((prev) => prev + card.penalty);
              }
            }
            alert(`${players[currentPlayerIndex].name} paid ${card.penaltyType === "zchut" ? card.penalty + ' Zchut' : '$' + card.penalty} as Mazal penalty!`);
          }
          setShowMazalModal(false);
        }}
      />

      {/* Har HaBayit Card Modal */}
      <HarHaBayitCardModal
        open={showHarHaBayitModal}
        onClose={() => setShowHarHaBayitModal(false)}
        currentPlayer={players[currentPlayerIndex]}
        setPlayers={setPlayers}
        cardIndex={harHaBayitCardIndex}
        setCardIndex={setHarHaBayitCardIndex}
      />

      {/* Player Panel Modal */}
      {showPanel !== null && (
        <PlayerPanelModal player={players[showPanel]} onClose={() => setShowPanel(null)} />
      )}
    </div>
  );
}

// --- Styles ---
const styles = { 
  container: { fontFamily: "Arial, sans-serif", padding: 20, backgroundColor: "#f0f2f5", minHeight: "100vh", textAlign: "center" },
  button: { backgroundColor: "#007bff", color: "white", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 16, cursor: "pointer", margin: "5px" },
  input: { fontSize: 16, padding: "5px 10px", borderRadius: 4, border: "1px solid #ccc" },
  inputRow: { display: "flex", justifyContent: "center", gap: 10, marginBottom: 20 }
};

// --- Modal styles ---
const modalStyles = { 
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
  modal: { backgroundColor: "#fff", padding: 30, borderRadius: 12, minWidth: 300, maxWidth: "90%", textAlign: "center", boxShadow: "0 5px 15px rgba(0,0,0,0.3)" },
  button: { margin: "8px 5px", padding: "8px 15px", borderRadius: 6, border: "none", backgroundColor: "#007bff", color: "#fff", fontSize: 14, cursor: "pointer" }
};

export default App;
