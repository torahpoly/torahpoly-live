// New Har HaBayit card with two questions and rewards
const harHaBayitCard2 = {
  name: "Har HaBayit",
  questions: [
    {
      question: 'Who serves as the guards of the Temple?',
      answer: 'The Levites and the Cohanim',
      zchut: 300,
      money: 300,
    },
    {
      question: 'If the Sanhedrin wishes to extend the city limits of Jerusalem, may they do so? If so who would they need to consult?',
      answer: "Yes, but they must consult the king, a prophet and the Urim V'tumim",
      zchut: 600,
      money: 600,
    },
  ],
};
const parshaCard = {
  name: "Parsha Noach (Bereshit)",
  questions: [
    {
      question: "What was the sign of the covenant after the flood?",
      answer: "The rainbow",
      points: 50,
    },
    {
      question: "Who were Noach's three sons?",
      answer: "Shem, Cham, and Yefet",
      points: 30,
    },
  ],
};


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

const harHaBayitCards = [
  {
    name: "Har HaBayit",
    questions: [
      {
        question: 'Which items were housed in the Kodesh ("holy") chamber?',
        answer: "The showbread table, menorah, and incense altar",
        points: 300,
      },
      {
        question:
          "What was the miracle associated with the Omer, the Two Loaves and the Lechem Hapanim?",
        answer: `That never was a disqualifying defect found in any of these 3 holy offerings. Explanation: \na. The Omer, the barley offering brought on the 16th of Nissan, released the new crop for eating if a defect occurred, they wouldn't be able to bring the offering on that day and the new crop would have remained forbidden for the entire year!\nb. If there was a defect in the Two Loaves brought on Shavuos, we would have been unable to bring this offering, and would then have been unable to use the new wheat crop for minchah on the mizbe'ach.\nc. If a defect were found on the 12 loaves of the Lechem HaPanim that were baked before Shabbos, no new loaves would have been able to be set on the Shulchan until the following week.`,
        points: 300,
      },
    ],
  },
  {
    name: "Har HaBayit",
    questions: [
      {
        question: 'Who serves as the guards of the Temple?',
        answer: 'The Levites and the Cohanim',
        zchut: 300,
        money: 300,
      },
      {
        question: 'If the Sanhedrin wishes to extend the city limits of Jerusalem, may they do so? If so who would they need to consult?',
        answer: "Yes, but they must consult the king, a prophet and the Urim V'tumim",
        zchut: 300,
        money: 300,
      },
    ],
  },
  {
    name: "Har HaBayit",
    questions: [
      {
        question: "The Philistines captured the ark and set it beside their god Dagon. When they arose in the morning, what did they see? Name one of the plagues Hashem afflicted them with.",
        answer: "Dagon, fallen on his face on the ground before the ark of Hashem. Hemorrhoids",
        zchut: 300,
        money: 300,
      },
      {
        question: "The Choshen has twelve precious stones representing the twelve tribes. Name 3 of them, corresponding to the stones:",
        answer: "Ruby: Reuvain, Emerald: Judah, Onyx: Yoseph, Pearl: Zevulon, Sapphire: Issachar, Turquoise: Naphtali, Crystal: Gad",
        zchut: 300,
        money: 300,
      },
    ],
  },
  {
    name: "Har HaBayit",
    questions: [
      {
        question: "What was in the Kodesh Hakodashim (“holy of holies”)?",
        answer: "A rock upon which the ark was placed",
        zchut: 300,
        money: 300,
      },
      {
        question: "How many watchmen in total would stand guard each night? How many of these were Kohanim, and how many were Levi'im?",
        answer: "24 Watchmen. Three Kohanim and twenty one Levi'im.",
        zchut: 300,
        money: 300,
      },
    ],
  },
  {
    name: "Har HaBayit",
    questions: [
      {
        question: "Are women obligated in the Korban Pesach?",
        answer: "Yes",
        zchut: 300,
        money: 300,
      },
      {
        question: "If a korban pesach is slaughtered for pure and impure people, is it acceptable?",
        answer: "Yes, but the impure people may not eat from it.",
        zchut: 300,
        money: 300,
      },
    ],
  },
  {
    name: "Har HaBayit",
    questions: [
      {
        question: "Is an ordinary priest forbidden to enter the Sanctuary when he is not performing the service?",
        answer: "Yes",
        zchut: 300,
        money: 300,
      },
      {
        question: "If a priest was discovered to be a chalal, is his previous service disqualified?",
        answer: "No, and although he should not serve in the Temple going forward, any service he does is still acceptable.",
        zchut: 300,
        money: 300,
      },
    ],
  },
  {
    name: "Har HaBayit",
    questions: [
      {
        question: "What was the altar made from?",
        answer: "Stone",
        zchut: 300,
        money: 300,
      },
      {
        question: "How many years did the Sanctuary in Shiloh stand for?",
        answer: "369 years",
        zchut: 300,
        money: 300,
      },
    ],
  },
  {
    name: "Har HaBayit",
    questions: [
      {
        question: "How often would a High Priest require a haircut?",
        answer: "A High Priest must get a haircut at least once a week, preferably on Fridays. (Sanhedrin 22b)",
        zchut: 300,
        money: 300,
      },
      {
        question: "When Haman took the clothing and the horse to Mordechai, Mordechai was wrapped in his tallit thinking that Haman was coming to kill him. While Haman waited he asked Mordechai's students what they were learning. They told him the laws of Kamitza - the fingerful of flour that the Cohen removed for the mincha offering. What did Haman say regarding the value of this fingerful of flour?",
        answer: "Haman responded that this little three fingersful amount of flour pushed off the power of 10,000 loaves of silver (Megilah 16)",
        zchut: 300,
        money: 300,
      },
    ],
  },
  {
    name: "Har HaBayit",
    questions: [
      {
        question: "Who built the 1st temple? Who built the 2nd temple?",
        answer: "Solomon built the 1st temple and Ezra and Nechemia built the 2nd temple.",
        zchut: 300,
        money: 300,
      },
      {
        question: "How many נסים /miracles occurred in the Beis HaMikdash? Describe the miracle of the rain and the wind.",
        answer: "10 miracles. That the rain never extinguished the fire that was on the מערכה /wood-pile on the mizbe’ach. Even though the altar was outside and exposed to the heavens, the rain never extinguished this fire. The wind never overcame the smoke column arising from the altar. The winds never disturbed the smoke from rising straight upward like a pillar.",
        zchut: 300,
        money: 300,
      },
    ],
  },
  {
    name: "Har HaBayit",
    questions: [
      {
        question: "If a priest performs the service while he is intoxicated, does it matter what he became intoxicated from? How is his service affected?",
        answer: "Yes. If he is intoxicated from wine his service is invalidated. If he is intoxicated from other beverages his service is still valid.",
        zchut: 300,
        money: 300,
      },
      {
        question: "How many times did the High Priest enter the Holy of Holies on Yom Kippur?",
        answer: "Four",
        zchut: 300,
        money: 300,
      },
    ],
  },
  {
    name: "Har HaBayit",
    questions: [
      {
        question: "Which male descendants of Aharon are exempt from the prohibition against contacting a dead body?",
        answer: "Challalim -- those disqualified from the priesthood because they are descended from a relationship forbidden to a kohen. (Vayikra 21:1)",
        zchut: 300,
        money: 300,
      },
      {
        question: "Who in the household of a kohen may eat terumah?",
        answer: "He, his wife, his sons, his unmarried daughters and his non-Jewish slaves. (Vayikra 22:11)",
        zchut: 300,
        money: 300,
      },
    ],
  },
  {
    name: "Har HaBayit",
    questions: [
      {
        question: "The Chachamim sanctified Sha'ar Nikanor with lesser Kedushah of the Har ha'Bayit.  Why is that?",
        answer: "To enable the Metzora to stand there for their purification ceremony. (Zevachim 33)",
        zchut: 300,
        money: 300,
      },
      {
        question: "According to Talmudic tradition (Yoma 12a), the Temple complex was divided between two tribes. Which tribes were they, and which sections of the Temple were assigned to each?",
        answer: "Binyamin and Yehuda. Binyamin's portion contained the main, inner building (Sanctuary and Kodesh HaKodashim). Yehuda's portion contained the outer courtyards and the Temple Mount offices. The altar was primarily located in Binyamin's portion, but a strip of land from Yehuda's area (the southeast corner) extended into it, where the altar was placed.",
        zchut: 300,
        money: 300,
      },
    ],
  },
];


