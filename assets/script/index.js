import { getElement, select, create, listen } from './utils.js';
import movies from '../data/movie.js';


function showSuggestions() {
    const input = getElement('searchInput');
    const filter = input.value.toLowerCase();
    const suggestions = getElement('suggestions');
    suggestions.innerHTML = '';

    if (filter.length > 0) {
        const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(filter));
        if (filteredMovies.length > 0) {
            filteredMovies.forEach(movie => {
                const suggestionItem = create('li');
                suggestionItem.textContent = movie.title;
                suggestionItem.onclick = () => selectSuggestion(movie.title);
                suggestions.appendChild(suggestionItem);
            });
        } else {
            const noResultItem = create('li');
            noResultItem.textContent = 'No results found';
            noResultItem.style.color = 'red';
            suggestions.appendChild(noResultItem);
        }
    }
}

function selectSuggestion(movieTitle) {
    getElement('searchInput').value = movieTitle;
    getElement('suggestions').innerHTML = '';
}

function searchMovie() {
    const movieTitle = getElement('searchInput').value;
    const movie = movies.find(movie => movie.title === movieTitle);
    const movieContent = getElement('movieContent');
    if (movie) {
        movieContent.innerHTML = `
            <div class="movie-details">
                <img src="${movie.thumbnail}" alt="${movie.title}">
                <div class="movie-info">
                    <h2>${movie.title} (${movie.year})</h2>
                    <p><strong>Cast:</strong> ${movie.cast.join(', ')}</p>
                    <p>${movie.extract}</p>
                    <p><strong>Genres:</strong> ${movie.genres.map(genre => `<span class="genre-tag">${genre}</span>`).join('')}</p>
                </div>
            </div>
        `;
    } else {
        movieContent.textContent = 'No movie found';
    }
}

document.addEventListener('click', function(event) {
    const searchBox = getElement('searchBox');
    if (!searchBox.contains(event.target)) {
        getElement('suggestions').innerHTML = '';
    }
});

listen('keyup', getElement('searchInput'), showSuggestions);
listen('click', getElement('searchButton'), searchMovie);
