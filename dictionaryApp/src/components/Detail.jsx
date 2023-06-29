import "./Detail.css";

const Detail = (wordData) => {
  let def = wordData.meaning.meanings[0].definitions[0].definition;
  let syns = wordData.meaning.meanings[0].synonyms;

  function playPhonetic() {
    try {
      let audio = new Audio(wordData.meaning.phonetics[1].audio);
      audio.play();
    } catch (e) {
      console.log({ e });
    }
  }

  return (
    <div>
      <section className="audioSection">
        <h3 className="searchedWord">
          {wordData ? wordData.meaning.word : "Not founded Word"}
        </h3>
        <button className="audioBtn" onClick={playPhonetic}></button>
      </section>
      <h5 className="phoneticDesc">{wordData.meaning.phonetic}</h5>
      <hr />
      <section className="meaningsSection">
        <h4>Meanings</h4>
        <h5>{def}</h5>
        <h4>Synonyms</h4>
        {syns.map((s, index) => (
          <li key={index}>{s}</li>
        ))}
      </section>
    </div>
  );
};

export default Detail;