const mazalCards = [
              {
                name: "Mazal",
                text: `The Emperor proposed to Rav Tanhum, 'Come, let us all be one people.' 'Very Well,' he answered, 'but we who are circumcised cannot possibly become like you; why don't you become circumcised and be like us.' (Sanhedrin 39a)\n\nYou lost a job because you did not want to work on Shabbat.  You ended up finding a different one that paid you more money.`,
                reward: 1000,
                rewardType: "money",
                buttonText: "Collect $1000",
              },
            {
              name: "Mazal",
              text: `There is a huge Aliyah boom. The government is giving subsidies to builders. Get one free house on the property of your choice. You may also get one free hotel if you already have three houses.`,
              special: "aliyahBoom",
              buttonText: "Choose a property for a free house or hotel",
            },
          {
            name: "Mazal",
            text: `“Every person should have two pockets so he can reach into one or the other, according to his needs. In one pocket, carry a note that says ‘Bishvili Nivrat Ha’Olam - for my sake, the world was created.’  In the other pocket, a note that says, ‘Anochi Afar Va’Efer - I am dust and ashes.” – Rabbi Simcha Bunim of Przysucha, 19th century CE.\n\nYou used your unique talents and abilities to acheive great things but remained humble and modest.`,
            reward: 1000,
            rewardType: "zchut",
            buttonText: "Collect 1000 Zchut (Olam Haba Fund)",
          },
        {
          name: "Mazal",
          text: `The king said to the glutton and the envious person, "I will grant whatever you wish to whoever chooses first, provided the second gets double." The glutton wanted everything so he did not want to go first. Finally the envious person said I will go first. Pluck out my eye. Look what your envy cost you.`,
          penalty: 2000,
          penaltyType: "zchut",
          buttonText: "Pay 2000 Zchut (Olam Haba Fund)",
        },
      {
        name: "Mazal",
        text: `You always remember to repeat things from the person you heard it from. You told the king you heard from Mordechai there was a plot against him. Months later the king could not sleep and remembered he owed his life to Mordechai. Just when the Jewish people were about to be destroyed the tables turned. Mordecahi was elevated, Haman was hanged, and the Jewish people redeemed. It was all because you remembered to repeat things in someone's name.`,
        reward: 2000,
        rewardType: "zchut",
        buttonText: "Collect 2000 Zchut (Olam Haba Fund)",
      },
    {
      name: "Mazal",
      text: `"If its not how I want. I want how it is."\nMr. Zimmershpitz (survivor)\n“When we are no longer able to change a situation, we are challenged to change ourselves.”\nViktor Frankl (survivor)\n\nYour inner strength has helped you to survive great obstacles.`,
      reward: 2000,
      rewardType: "zchut",
      buttonText: "Collect 2000 Zchut (Olam Haba Fund)",
    },
  {
    name: "Mazal",
    text: `Return to rebuild Gush Katif. Collect $200 and 500 Zchut.`,
    reward: { money: 200, zchut: 500 },
    rewardType: "moneyAndZchut",
    buttonText: "Collect $200 and 500 Zchut",
  },
  {
    name: "Mazal",
    text: `You did a terrible sin deserving of death. Hashem measures judgement with kindness. The Talmud tells us that not being married or not having children or being poor are also like death, so instead of the death penalty, in His kindness, Hashem made you poor.`,
    penalty: 1000,
    penaltyType: "money",
    buttonText: "Give the bank $1000",
  },
  {
    name: "Mazal",
    text: `The King sent you to deliver a treasure to another Kingdom and warned you not to take any bets. As you were returning the other King asked why you had a fake hump on your back. You told him it was not fake you were a hunchback. The King said it must be fake and if he is proven wrong he will pay you 1 million dollars. You thought to yourself how can I go wrong? I will win the bet and give the million dollars to my King. You took off your shirt and won the bet. When you returned to your Kingdom you rushed to the King and offered this surprise gift to him in a proud display of loyalty. The King inquired how you acquired this gift? You explained the silly bet the other King made. 'You idiot' exclaimed the King. ' I bet him 2 million dollars the you would not make any bets!!`,
    penalty: 1000,
    penaltyType: "money",
    buttonText: "Give the bank $1000",
  },
                    {
                      name: "Mazal",
                      text: `You were in a hurry and someone asked you to be the 10th in a minyan. You said ok and met an old friend in the minyan who offered you a business opportunity.`,
                      reward: 500,
                      rewardType: "money",
                      buttonText: "Collect $500",
                    },
                  {
                    name: "Mazal",
                    text: `The building inspectors say that the guardrails need to be fixed to prevent the potential faller from falling (Dvarim 22:8). You must fix this on all your properties.`,
                    penalty: 2000,
                    penaltyType: "money",
                    buttonText: "Pay $2000",
                  },
                {
                  name: "Mazal",
                  text: `You daven every day at the minyan on the 110th floor of the Twin Towers. It’s the month of Elul and someone forgot the shofar in the downstairs minyan. You all decide to go downstairs that day. Tragedy struck and terrorists crashed a plane into the top of the Tower. The whole minyan would have been killed but you were saved by a shofar. (True Story)`,
                  reward: 1000,
                  rewardType: "zchut",
                  buttonText: "Collect 1000 Zchut (Olam Haba Fund)",
                },
              {
                name: "Mazal",
                text: `You spent $5000 on mezuzas for your factory. The gentile workers thought they were cameras and stopped stealing. Your business now earns $5000 more than it used to each month (true story Rav Kubiov).`,
                reward: 2000,
                rewardType: "money",
                buttonText: "Collect $2000",
              },
    {
      name: "Mazal",
      text: `“Whoever does not see God everywhere does not see Him anywhere.” – Kotzker Rebbe\n\nA Chassidic Rabbi said to his students if only you could be like the agnostics. 'But why would you wish that for us?' They questioned. He answered, 'when someone is in trouble you say don't worry God will help you. An agnostic does not believe in God so he knows that he  alone must help this person.'\n\nYour lack of faith is overshadowed by your generosity.`,
      reward: 2000,
      rewardType: "zchut",
      buttonText: "Collect 2000 Zchut (Olam Haba Fund)",
    },
            {
              name: "Mazal",
              text: `There was a war in Israel and you left your comfortable house in Canada to volunteer to help the soldiers. A Gentile friend was so impressed by this unusual behaviour that he began to learn more about the Jewish people and eventually converted to become Jewish.`,
              reward: 2000,
              rewardType: "zchut",
              buttonText: "Collect 2000 Zchut (Olam Haba Fund)",
            },
          {
            name: "Mazal",
            text: `Who is rich? Those who rejoice in their own portion.”\n(Pirkei Avot 4:1). Your sense of gratitude has earned you a great deal of zchut.`,
            reward: 1000,
            rewardType: "zchut",
            buttonText: "Collect 1000 Zchut (Olam Haba Fund)",
          },
        {
          name: "Mazal",
          text: `“It’s not how much or how little you have that makes you great or small, but how much or how little you accomplish with what you have.”\n- Rabbi Samson Raphael Hirsch\n\nCongratulations on fulfilling your potential`,
          reward: 1000,
          rewardType: "money",
          buttonText: "Collect $1000",
        },
      {
        name: "Mazal",
        text: `You visited Israel and wanted to make aliyah but had no money to stay. Someone on the street asked you to be a 10th for the Minyan. You were happy to join. At the minyan they told you that you could live in the synagogue for free if you help with the minyan and learned in their new yeshiva. (True Story)\n\nBecause you desired to live in the Land that Hashem promised us, Hashem desired to help you.`,
        reward: 1000,
        rewardType: "money",
        buttonText: "Collect $1000",
      },
    {
      name: "Mazal",
      text: `You invited your friend Kamtza to your party and by mistake your enemy Bar Kamtza was invited. You told him to get out. He begged you not to embarrass him in front of your guests and all the distinguished rabbis. He even offered to pay for half the party. You had no mercy and threw him out embarrassing him publicly.\n\nEnraged by his treatment and the silence of the rabbis he went and convinced the Roman emperror that the Jews were rebelling which caused the Temple to be destroyed and the Jewish people exiled. It all began with you embarrassing someone in public.`,
      penalty: 2000,
      penaltyType: "zchut",
      target: "tzedakah",
      buttonText: "Lose 2000 Zchut (Olam Haba Fund)",
    },
  {
    name: "Mazal",
    text: `You had a dream of buried treasure in a far-off city. You travelled there and found the spot and began digging. A policeman stopped you, and after you explained the story, he said he had the same dream of a treasure buried under the floorboards of a tailor shop. You realized that he was describing your own house. You dropped the shovel and ran home to discover the treasure buried under your own bed.`,
    reward: 1000,
    rewardType: "money",
  },
  {
    name: "Mazal",
    text: `You were first in line to marry Ruth the righteous Moabite convert. You declined because you were concerned about your yichus (pedigree). Your cousin Boaz married her instead. Your concern for your good name is recorded in the Torah. You are remembered as Plony Almony (or in English - Joe Blow). That righteous Moabite convert became the grandmother of King David. You thought you were concerned about your zchut but ended up losing zchut big time.`,
    penalty: 500,
    penaltyType: "zchut",
    target: "tzedakah",
    buttonText: "Pay 500 Zchut (Tzedaka Fund)",
  },
  {
    name: "Mazal",
    text: `Hashem sent you a beautiful Jewish woman that wanted to marry you. In order to test you He also sent a non-Jewish woman to entice you to all sorts of forbidden things. You thought you had captured an extraordinary beauty using your wit and charm that would satisfy all of your desires. This illusion led you astray. In the end you lost a great deal of joy, happiness, and merit that had been destined for you.`,
    penalty: 2000,
    penaltyType: "zchut",
    target: "tzedakah",
    buttonText: "Pay 2000 Zchut (Tzedaka Fund)",
  },
  {
    name: "Mazal",
    text: `"Who is the wise person? The one who foresees the consequences.”\n– Talmud, Tamid, 32a.\n\nNoah was a conspiracy theorist until it rained.\n- Dr. Zelenko.\n\nBribes blinds the eyes of the wise\n- (Dvarim 16:19).\n\nYou have endured threats, ridicule and bribery and have kept your integrity.`,
    reward: 2000,
    rewardType: "zchut",
    buttonText: "Collect 2000 Zchut (Olam Haba Fund)",
  },
];

