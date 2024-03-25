const image = document.querySelector("img");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");
const music = document.querySelector("audio");
const progressContainer = document.querySelector("#progress-container");
const progress = document.querySelector("#progress");
const currentTimeEl = document.querySelector("#current-time");
const durationEl = document.querySelector("#duration");
const prevBtn = document.querySelector("#prev");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");

let isPlaying = false;

// Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Music",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-4",
    displayName: "Front Row (Remix)",
    artist: "Jacinto Design",
  },
];

// play music
function play() {
  isPlaying = true;
  playBtn.setAttribute("title", "Pause");
  playBtn.classList.replace("fa-play", "fa-pause");
  music.play();
}

// pause music
function pause() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  music.pause();
}

// Play/Pause eventListener
playBtn.addEventListener("click", () => (isPlaying ? pause() : play()));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.displayName;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// current song
let songIndex = 0;

// prevSong function
function prevSong() {
  songIndex--;
  if (songIndex > 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  play();
}

// nextSong function
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  play();
}

// updateProgressBar function
function updateProgressBar(e) {
  if (isPlaying) {
    const { currentTime, duration } = e.srcElement;
    const progressPercentage = (currentTime / duration) * 100;
    progress.style.width = `${progressPercentage}%`;
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// On Load - Select songs manually
loadSong(songs[songIndex]);

// setProgressBar function
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgressBar);
