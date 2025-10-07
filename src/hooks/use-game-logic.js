import { useState } from "react";
import {
  shuffleArray,
  initializeLevelCards,
  levels as defaultLevels,
} from "../utils/game-logic";

const LEVEL_DATA_KEY = "pokemonBestScores";

const loadlevelData = () => {
  try {
    const localData = localStorage.getItem(LEVEL_DATA_KEY);
    return localData ? JSON.parse(localData) : defaultLevels;
  } catch (e) {
    console.error("Error loading level data from localStorage: ", e);
    return defaultLevels;
  }
};

function useGameLogic() {
  const [page, setPage] = useState("home");
  const [allpokemonCache, setAllpokemonCache] = useState([]);
  const [cards, setCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [levelData, setLevelData] = useState(loadlevelData);
  const [isFlipping, setIsFlipping] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, type: null });

  const updateLevelBestScore = (cardCount, newScore) => {
    setLevelData((prevData) => {
      const updatedData = prevData.map((level) => {
        if (level.goal === cardCount && newScore > level.bestScore) {
          return { ...level, bestScore: newScore };
        }
        return level;
      });
      localStorage.setItem(LEVEL_DATA_KEY, JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const startGame = (cardCount, cache = allpokemonCache) => {
    const sourceCache = cache;
    const count = Number(cardCount);

    if (!count || sourceCache.length === 0) return;

    const newGameCards = initializeLevelCards(sourceCache, count);
    setCurrentScore(0);
    setCards(newGameCards);
    setPage("game");
  };

  const handleCardClick = (clickedCardId) => {
    if (isFlipping) return;

    const card = cards.find((c) => c.id === clickedCardId);
    const cardCount = cards.length;

    if (card && card.clicked) {
      requestAnimationFrame(() => {
        setIsFlipping(true);
      });

      setTimeout(() => {
        setIsFlipping(false);
        setModalState({ isOpen: true, type: "lose" });
        updateLevelBestScore(cardCount, currentScore);
      }, 800);
      return;
    }

    setCurrentScore((prevScore) => {
      const newScore = prevScore + 1;

      if (newScore === cardCount) {
        setModalState({ isOpen: true, type: "win" });
        updateLevelBestScore(cardCount, newScore);
      }
      return newScore;
    });

    requestAnimationFrame(() => {
      setIsFlipping(true);
    });

    setCards((prevCards) => {
      const updatedCards = prevCards.map((c) =>
        c.id === clickedCardId ? { ...c, clicked: true } : c,
      );
      return shuffleArray(updatedCards);
    });

    setTimeout(() => {
      setIsFlipping(false);
    }, 800);

    return isFlipping;
  };

  const resetGame = (currentCardCount, finalScore) => {
    updateLevelBestScore(currentCardCount, finalScore);
    setCurrentScore(0);
    setCards((prevCards) => {
      const freshCards = prevCards.map((c) => ({ ...c, clicked: false }));
      return shuffleArray(freshCards);
    });
  };

  const handleModalRestart = () => {
    resetGame(cards.length, currentScore);
    setModalState({ isOpen: false, type: null });
  };

  const handleModalBackToLevels = () => {
    setModalState({ isOpen: false, type: null });
    setPage("level");
  };

  const handleModalNextLevel = () => {
    const currentLevelIndex = levelData.findIndex(
      (l) => l.goal === cards.length,
    );
    const nextLevel = levelData[currentLevelIndex + 1];

    if (nextLevel) {
      setModalState({ isOpen: false, type: null });
      startGame(nextLevel.goal);
    }
  };

  const hasNextLevel = () => {
    const currentLevelIndex = levelData.findIndex(
      (l) => l.goal === cards.length,
    );
    return currentLevelIndex < levelData.length - 1;
  };

  const currentBestScore =
    levelData.find((l) => l.goal === cards.length)?.bestScore || 0;

  return {
    page,
    setPage,
    allpokemonCache,
    setAllpokemonCache,
    cards,
    levelData,
    currentScore,
    currentBestScore,
    startGame,
    handleCardClick,
    isFlipping,
    modalState,
    handleModalRestart,
    handleModalBackToLevels,
    handleModalNextLevel,
    hasNextLevel,
  };
}

export default useGameLogic;