const tzadikCard = {
  name: "Tzadik",
  questions: [
    {
      question: "From where does Rebbi Avahu learn that it is better to be the pursued than the pursuer?",
      answer: "Rebbi Avahu learns that it is better to be the pursued than the pursuer from the pigeon and the young dove, who are pursued more than any other birds, and who are therefore the only birds who have the merit to be brought on the Mizbe'ach. (Bava Kama 93)",
      zchut: 600,
    },
    {
      question: "Rabbi Yehuda, says to be vigilant with regard to treating with respect the children of unlearned parents, as from some of them Torah will emerge, Why is that?",
      answer: "Because they don’t have the rudiments others might have, they work harder to achieve Torah and this resilience is an important quality of greatness. They may become leaders and agents of change. Some who have been spoon-fed may not always have it (Sanhedrin 96)",
      zchut: 600,
    },
  ],
};
const tzadikCard2 = {
  name: "Tzadik",
  questions: [
    {
      question: "How did Korach obtain his tremendous wealth? Who else obtained wealth from the same place? Who will obtain wealth from this place in the future?",
      answer: "Korach obtained his wealth by finding one of the three treasure-houses where Yosef hid all the money that he collected from the entire world (on behalf of Paroh), when they came to buy corn for their fellow countrymen. The second of the three vast treasure-houses was found by Antoninus ben Asoirus (Rebbi's friend who later converted); and the third remains hidden, for the Tzadikim in the time of Mashiach. (Sanhedrin 110)",
      zchut: 600,
    },
    {
      question: "Perkei Avot discusses four types of students. What are they?",
      answer: "Quick to grasp and quick to forget: Their gain is offset by their loss. Slow to grasp and slow to forget: Their loss is offset by their gain. Quick to grasp and slow to forget: A wise student (the ideal). Slow to grasp and quick to forget: A bad portion.",
      zchut: 600,
    },
  ],
};

