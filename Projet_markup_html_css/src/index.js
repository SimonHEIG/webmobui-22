import './css/index.css'
import afficherArtistes from './affichage/artistes.js'
import afficherSongs from './affichage/songs.js'

window.addEventListener('hashchange', displaySection)

function displaySection() {

	// hash = ce qui est après l'url de base www.url.com/hash -> #home par ex
	// Le split est utilisé pour le switch plus loin. -> Si on a artiste-12 par ex
	const section = window.location.hash || '#home'
	const sectionSplit = section.split('-')

	// On change la class "active" sur la section ou l'on vient de cliquer et on l'enlève ailleur
	toggleSection(sectionSplit[0])
	toggleNav(sectionSplit[0])

	// En fonction du hash on effectue qqc
	switch (sectionSplit[0]) {
		case '#artists':
			if (sectionSplit[1]) { // S’il y a un deuxième élément, comme un id -> artiste-12 par ex
				// faireQuelqueChoseAvec(sectionSplit[1])
				console.log('artiste-12')
				toggleSection('#songs')
				afficherSongs(sectionSplit)
			} else {
				console.log('artiste')
				afficherArtistes()
			}
			break
		case '#player':
			// faireAutreChose()
			console.log('player')
			break
	}
}

function toggleNav(section) {
	// Supprime/Ajoute la classe active sur le lien
	document.querySelector('nav a.active')?.classList.remove('active')
	document.querySelector(`nav a[href="${section}"]`)?.classList.add('active')
}

function toggleSection(section) {
	// Supprime/Ajoute la classe active sur la section
	document.querySelector('section.active')?.classList.remove('active')
	document.querySelector(`${section}-section`)?.classList.add('active')
}



displaySection();

