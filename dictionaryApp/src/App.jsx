import "./App.css";
import { useState } from "react";
import Detail from "./components/Detail";

function App() {
  const [search, setSearch] = useState("");
  const [meaning, setMeaning] = useState(null);
  const [noResults, setNoResults] = useState(false);

  async function findWord() {
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`
      );
      const data = await res.json();
      if (!res.ok) {
        setMeaning(false);
        setNoResults(true);
        throw new Error("something in the response failed");
      }
      setMeaning(data[0]);
    } catch (error) {
      console.error(error);
    }
  }

  function handleClear() {
    setSearch("");
    setMeaning(null);
    setNoResults(false);
  }

  return (
    <>
      <div className="app">
        <section className="searchSection">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearch(e.target.value);
            }}
          >
            <input
              className="input"
              type="text"
              placeholder="Write the word here"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <button className="searchBtn" onClick={findWord}>
              Search
            </button>
            <button className="searchBtn" onClick={handleClear}>
              Clear
            </button>
          </form>
        </section>
        {meaning && <Detail {...{ meaning }} />}
        {noResults && (
          <h5 className="unknownWord">We couldn´t find that word</h5>
        )}
      </div>
    </>
  );
}

export default App;