// Combine all Tzadik cards into an array
const tzadikCard3 = {
  name: "Tzadik",
  questions: [
    {
      question: "When Rabbi Meir studied the laws of the Sotah he made an observation that there is a unique punishment Hashem gives to those who sin in secret.  What is the punishment?",
      answer: "Sooner or later Hashem exposes them in public (like the Sotah). (Sotah 3a)",
      zchut: 600,
    },
    {
      question: "If one had stolen secretly from the public or from a private person but has no way of knowing who his victims were, how does he repay his debt?",
      answer: "They should use that money for community needs which benefit the general public. (Bava Kama 94b)",
      zchut: 600,
    },
  ],
};
const tzadikCard4 = {
  name: "Tzadik",
  questions: [
    {
      question: "A person’s true character is ascertained by three parameters. What are they?",
      answer: "Kos, Kys, Kaas - His cup (i.e., his behavior when he drinks), his pocket (i.e., his financial dealings), and his anger (Rabbi Ilai, Eruvin 65b)",
      zchut: 600,
    },
    {
      question: "King David said, “There are three characteristics that distinguish the Jewish People. What are they?",
      answer: "They are merciful, bashful (i.e. ashamed of sin), and do many great acts of kindness.” - Yevamot 79a",
      zchut: 600,
    },
  ],
};
const tzadikCard5 = {
  name: "Tzadik",
  questions: [
    {
      question: "What are the four fathers of damages? (Avot Nezikin)",
      answer: "the Ox (Shor - damage by livestock), the Pit (Bor - leaving a hazard), the Tooth (Shen - damage by consumption), and the Fire (Esh - damage by spreading) (Tractate Bava Kamma 2a-b).",
      zchut: 600,
    },
    {
      question: "If a person injures another, the law determines compensation based on five specific categories. What are the five types of restitutions you must pay for?",
      answer: "Damage (Nezek): The loss of value (e.g., devaluation of a person as a worker). Pain (Tza'ar): Compensation for physical suffering. Healing (Ripui): Medical costs. Loss of Time (Shavat): Lost wages while recovering. Humiliation (Boshet): Compensation for shame or disgrace. (Tractate Bava Kamma - 83b–93a)",
      zchut: 600,
    },
  ],
};
const tzadikCard6 = {
  name: "Tzadik",
  questions: [
    {
      question: "There are seven characteristics which typify a boor, and seven that characterise a cultured and wise person (chacham).  What are they?",
      answer: "The chacham does not speak in the presence of one who is wiser or older; He does not interrupt a colleague’s words; He does not reply hastily; He asks what is relevant and answers to the point; He replies to first questions first, last ones last (i.e., in an orderly sequence); When appropriate, he concedes that ‘I have not heard this’: He acknowledges the truth. The opposite of these typify the boor. (Perkei Avot, Chapter 5, Mishna 7)",
      zchut: 600,
    },
    {
      question: "During the 2nd Temple period Ezra legislated that Ma'aser Rishon should be given to the Kohanim rather than the Leviyim.  Why was that?",
      answer: "Ezra, penalized the Leviyim because the vast majority of them did not return to Eretz Yisrael from Bavel. (Sotah 48)",
      zchut: 600,
    },
  ],
};
const tzadikCard7 = {
  name: "Tzadik",
  questions: [
    {
      question: "Rebbi Yehudah ben Beseira may have been living in Netzivin, they said, yet his net was cast over Yerushalayim! A certain gentile boasted about how he had tricked the Jews. What did he do?",
      answer: "The gentile boasted about how he had tricked the Jews - by participating in a Korban Pesach, even as far as obtaining the best part of the Korban. Rebbi Yehudah ben Beseira advised him that, if he really wanted the best part of the Korban, then the following year, he should ask for the fat-tail of the lamb. Every Jew knew that the fat-tail of the lamb of any Korban went on the Mizbe'ach, and was not distributed. Consequently, when, on the following year, the gentile asked for the fat-tail, he aroused their suspicion, which resulted in an investigation. When they discovered his true identity, they killed him. (Pesachim 3)",
      zchut: 600,
    },
    {
      question: "What makes the Tana think that a Kohen, a Levi and a Yisrael who ate together may not combine to form a Mezuman? What is the case? On what grounds do we nevertheless conclude that they may?",
      answer: "The Tana thinks that if a Kohen ate Terumah, he may not combine with a Levi and a Yisrael to form a Mezuman - because the Levi and the Yisrael could not have shared his food. We answer that they nevertheless may - because even though they could not have shared his food, he could have shared theirs. (Eruchin 4)",
      zchut: 600,
    },
  ],
};
const tzadikCard8 = {
  name: "Tzadik",
  questions: [
    {
      question: "Im Shamu Tishma. Rav Zeira explains the passage of blessings in Dvarim 'And it shall be, if hear, you shall hear the voice of the L-rd your G-d..' (Dvarim 28:1). He compares this to the difference between an earthly vessel and a spiritual one. What is that comparison?",
      answer: "Come and see that not as the measure of the Holy One Blessed be He is the measure of flesh and blood.In the measure of flesh and blood, an empty vessel can be filled; a full one cannot be filled. But in the measure of the Holy One Blessed be He, a full vessel can be filled; an empty one cannot be filled, as it is written: 'If you hear [i.e.,understand], you shall hear [even more]; and if not, you shall not hear.' (Succah 46a)",
      zchut: 600,
    },
    {
      question: "Rav Papa asked why it was that earlier generations were accustomed to witnessing more miracles than his own. Even though there was much more learning in his generation? What promted him to ask this question and what was the answer?",
      answer: "He asked because when there was no rain, their lengthy T'filos drew no response, whereas all Rav Yehudah had to do was to remove one shoe (as a sign of pain) and it would begin to rain. Abaye answered that Rav Yehudah's generation were more worthy of miracles than theirs - because they indulged in acts of Mesirus Nefesh (self-sacrifice). (Brachot 20a)",
      zchut: 600,
    },
  ],
};
const tzadikCards = [tzadikCard, tzadikCard2, tzadikCard3, tzadikCard4, tzadikCard5, tzadikCard6, tzadikCard7, tzadikCard8];

