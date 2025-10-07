import Home from "./pages/home-page";
import Level from "./pages/level-page";
import Game from "./pages/game-page";

function SwitchPage({
  page,
  setPage,
  cachedData,
  cards,
  levelData,
  currentScore,
  bestScore,
  startGame,
  handleCardClick,
  isFlipping,
  modalState,
  handleModalRestart,
  handleModalBackToLevels,
  handleModalNextLevel,
  hasNextLevel,
}) {
  let activePage;
  switch (page) {
    case "home":
      activePage = <Home setPage={setPage} />;
      break;
    case "level":
      activePage = (
        <Level setPage={setPage} cacheData={cachedData} startGame={startGame} />
      );
      break;
    case "game":
      activePage = (
        <Game
          cards={cards}
          setPage={setPage}
          handleCardClick={handleCardClick}
          isFlipping={isFlipping}
          currentScore={currentScore}
          bestScore={bestScore}
          levelData={levelData}
          modalState={modalState}
          onModalRestart={handleModalRestart}
          onModalBackToLevels={handleModalBackToLevels}
          onModalNextLevel={handleModalNextLevel}
          hasNextLevel={hasNextLevel}
        />
      );
      break;
    default:
      activePage = null;
  }

  return activePage;
}

export default SwitchPage;
