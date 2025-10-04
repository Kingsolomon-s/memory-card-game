import { icons } from "../../assets/icons/icons";
import { levels } from "../../utils/game-logic";
import "../../styles/level-page.css";

function Level({ setPage, startGame, cachedData }) {
  const handleLevelClick = (goal, cachedData) => {
    startGame(goal, cachedData);
  };
  return (
    <div className="level-container">
      <div className="level-top">
        <button className="back" onClick={() => setPage("home")}>
          <img src={icons.backIcon} alt="back icon" />
        </button>
      </div>
      <div className="level-bottom">
        {/*<button className="level">1</button>
        <button className="level">2</button>
        <button className="level">3</button>
        <button className="level">4</button>
        <button className="level">5</button>*/}

        {levels.map((level) => {
          const goal = level.goal;
          return (
            <button
              key={level.name}
              className="level"
              onClick={() => handleLevelClick(goal, cachedData)}
            >
              {level.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Level;
