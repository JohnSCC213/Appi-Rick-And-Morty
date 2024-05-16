const apiUrl = 'https://rickandmortyapi.com/api/character/';

document.addEventListener('DOMContentLoaded', loadCharacters);

function loadCharacters() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayCharacters(data.results))
        .catch(error => console.error('Error fetching data:', error));
}

function displayCharacters(characters) {
    const container = document.getElementById('characterContainer');
    container.innerHTML = '';
    characters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <div class="character-info">
                <h3>${character.name}</h3>
                <p>${character.status} - ${character.species}</p>
                <p>Episodes: ${character.episode.length}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

function searchCharacter() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    fetch(apiUrl + '?name=' + searchValue)
        .then(response => response.json())
        .then(data => displayCharacters(data.results))
        .catch(() => {
            document.getElementById('characterContainer').innerHTML = '<p>No se encontraron personajes.</p>';
        });
}
