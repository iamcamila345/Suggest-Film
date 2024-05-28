const menu = document.querySelector('.menu');
const NavMenu = document.querySelector('.nav-menu');

menu.addEventListener('click', () => {
    menu.classList.toggle('ativo');
    NavMenu.classList.toggle('ativo');
})

const apiKey = '58dba883ec9d5cfe0afb2b884c78f0e2';

async function suggestMovie() {
    const randomPage = Math.floor(Math.random() * 500) + 1;  // TMDb permite até 500 páginas de resultados populares
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=pt-BR&sort_by=popularity.desc&page=${randomPage}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const movies = data.results;
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];

        document.querySelector('.home-text').style.display = 'none';
        document.querySelector('.home-img').style.display = 'none';

        displayMovieInfo(randomMovie);
        displayNewButton();
    } 
    catch (error) {
        console.error('Erro ao buscar o filme:', error);
    }
}

function displayMovieInfo(movie) {
    const movieInfoDiv = document.getElementById('movieInfo');
    movieInfoDiv.innerHTML = '';

    if (movie) {
        const title = movie.title;
        const overview = movie.overview;
        const releaseDate = movie.release_date;
        const posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

        movieInfoDiv.innerHTML = `
            <h2>${title}</h2>
            <img src="${posterPath}" alt="${title}" width= 250px heigh= 250px>
            <p><strong>Sinopse:</strong> ${overview}</p>
            <p><strong>Data de lançamento:</strong> ${releaseDate}</p>
            <br>
        `;
    } else {
        movieInfoDiv.innerHTML = '<p>Filme não encontrado.</p>';
    }
}

function displayNewButton() {
    const movieInfoDiv = document.getElementById('movieInfo');
    let newLink = document.getElementById('newSuggestLink');

    if (!newLink) {
        newLink = document.createElement('a');
        newLink.id = 'home-btn';
        newLink.href = '#';
        newLink.innerText = 'Sugira Outro Filme';
        newLink.onclick = function(event) {
            event.preventDefault();
            suggestMovie();
        };
        movieInfoDiv.appendChild(newLink);
    }
}