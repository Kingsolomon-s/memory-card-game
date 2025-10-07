import Card from "../card.jsx";
import { icons } from "../../assets/icons/icons.js";
import "../../styles/game-page.css";
import Modal from "../modal.jsx";

function Game({
  cards,
  setPage,
  handleCardClick,
  isFlipping,
  currentScore,
  bestScore,
  levelData,
  modalState,
  onModalRestart,
  onModalBackToLevels,
  onModalNextLevel,
  hasNextLevel,
}) {
  const level = levelData.find((l) => l.goal === cards.length);
  return (
    <div className="game-container">
      <div className="nav-back">
        <button className="back" onClick={() => setPage("level")}>
          <img src={icons.backIcon} alt="back icon" />
        </button>
      </div>
      <p className="level-detail">{`Level ${level?.name || ""}`}</p>
      <div className="scores">
        <p>Score: {currentScore}</p>
        <p>Best score: {bestScore}</p>
      </div>

      <div className="game">
        {cards.map((card) => {
          return (
            <Card
              key={card.id}
              card={card}
              handleCardClick={handleCardClick}
              isFlipping={isFlipping}
            />
          );
        })}
      </div>

      <Modal
        isOpen={modalState.isOpen}
        type={modalState.type}
        currentScore={currentScore}
        cardCount={cards.length}
        onRestart={onModalRestart}
        onBackToLevels={onModalBackToLevels}
        onModalNextLevel={onModalNextLevel}
        hasNextLevel={hasNextLevel}
      />
    </div>
  );
}

export default Game;
