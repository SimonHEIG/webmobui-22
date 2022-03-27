import JsonStorage from './lib/jsonStorage'

const favoriteStorage = new JsonStorage({ name: 'favorites' })
// favoriteStorage.clear()

function toggleFav(song, btn) {

    if (favoriteStorage.getItem(song.id)) {
        console.log("C’est dedans!")
        favoriteStorage.removeItem(song.id)
        btn.innerHTML = 'favorite_border'
        console.log('removed')
    } else {
        console.log("ça n’y est pas…")
        favoriteStorage.setItem(song.id, song)
        btn.innerHTML = 'favorite'
        console.log('added')
    }

}

function getFavs(){
    return favoriteStorage.toArray().map((e) => e[1])
}

function isFav(song){
    if(favoriteStorage.getItem(song.id)){
        return true
    }
    return false
}

export {toggleFav, getFavs, isFav}