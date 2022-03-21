async function loadJson(url) {
	const response = await fetch(url)
	const parsedJson = await response.json()
	return parsedJson
}

export default loadJson