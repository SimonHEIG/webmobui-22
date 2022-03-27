import loadJson from '../lib/api.js'
import {addAudio, loadSongs, playAudio} from '../audio.js'
import {toggleFav, isFav} from '../favs.js'

const songList = document.querySelector('.song-list')
const songListItemTemplate = document.querySelector('#song-list-item-template')

function afficherSong(song, allSongs) {
    const newSong = songListItemTemplate.content.cloneNode(true) // true pour cloner également les enfants du node
    console.log(newSong);
    newSong.querySelector('.list-item-title').innerText = song.title
    newSong.querySelector('.play-button').addEventListener('click', () => {
        loadSongs(allSongs)
        playAudio(song)
    })

    let favIcon = newSong.querySelector('.favorite-button').querySelector('span')

    if(isFav(song)){
        favIcon.innerHTML = 'favorite'
    }

    newSong.querySelector('.favorite-button').addEventListener('click', () => {
        toggleFav(song, favIcon)
    })

    songList.append(newSong)
}

async function afficherSongs(artisteAndId) {
    let songs = await getSongs(artisteAndId[1])
    songList.replaceChildren() // Remplace les enfants par rien, donc supprime tous les enfants
    document.querySelector('#songs-section .title').innerText = 'Artiste > ' + songs[0].artist.name

    for (const song of songs) {
        afficherSong(song, songs)
    }
}

async function getSongs(artistId) {
    return await loadJson('https://webmob-ui-22-spotlified.herokuapp.com/api/artists/' + artistId + '/songs')
}

export default afficherSongs