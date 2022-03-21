import loadJson from '../lib/api.js'

const songList = document.querySelector('.song-list')
const songListItemTemplate = document.querySelector('#song-list-item-template')

function afficherSong(song) {
    const newSong = songListItemTemplate.content.cloneNode(true) // true pour cloner également les enfants du node

    newSong.querySelector('.list-item-title').innerText = song.title
    songList.append(newSong)
}

async function afficherSongs(artisteAndId) {
    let songs = await getSongs(artisteAndId[1])
    songList.replaceChildren() // Remplace les enfants par rien, donc supprime tous les enfants
    document.querySelector('#songs-section .title').innerText = 'Artiste > ' + songs[0].artist.name

    console.log(songs)
    for (const song of songs) {
        afficherSong(song)
    }
}

async function getSongs(id) {
    return await loadJson('https://webmob-ui-22-spotlified.herokuapp.com/api/artists/' + id + '/songs')
}

export default afficherSongs