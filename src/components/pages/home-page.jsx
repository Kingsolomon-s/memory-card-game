import "../../styles/home-page.css";

function Home({ setPage }) {
  return (
    <div className="home-container">
      <div className="objective-container">
        <h3>OBJECTIVE</h3>
        <p>Get points by clicking on an image card.</p>
        <p>Click each card only once — no repeats!</p>
      </div>
      <button className="play-button" onClick={() => setPage("level")}>
        Play Now
      </button>
    </div>
  );
}

export default Home;
