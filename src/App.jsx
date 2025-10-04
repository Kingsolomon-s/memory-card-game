import { useEffect } from "react";
import fetchData from "./utils/fetch-images";
import SwitchPage from "./components/switch-page";
import useGameLogic from "./hooks/use-game-logic";

function App() {
  const {
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
  } = useGameLogic();

  console.log(allpokemonCache);
  console.log("cards", cards);
  console.log("level data: ", levelData);

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      const initializeCache = async () => {
        try {
          const data = await fetchData();
          if (data) {
            setAllpokemonCache(data);
          }
        } catch (e) {
          console.error("Failed fetching data", e);
        }
      };

      initializeCache();
    }

    return () => {
      ignore = true;
      console.log("unmounted");
    };
  }, [setAllpokemonCache]);

  return (
    <div className="container">
      <SwitchPage
        page={page}
        setPage={setPage}
        cards={cards}
        cachedData={allpokemonCache}
        levelData={levelData}
        startGame={startGame}
        handleCardClick={handleCardClick}
        currentScore={currentScore}
        bestScore={currentBestScore}
        isFlipping={isFlipping}
      />
    </div>
  );
}

export default App;
