// Song list (replace with your own audio + images)
let songs = [
  {
    title: "End of Beginning",
    artist: "DJO",
    src: "audio/end of begin.mpeg",
    img: "images/concert.jpg",
    duration: "3:26"
  },
  {
    title: "7 Years",
    artist: "Lukas Graham",
    src: "audio/7 years.mpeg",
    img: "images/OIP.webp",
    duration: "3:59"
  },
  {
    title: "I Wanna Be Yours",
    artist: "Artic Monkeys",
    src: "audio/wanna be.mpeg",
    img: "images/img1.webp",
    duration: "3:01"
  },
  {
    title: "Night Changes",
    artist: "One Direction",
    src: "audio/Night changes.mpeg",
    img: "images/img2.webp",
    duration: "4:00"
  },
  {
    title: "See You Again",
    artist: "Wiz Khalifa",
    src: "audio/see you again.mpeg",
    img: "images/img3.jpg",
    duration: "3:57"
  }
];

let isPlaying = false;
let audio = new Audio(songs[0].src);

// DOM elements
const playBtn = document.querySelector(".play");
const prevBtn = document.querySelector(".controls button:nth-child(2)");
const nextBtn = document.querySelector(".controls button:nth-child(4)");
const progressBar = document.querySelector(".progress-bar");
const currentTimeEl = document.querySelector(".current-time");
const durationEl = document.querySelector(".duration");
const songTitleEl = document.querySelector(".song-title");
const artistEl = document.querySelector(".artist");
const songImgEl = document.querySelector(".left img");
const nextSongsContainer = document.querySelector(".next-songs");

// Load current + upcoming songs
function renderPlayer() {
  const currentSong = songs[0];
  audio.src = currentSong.src;
  songTitleEl.textContent = currentSong.title;
  artistEl.textContent = currentSong.artist;
  songImgEl.src = currentSong.img;
  durationEl.textContent = currentSong.duration;

  // Render next 4 songs
  nextSongsContainer.innerHTML = "";
  songs.slice(1).forEach(song => {
const img = document.createElement("img");
    img.src = song.img;
    img.alt = song.title;
    img.addEventListener("click", () => {
      moveSongToFront(song);
    });
    nextSongsContainer.appendChild(img);
  });
}

// Move selected song to front (when clicked from right side)
function moveSongToFront(song) {
  const index = songs.indexOf(song);
  if (index > 0) {
    const [selected] = songs.splice(index, 1);
    songs.unshift(selected);
    renderPlayer();
    if (isPlaying) audio.play();
  }
}

// Play/Pause toggle
function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playBtn.textContent = "▶";
  } else {
    audio.play();
    playBtn.textContent = "⏸";
  }
  isPlaying = !isPlaying;
}

// Update progress bar
audio.addEventListener("timeupdate", () => {
  const current = Math.floor(audio.currentTime);
  const minutes = Math.floor(current / 60);
  const seconds = current % 60;
  currentTimeEl.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  progressBar.value = current;
  progressBar.max = Math.floor(audio.duration);
});

// Seek
progressBar.addEventListener("input", () => {
  audio.currentTime = progressBar.value;
});

// Next song (rotate array)
function nextSong() {
  const [first] = songs.splice(0, 1);
  songs.push(first); // move current to end
  renderPlayer();
  if (isPlaying) audio.play();
}

// Previous song (rotate backwards)
function prevSong() {
  const last = songs.pop();
  songs.unshift(last); // move last to front
  renderPlayer();
  if (isPlaying) audio.play();
}

// Event listeners
playBtn.addEventListener("click", togglePlay);
songImgEl.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
audio.addEventListener("ended", nextSong);

// Initialize
renderPlayer();
// Grab the volume slider
const volumeBar = document.querySelector(".volume-bar");

// Set initial volume (value is 0–100, audio.volume expects 0–1)
audio.volume = volumeBar.value / 100;

// Update volume when slider changes
volumeBar.addEventListener("input", () => {
  audio.volume = volumeBar.value / 100;
});

