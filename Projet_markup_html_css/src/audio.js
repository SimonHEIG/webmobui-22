const player = document.querySelector('#audio-player')

const songTitle = document.querySelector('#player-infos-song-title')
const artistName = document.querySelector('#player-infos-artist-name')
const thumbnail = document.querySelector('#player-thumbnail-image')

const playerCurrentTime = document.querySelector('#player-time-current')
const playerDurationTime = document.querySelector('#player-time-duration')
const slider = document.querySelector('#player-progress-bar')

const playPauseBtn = document.querySelector('#player-control-play span')
const previousBtn = document.querySelector('#player-control-previous')
const nextBtn = document.querySelector('#player-control-next')

let allSongFromCurrentArtist
let currentSong

slider.addEventListener('change', avancerPlayer)
player.addEventListener('timeupdate', updateSlider)
player.addEventListener('durationchange', updateMaxSliderValue)
player.addEventListener('ended', chansonSuivante)
nextBtn.addEventListener('click', chansonSuivante)
previousBtn.addEventListener('click', chansonPrecedente)

function loadSongs(songs) {
    allSongFromCurrentArtist = songs
}

function playAudio(song) {
    currentSong = song

    player.src = song.audio_url

    thumbnail.src = song.artist.image_url
    songTitle.innerHTML = song.title
    artistName.innerHTML = song.artist.name

    playPause()
    updateMaxSliderValue()
}

function playPause() {
    if (player.paused) {
        player.play()
        playPauseBtn.innerHTML = 'pause'
    } else {
        player.pause()
        playPauseBtn.innerHTML = 'play_arrow'
    }
}

function updateSlider() {
    slider.value = player.currentTime
    // playerCurrentTime.innerHTML = player.currentTime
    playerCurrentTime.innerHTML = new Date(player.currentTime * 1000).toISOString().slice(14, 19)
}

function avancerPlayer(event) {
    player.currentTime = event.currentTarget.value
}

function updateMaxSliderValue() {
    player.onloadedmetadata = function () {
        slider.max = player.duration
        playerDurationTime.innerHTML = new Date(player.duration * 1000).toISOString().slice(14, 19)
    }
}

function chansonSuivante() {
    let lastId = allSongFromCurrentArtist[allSongFromCurrentArtist.length - 1].id
    let currentId = currentSong.id

    if (currentId + 1 <= lastId) {
        let nextSong
        for (let song of allSongFromCurrentArtist) {
            if (song.id == currentId + 1) nextSong = song
        }
        playAudio(nextSong)
    }
}

function chansonPrecedente() {
    let firstId = allSongFromCurrentArtist[0].id
    let currentId = currentSong.id

    if (currentId - 1 >= firstId) {
        let previousSong
        for (let song of allSongFromCurrentArtist) {
            if (song.id == currentId - 1) previousSong = song
        }
        playAudio(previousSong)
    }
}


export { playPause, playAudio, loadSongs }