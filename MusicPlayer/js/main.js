const app = document.getElementsByClassName("player");
const songs = document.getElementById("songs");
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");

const songList = [
  {
    title: "Shape of You (Ed Sheeran)",
    file: "Shape-of-You-_Ed-Sheeran_.mp3",
    cover: "1.jpg",
    mainColor: "blue",
  },
  {
    title: "Magic in the Air (Bruno Mars)",
    file: "Magic-_Bruno-Mars_.mp3",
    cover: "2.jpg",
    mainColor: "red",
  },
  {
    title: "Let me Love You (Dj Snake)",
    file: "Let-me-Love-You-_Dj-Snake_.mp3",
    cover: "3.jpg",
    mainColor: "orange",
  },
];

let actualSong = null;

var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

play.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

next.addEventListener("click", () => {
  nextSong();
});

prev.addEventListener("click", () => {
  prevSong();
});

audio.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", () => {
    nextSong();
    //source.disconnect();//fijate de armar una funcion que desconecte
});

function loadSongs() {
  songList.forEach((song, index) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.textContent = song.title;
    link.href = "#";
    link.addEventListener("click", () => loadSong(index));
    li.appendChild(link);
    songs.appendChild(li);
  });
}

function changeActiveClass(lastIndex, newIndex) {
  const links = document.querySelectorAll("a");
  if (lastIndex !== null) {
    links[lastIndex].classList.remove("active");
  }
  links[newIndex].classList.add("active");
}

function loadSong(songIndex) {
  if (songIndex !== actualSong) {
    changeActiveClass(actualSong, songIndex);
    actualSong = songIndex;
    audio.src = "./audio/" + songList[songIndex].file;
    playSong();
    updateControls();
    changeCover(songIndex);
    changeSongTitle(songIndex);
    manageCanvas();
  }
}

function updateProgress(){
    const {duration, currentTime} = event.srcElement;
    const current = (currentTime / duration) * 100;
    progress.style.width= current + "%";
}

function setProgress(event){
    const totalWidth = this.offsetWidth;
    const progressWidth = event.offsetX;
    const percent = (progressWidth / totalWidth) * audio.duration;
    audio.currentTime = percent;
}

function updateControls() {
  if (audio.paused) {
    play.classList.remove("fa-pause");
    play.classList.add("fa-play");
  } else {
    play.classList.remove("fa-play");
    play.classList.add("fa-pause");
  }
}

function playSong() {
  if (actualSong !== null) {
    audio.play();
    updateControls();
    //manageCanvas();
  }
}

function pauseSong() {
  audio.pause();
  updateControls();
}

function changeCover(songIndex) {
  cover.src = "./img/" + songList[songIndex].cover;
  document.documentElement.style.setProperty("--main-color", songList[songIndex].mainColor);
}

function changeSongTitle(songIndex) {
  title.innerText = songList[songIndex].title;
}

function prevSong() {
    if(actualSong > 0){
    loadSong(actualSong - 1);
    }else{
        loadSong(songList.length - 1)
    }
}

function nextSong() {
    if(actualSong + 1 < songList.length){
         loadSong(actualSong+1);   
    }else{
        loadSong(0);
    }
}

function manageCanvas(){
    if (context){context.disconnect()};
    context= new AudioContext();
    analyser = context.createAnalyser();

    canvas = document.getElementById("analyzer_render");
    ctx= canvas.getContext('2d');
    source= context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);

    frameLooper();
}

function frameLooper(){
    window.requestAnimationFrame(frameLooper);
    fbc_array= new Uint8Array(analyser.frequencyBinCount);//conjunto de barras
    analyser.getByteFrequencyData(fbc_array);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#83f442";
    bars= 100;

    for(var i=0; i < bars; i++){
        bar_x = i*3;
        bar_width = 2;
        bar_height = (-fbc_array[i]/2);
        ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
    }
}

document.documentElement.style.setProperty("--main-color", "black");
loadSongs();
