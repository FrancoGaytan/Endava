const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

class MoviesComponent extends HTMLElement {
  static get observedAttributes() {
    return ["movieId"];
  }

  connectedCallback() {
    const card = document.createElement("div");
    const movieImg = document.createElement("img");
    const movieTitle = document.createElement("div");
    const btnSection = document.createElement("div");
    const nextBtn = document.createElement("button");
    const likeBtn = document.createElement("button");

    card.classList.add("movie-card");
    movieImg.classList.add("movie-img");
    movieTitle.classList.add("movie-title");
    btnSection.classList.add("btn-section");
    likeBtn.classList.add("like-btn");
    nextBtn.classList.add("next-btn");

    // movieTitle.textContent = "INFINITY";
    nextBtn.textContent = "Next";
    likeBtn.textContent = "Like";

    btnSection.appendChild(likeBtn);
    btnSection.appendChild(nextBtn);
    card.appendChild(movieImg);
    card.appendChild(movieTitle);
    card.appendChild(btnSection);
    this.append(card);
  }

  attributeChangedCallback(movieId, oldMovieId, newMovieId) {
    if (oldMovieId !== newMovieId) this.updateMovie();
  }

  updateMovie() {
    let currentMovieId = this.getAttribute("movieId");
    const movieIm = document.querySelector(".movie-img");
    const movieTit = document.querySelector(".movie-title");

    const moviesArray = getMovies(); //no tengo que usar el await con esta funcion?

    movieIm.src = IMGPATH + moviesArray[currentMovieId].poster_path;
    movieTit.textContent = moviesArray[currentMovieId].original_title;
    console.log("estoy actualizando");
  }
}

customElements.define("movie-card", MoviesComponent);

const movieCard = document.querySelector("movie-card");

//cominzo la obtencion de las peliculas

async function getMovies() {
  const movies = [];
  const resp = await fetch(APIURL);
  const respData = await resp.json();

  respData.results.forEach((movie) => {
    movies.push(movie);
  });

  console.log(respData);
  console.log(movies);

  /* respData.results.forEach(movie =>{
       movieIm.src = IMGPATH + movie.poster_path; 
    });*/
  return movies;
}

function getRandomNumber() {
  const number = Math.floor(Math.random() * 20);
  return number;
}

const nextBtn = document.querySelector(".next-btn");
nextBtn.addEventListener("click", () => {
  movieCard.setAttribute("movieId", getRandomNumber());
});

getMovies();
