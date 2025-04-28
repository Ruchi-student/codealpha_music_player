const songs = [
    { title: "Jhol", artist: "Maanu", category: "Energetic", src: "songs/song1.mp3", color: "#a1c4fd" },
    { title: "Naina", artist: "Diljit", category: "Chill", src: "songs/song2.mp3", color: "#ff6f61" },
    { title: "Tu TU hai wahi", artist: "Jubin Nautiyal", category: "Sad", src: "songs/song3.mp3", color: "#6a11cb" }
];

const playlistEl = document.getElementById('playlist');
const searchEl = document.getElementById('search');
const categoryEl = document.getElementById('category');
const audioEl = document.getElementById('audio');
const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const volumeEl = document.getElementById('volume');

let currentSongIndex = 0;

function changeBackground(color) {
    document.body.style.backgroundColor = color;
}

// Load playlist
function renderPlaylist(filter = "") {
    playlistEl.innerHTML = "";
    songs
      .filter(song =>
          (filter === "" || song.title.toLowerCase().includes(filter.toLowerCase()) || song.artist.toLowerCase().includes(filter.toLowerCase())) &&
          (categoryEl.value === "All" || song.category === categoryEl.value)
      )
      .forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} - ${song.artist} [${song.category}]`;
        li.addEventListener('click', () => {
            currentSongIndex = songs.indexOf(song);
            loadAndPlay();
        });
        playlistEl.appendChild(li);
    });
}

function loadAndPlay() {
    const song = songs[currentSongIndex];
    audioEl.src = song.src;
    audioEl.play();
    changeBackground(song.color);
}

playBtn.addEventListener('click', () => {
    audioEl.play();
});

pauseBtn.addEventListener('click', () => {
    audioEl.pause();
});

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadAndPlay();
});

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadAndPlay();
});

volumeEl.addEventListener('input', (e) => {
    audioEl.volume = e.target.value;
});

searchEl.addEventListener('input', (e) => {
    renderPlaylist(e.target.value);
});

categoryEl.addEventListener('change', () => {
    renderPlaylist(searchEl.value);
});

// Initialize
renderPlaylist();
audioEl.volume = 0.5;

// Auto change color when track changes
audioEl.addEventListener('ended', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadAndPlay();
});
