// header( 'authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDgyZGM3NmZkNWM4MmVmYTAxYTRmYmIyNWUxYWQ3YSIsIm5iZiI6MTc0OTIzNTIwNi4yNDg5OTk4LCJzdWIiOiI2ODQzMzYwNmVhNzQyY2Y3OTVhZDliNGIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nf_xlX9DZhh7XMTuTqikYaPErPVgbt63rt9EY0H4Sdc')
//Carousel consts
const imageContainer = document.getElementById('imgs');

const API_URL =
	'https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&primary_release_year=2022&api_key=c082dc76fd5c82efa01a4fbb25e1ad7a&page=1&with_original_language=en';
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const SEARCH_API =
	'https://api.themoviedb.org/3/search/movie?api_key=c082dc76fd5c82efa01a4fbb25e1ad7a&query="';
const HIGHESTRATED_API =
	// 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-uk&page=1&api_key=c082dc76fd5c82efa01a4fbb25e1ad7a&page=1&with_original_language=en&sort_by=popularity.desc&sort_by=vote_average.desc&vote_count.gte=200&primary_release_year=2023&first_air_date_year=2016'
	// 'https://api.themoviedb.org/3/trending/tv/day?language=en-US&api_key=c082dc76fd5c82efa01a4fbb25e1ad7a'
	'https://api.themoviedb.org/3/genre/movie/list&api_key=c082dc76fd5c82efa01a4fbb25e1ad7a';
const trending_movies =
	'https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=c082dc76fd5c82efa01a4fbb25e1ad7a';

const API_Key = 'api_key=c082dc76fd5c82efa01a4fbb25e1ad7a';
var obj = { key1: API_URL, key2: HIGHESTRATED_API };

// api_key=c082dc76fd5c82efa01a4fbb25e1ad7a
const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
//get initial moves
// getMovies(API_URL);

getMovies(trending_movies);

async function getMovies(url) {
	const res = await fetch(url);
	const data = await res.json();
	trendingMovies(data.results);
	// showMovies(data.results)
	// console.log(data.results);
}
let idx = 0;

function trendingMovies(movies) {
	main.innerHTML =
		'<h2 class="title" id="trendingMovies">Trending Movies</h2><div class="carousel"><div class="buttons-container"><button class="btn fa-solid fa-left-long" id="left"></button><button class="btn fa-solid fa-right-long" id="right"></button></div><div class="image-container" id="imgs">';

	movies.forEach((movie, idx) => {
		const { poster_path, vote_average, title } = movie;

		const movieEl = document.createElement('img');
		movieEl.src = `${IMG_PATH + poster_path}`;
		movieEl.alt = `${title}`;
		if (idx < 7) {
			movieEl.id = `image-${idx}`;
		} else {
			movieEl.classList.add('hidden');
		}

		// `

		//     <img src="${IMG_PATH + poster_path}" alt="${title}">
		//     <div class="movie-info">

		//     <span class="${getClassByRate(vote_average)}">${vote_average}</span>
		//     </div>
		// `;
		// const buttonsContainer = document.createElement('div');
		// buttonContainer.innerHTML = ''
		document.getElementById('imgs').append(movieEl);
		// document.querySelector('.carousel').append(buttonsContainer)
	});

	const img = document.querySelectorAll('#imgs img');
	console.log(img.length);

	document
		.querySelector('.buttons-container')
		.addEventListener('click', (e) => {
			if (e.target.classList.contains('btn')) {
				e.preventDefault();
				// interval = setInterval(run, 2000);

				if (e.target.id === 'left') {
					idx--;
					changeImage(img);
					console.log(idx);
					// resetInterval();
				} else if (e.target.id === 'right') {
					idx++;
					changeImage(img);
					// resetInterval();
				} else {
					// window.clearInterval(interval);
					console.log(interval);
				}
			}
		});
}

function showMovies(movies) {
	main.innerHTML = '';

	movies.forEach((movie) => {
		const { title, poster_path, vote_average, overview } = movie;

		const movieEl = document.createElement('div');
		movieEl.classList.add('movie');

		movieEl.innerHTML = `
        
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
            <h3>${overview}</h3>
            
            </div>
      
        `;
		main.appendChild(movieEl);
	});
}

function getClassByRate(vote) {
	if (vote >= 8) {
		return 'green';
	} else if (vote >= 5) {
		return 'orange';
	} else {
		return 'red';
	}
}

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const searchTerm = search.value;

	if (searchTerm && searchTerm !== '') {
		getMovies(SEARCH_API + searchTerm);

		search.value = '';
	} else {
		window.location.reload();
	}
});

const sortBtn = document.querySelectorAll('.sortBtn');

sortBtn.forEach((button) => {
	button.addEventListener('click', (e) => {
		e.target.classList.toggle('active');

		const selectedId = e.target.id;
		getMovies(obj[selectedId]);
	});
});

function resetInterval() {
	document.clearInterval(interval);
	interval = setInterval(run, 2000);
}
function run() {
	changeImage();
	idx++;
}

function changeImage(img) {
	if (idx > img.length - 1) {
		idx = 0;
	} else if (idx < 0) {
		idx = img.length - 1;
	}

	img.forEach((image, i) => {
		// console.log(image,i);
		image.removeAttribute('id');
		image.classList.remove('hidden');

		if (i + idx < img.length) {
			image.setAttribute('id', 'image-' + (i + idx));
			if (i + idx > 6) {
				image.classList.add('hidden');
			}
		} else if (i + idx > img.length - 1) {
			image.setAttribute('id', 'image-' + (i + idx - img.length));
			if (i + idx - img.length > 6) {
				image.classList.add('hidden');
			}
		}
	});
}
