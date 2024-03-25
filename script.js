const image = document.querySelector("img");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");
const music = document.querySelector("audio");
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

// On Load - Select songs manually
loadSong(songs[songIndex]);

// Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
