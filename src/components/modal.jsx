import "../styles/modal.css";

function Modal({
  isOpen,
  type,
  currentScore,
  cardCount,
  onRestart,
  onBackToLevels,
  onModalNextLevel,
  hasNextLevel,
}) {
  if (!isOpen) return null;

  const isWin = type === "win";
  const title = isWin ? "🎉 Level Complete!" : "💥 Game Over!";
  const message = isWin
    ? `Perfect Score! You got all ${cardCount} cards!`
    : `You scored ${currentScore} out of ${cardCount}`;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{message}</p>
        <div className="modal-score">
          <span>
            Final Score: {currentScore} / {cardCount}
          </span>
        </div>
        <div className="modal-buttons">
          {isWin && hasNextLevel && (
            <button className="modal-btn next-btn" onClick={onModalNextLevel}>
              Next Level →
            </button>
          )}
          <button className="modal-btn restart-btn" onClick={onRestart}>
            {isWin ? "Play Again" : "Try Again"}
          </button>
          <button className="modal-btn levels-btn" onClick={onBackToLevels}>
            Back to Levels
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
