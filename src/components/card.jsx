import cover from "../assets/images/cover.jpg";

function Card({ card, handleCardClick, isFlipping }) {
  const handleClick = (cardId) => {
    handleCardClick(cardId);
  };
  return (
    <div className="card-container" onClick={() => handleClick(card.id)}>
      <div className={`card-inner ${isFlipping ? "is-flipping" : ""}`}>
        <div className="card">
          <img src={card.imageUrl} alt={card.name} />
          <p>{card.name}</p>
        </div>
        <div className="cover">
          <img src={cover} alt="cover image" />
        </div>
      </div>
    </div>
  );
}

export default Card;