// Button placement and rendering
export function TorahPolyBoardButtons({ startQA, onShuffleParsha, onReturnParsha, tzedakahAmount, zchutFundAmount }) {
  return (
    <>
      {/* Mazal Deck Button */}
      <button
        onClick={() => startQA(mazalCards[0])} // For now, use the first Mazal card
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

      {/* Har HaBayit Deck Button */}
      <button
        onClick={() => startQA(harHaBayitCards[0])}
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

      {/* Tzadik Deck Button */}
      <button
        onClick={() => startQA(tzadikCard)}
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

      {/* Parsha Deck Button */}
      <button
        onClick={() => startQA(parshaCard)}
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

      {/* Tzedakah Fund Display */}
      <div
        style={{
          position: "absolute",
          top: "69.5%",
          left: "26.5%",
          transformOrigin: "left center",
          transform: "translate(-50%, -50%) rotate(48deg)",
          backgroundColor: "#f7e600",
          color: "#333",
          border: "2px solid #bfa800",
          borderRadius: 10,
          padding: "8px 18px",
          fontWeight: "bold",
          fontSize: 16,
          boxShadow: "0 2px 8px #aaa",
          zIndex: 2,
        }}
      >
        Tzedakah: ${tzedakahAmount || 0}
      </div>

      {/* Zchut Fund Display */}
      <div
        style={{
          position: "absolute",
          top: "58%", // another 1/32 inch down
          left: "39.5%", // another 1/32 inch right
          transformOrigin: "left center",
          transform: "translate(-50%, -50%) rotate(48deg)",
          backgroundColor: "#f7e600",
          color: "#333",
          border: "2px solid #bfa800",
          borderRadius: 10,
          padding: "8px 18px",
          fontWeight: "bold",
          fontSize: 16,
          boxShadow: "0 2px 8px #aaa",
          zIndex: 2,
        }}
      >
        Zchut: {zchutFundAmount || 0}
      </div>

      {/* Shuffle Button */}
      <div
        style={{
          position: "absolute",
          top: "70%",
          left: "73%",
          display: "flex",
          flexDirection: "row",
          gap: "18px",
          transformOrigin: "right center",
          transform: "translate(-50%, -50%) rotate(-46deg)",
        }}
      >
        <button
          onClick={onShuffleParsha}
          style={{
            padding: "4px 10px",
            fontSize: 12,
            backgroundColor: "#ff9800",
            color: "#fff",
            border: "2px solid #000",
            borderRadius: 8,
            cursor: "pointer",
            boxShadow: "0 2px 8px #aaa",
          }}
        >
          Shuffle
        </button>
        <button
          onClick={onReturnParsha}
          style={{
            padding: "4px 10px",
            fontSize: 12,
            backgroundColor: "#007bff",
            color: "#fff",
            border: "2px solid #000",
            borderRadius: 8,
            cursor: "pointer",
            boxShadow: "0 2px 8px #aaa",
          }}
        >
          Return
        </button>
      </div>
    </>
  );
}

// Export card data for use elsewhere
export { bereshitCard, harHaBayitCards, mazalCards, tzadikCard, parshaCard, tzadikCard2, tzadikCards };
