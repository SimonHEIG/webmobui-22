import loadJson from '../lib/api.js'

const artistList = document.querySelector('.artist-list')
const artistListItemTemplate = document.querySelector('#artist-list-item-template')

function afficherArtiste(artiste) {
    const newArtist = artistListItemTemplate.content.cloneNode(true) // true pour cloner également les enfants du node
    newArtist.querySelector('a').href = '#artists-' + artiste.id
    newArtist.querySelector('img').src = artiste.image_url
    newArtist.querySelector('.artist-list-item-title').innerText = artiste.name
    artistList.append(newArtist)
}

async function afficherArtistes() {
    let artistes = await getArtists()
    artistList.replaceChildren() // Remplace les enfants par rien, donc supprime tous les enfants
    for (const artiste of artistes) {
        afficherArtiste(artiste)
    }
}

async function getArtists() {
    return await loadJson('https://webmob-ui-22-spotlified.herokuapp.com/api/artists')
}

export default afficherArtistes