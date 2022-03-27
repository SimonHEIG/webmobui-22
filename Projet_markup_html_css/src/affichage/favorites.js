import { getFavs } from '../favs.js'
import {addAudio, loadSongs, playAudio} from '../audio.js'

const songList = document.querySelector('.fav-list')
const songListItemTemplate = document.querySelector('#fav-list-item-template')

function afficherFavs() {
    console.log('afficher favs')
    console.log(getFavs())
    let favs = getFavs();
    if(favs != null){
        afficherSongs(getFavs())
    }else{
        displayBlankTable();
    }
}

function afficherSong(song, allSongs) {
    const newSong = songListItemTemplate.content.cloneNode(true) // true pour cloner également les enfants du node

    newSong.querySelector('.list-item-title').innerText = song.title
    newSong.querySelector('.play-button').addEventListener('click', () => {
        loadSongs(allSongs)
        playAudio(song)
    })

    songList.append(newSong)
}

function afficherSongs(songs) {
    songList.replaceChildren() // Remplace les enfants par rien, donc supprime tous les enfants

    for (const song of songs) {
        afficherSong(song, songs)
    }
}
 function displayBlankTable(){
    songList.replaceChildren() // Remplace les enfants par rien, donc supprime tous les enfants
 }

export default afficherFavs