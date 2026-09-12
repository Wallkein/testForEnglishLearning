export interface WordCard {
  id: number;
  word: string;
  title: string;
  semantics: string;
  transcription: string;
  partOfSpeech: string;
  example: string;
  translation: string;
}

export const MOTIVATIONAL_TITLES: string[] = [
  "Word of the Day",
  "Keep Going!",
  "You Can Do It!",
  "Learn Every Day",
  "Never Give Up",
  "Small Steps Daily",
  "Believe in Yourself",
];

// Рандомный заголовок для карточки
export function randomTitle(): string {
  return MOTIVATIONAL_TITLES[
    Math.floor(Math.random() * MOTIVATIONAL_TITLES.length)
  ];
}

// Массив слов
export const WORDS: WordCard[] = [
  {
    id: 1,
    word: "benevolent",
    title: randomTitle(),
    semantics: "well meaning and kindly",
    transcription: "be·nev·o·lent",
    partOfSpeech: "adjective",
    example: '"a benevolent smile"',
    translation: "доброжелательный, благожелательный",
  },
  {
    id: 2,
    word: "serendipity",
    title: randomTitle(),
    semantics: "making fortunate discoveries by accident",
    transcription: "ser·en·dip·i·ty",
    partOfSpeech: "noun",
    example: '"finding this book was pure serendipity"',
    translation: "счастливая случайность",
  },
  {
    id: 3,
    word: "eloquent",
    title: randomTitle(),
    semantics:
      "delivering thoughts and opinions so people understand them instantly",
    transcription: "el·o·quent",
    partOfSpeech: "adjective",
    example: '"an eloquent speech moved the crowd"',
    translation: "красноречивый",
  },
  {
    id: 4,
    word: "resilient",
    title: randomTitle(),
    semantics:
      "the ability to recover quickly after suffering blows of fate or undergoing deformation",
    transcription: "re·sil·ient",
    partOfSpeech: "adjective",
    example: '"children are often remarkably resilient"',
    translation: "устойчивый, жизнестойкий",
  },
  {
    id: 5,
    word: "luminous",
    title: randomTitle(),
    semantics: "emitting or reflecting light, shining",
    transcription: "lu·mi·nous",
    partOfSpeech: "adjective",
    example: '"the luminous sky before sunrise"',
    translation: "светящийся, лучезарный",
  },
  {
    id: 6,
    word: "wanderlust",
    title: randomTitle(),
    semantics:
      "a strong, persistent urge or passion to travel and explore the world",
    transcription: "wan·der·lust",
    partOfSpeech: "noun",
    example: '"his wanderlust took him across Asia"',
    translation: "страсть к путешествиям",
  },
  {
    id: 7,
    word: "meticulous",
    title: randomTitle(),
    semantics:
      "showing extreme, painstaking care and precision about small details",
    transcription: "me·tic·u·lous",
    partOfSpeech: "adjective",
    example: '"she keeps meticulous notes of every lesson"',
    translation: "дотошный, скрупулёзный",
  },
  {
    id: 8,
    word: "ephemeral",
    title: randomTitle(),
    semantics: "something short-lived, fleeting, and rapidly vanishing",
    transcription: "e·phem·er·al",
    partOfSpeech: "adjective",
    example: '"the ephemeral beauty of cherry blossom"',
    translation: "мимолётный, эфемерный",
  },
  {
    id: 9,
    word: "courage",
    title: randomTitle(),
    semantics:
      "the ability to manage one's fear in a dangerous or difficult situation",
    transcription: "cour·age",
    partOfSpeech: "noun",
    example: '"it takes courage to speak a new language"',
    translation: "смелость, мужество",
  },
];
