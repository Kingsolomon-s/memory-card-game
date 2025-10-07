function shuffleArray(array) {
  let newArray = [...array];
  let currentIndex = newArray.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ];
  }
  return newArray;
}

function initializeLevelCards(cache, count) {
  if (cache.length < count) {
    console.error("Cache size is too small for this level count");
    return [];
  }

  //shuffle the entire cached array
  const shuffledCache = shuffleArray(cache);

  const levelCards = shuffledCache.slice(0, count);
  return levelCards.map((card) => ({
    ...card,
    clicked: false,
  }));
}

const levels = [
  { name: 1, goal: 4, bestScore: 0 },
  { name: 2, goal: 6, bestScore: 0 },
  { name: 3, goal: 8, bestScore: 0 },
  { name: 4, goal: 10, bestScore: 0 },
  { name: 5, goal: 12, bestScore: 0 },
];

export { shuffleArray, initializeLevelCards, levels };
