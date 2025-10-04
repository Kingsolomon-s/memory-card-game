import "../../styles/home-page.css";

function Home({ setPage }) {
  return (
    <div className="home-container">
      <button className="play-button" onClick={() => setPage("level")}>
        Play Now
      </button>
    </div>
  );
}

export default Home;
