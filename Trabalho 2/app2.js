const apiKey = '1971c7b9b85f42c59a4c635803ce4736';

const gameNameInput = document.getElementById('gameName');
const searchByNameButton = document.getElementById('searchByName');
const gameListByName = document.getElementById('gameListByName');

const platformSelect = document.getElementById('platformSelect');
const searchByPlatformButton = document.getElementById('searchByPlatform');
const gameListByPlatform = document.getElementById('gameListByPlatform');

const listSeriesAndCollectionsButton = document.getElementById('listSeriesAndCollections');
const seriesAndCollectionsList = document.getElementById('seriesAndCollectionsList');

const searchSeriesAndCollectionButton = document.getElementById('searchSeriesAndCollection');
const seriesAndCollectionNameInput = document.getElementById('seriesAndCollectionName');
const seriesAndCollectionResult = document.getElementById('seriesAndCollectionResult');
const seriesAndCollectionList = document.getElementById('seriesAndCollectionList');


const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');

// Preencha a lista suspensa de plataformas
fetch('https://api.rawg.io/api/platforms?key=' + apiKey)
    .then(response => response.json())
    .then(data => {
        const platforms = data.results;
        platformSelect.innerHTML = '';
        platforms.forEach(platform => {
            const option = document.createElement('option');
            option.value = platform.id;
            option.textContent = platform.name;
            platformSelect.appendChild(option);
        });
    })
    .catch(error => console.error('Erro ao buscar plataformas:', error));

searchByNameButton.addEventListener('click', () => {
    const gameName = gameNameInput.value.trim();
    if (gameName) {
        fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=${gameName}`)
            .then(response => response.json())
            .then(data => {
                gameListByName.innerHTML = ''; // Limpa a lista de jogos

                const games = data.results;
                if (games.length === 0) {
                    gameListByName.innerHTML = '<li>Nenhum jogo encontrado.</li>';
                } else {
                    const groupedGames = {};

                    games.forEach(game => {
                        if (!groupedGames[game.name]) {
                            groupedGames[game.name] = [];
                        }
                        groupedGames[game.name].push(game.platforms.map(platform => platform.platform.name).join(', '));
                    });

                    for (const gameName in groupedGames) {
                        const li = document.createElement('li');
                        li.textContent = `${gameName}: ${groupedGames[gameName].join(', ')}`;
                        gameListByName.appendChild(li);
                    }
                }
            })
            .catch(error => console.error('Erro ao buscar jogos:', error));
    }
});

searchByPlatformButton.addEventListener('click', () => {
    const platformId = platformSelect.value;
    if (platformId) {
        fetch(`https://api.rawg.io/api/games?key=${apiKey}&platforms=${platformId}`)
            .then(response => response.json())
            .then(data => {
                gameListByPlatform.innerHTML = ''; // Limpa a lista de jogos

                const games = data.results;
                if (games.length === 0) {
                    gameListByPlatform.innerHTML = '<li>Nenhum jogo encontrado.</li>';
                } else {
                    games.forEach(game => {
                        const li = document.createElement('li');
                        li.textContent = `${game.name} (Plataformas: ${game.platforms.map(platform => platform.platform.name).join(', ')})`;
                        gameListByPlatform.appendChild(li);
                    });
                }
            })
            .catch(error => console.error('Erro ao buscar jogos:', error));
    }
});
listSeriesAndCollectionsButton.addEventListener('click', () => {
    // Limpe o conteúdo anterior da lista
    seriesAndCollectionsList.innerHTML = '';

    // Faça uma solicitação à API para buscar séries e coleções de jogos
    fetch(`https://api.rawg.io/api/games?key=${apiKey}&ordering=name&parent_platforms=9,12,16`)
        .then(response => response.json())
        .then(data => {
            const seriesAndCollections = data.results;

            if (seriesAndCollections.length === 0) {
                seriesAndCollectionsList.innerHTML = '<p>Nenhuma série ou coleção encontrada.</p>';
            } else {
                // Crie uma lista de séries e coleções
                const ul = document.createElement('ul');

                seriesAndCollections.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item.name;
                    ul.appendChild(li);
                });

                seriesAndCollectionsList.appendChild(ul);
            }
        })
        .catch(error => console.error('Erro ao buscar séries e coleções:', error));
});


searchButton.addEventListener('click', function () {
    const searchTerm = searchInput.value;

    // Lógica para buscar os jogos ou séries com base no searchTerm
    // Substitua esta parte com a chamada à API ou a lógica de busca real
    const results = performSearch(searchTerm);

    displayResults(results);
});


function displayResults(results) {
    // Limpa a lista de resultados existente
    searchResults.innerHTML = '';

    if (results.length === 0) {
        const noResultsItem = document.createElement('li');
        noResultsItem.textContent = 'Nenhum resultado encontrado.';
        searchResults.appendChild(noResultsItem);
    } else {
        results.forEach(result => {
            const resultItem = document.createElement('li');
            resultItem.textContent = result;
            searchResults.appendChild(resultItem);
        });
    }
}


// TESTEEEEEEEEEEEEEEEEEEEEEEEE///
/// TESTEEE/////////////////
//TESTEEEEEEEEEEEEEEEEEE///

