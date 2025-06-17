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
const carouselSize = 9;
const carouselIndent = (carouselSize - 1) / 2;

const trending_movies =
	'https://api.themoviedb.org/3/trending/movie/week?language=en-US&sort_by=vote_average.desc';
const comingSoon_movies =
	'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}&sort_by=vote_average.desc&vote_count.gte=100';
const inCinemas_movies =
	'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&with_release_type=2|3&release_date.gte={12 2025}&release_date.lte={max_date}';
const API_Key = '&api_key=c082dc76fd5c82efa01a4fbb25e1ad7a';
var obj = { key1: API_URL, key2: HIGHESTRATED_API };
const test =
	'https://api.themoviedb.org/3/discover/tv?first_air_date_year=2020&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=vote_average.desc&vote_count.gte=500';
// api_key=c082dc76fd5c82efa01a4fbb25e1ad7a
let category = 'movie';
function choosePath(bestyear, title) {
	let year = bestyear;
	const best_rated = `https://api.themoviedb.org/3/discover/${category}?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=${year}&sort_by=vote_average.desc&vote_count.gte=500`;
	getMovies(best_rated, movieCarousel, title);
}

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

//get initial moves
// getMovies(API_URL);

// getMovies(trending_movies, trendingMovies, 'Trending Movies');
// getMovies(test, trendingMovies, 'Test');
// getMovies(inCinemas_movies, trendingMovies, 'In Cinemas');
// getMovies(comingSoon_movies,trendingMovies,'coming soon')

async function getMovies(url, functionName, functionTitle) {
	const res = await fetch(url + API_Key);
	const data = await res.json();
	functionName(data.results, functionTitle);
	// showMovies(data.results)
	// console.log(data.results);
}
let idx = 0;
function changeImage(img) {
	img.forEach((image, i) => {
		image.removeAttribute('id');
		image.classList.remove('hidden');
		if (idx > img.length - 1 - carouselIndent) {
			idx = 0 - carouselIndent;
		}
		if (idx < 0 - carouselIndent) {
			idx = img.length - 1 - carouselIndent;
		}

		if (idx + i + carouselIndent < carouselSize) {
			image.id = `image-${i + idx + carouselIndent}`;
			if (idx + 1 < carouselIndent) {
				image.classList.remove('hidden');
			}
		} else if (idx + i > img.length - 1 - carouselIndent) {
			if (idx + i - img.length + carouselIndent > img.length - 1) {
			} else {
				image.id = `image-${i + idx - img.length + carouselIndent}`;
			}

			if (idx + i > img.length + carouselIndent) {
				image.classList.add('hidden');
			}
		} else {
			image.classList.add('hidden');
		}
	});
}
function movieCarousel(movies, title) {
	const movieImg = document.querySelectorAll('trendingImgDiv img');
	main.innerHTML =
		'</div><h2 class="title" id="trendingMovies">' +
		title +
		'</h2><div class="carousel"><div class="buttons-container"><button class="btn fa-solid fa-left-long" id="left"></button><button class="btn fa-solid fa-right-long" id="right"></button></div><div class="image-container" id="imgs">';

	movies.forEach((movie, idx) => {
		const { poster_path, vote_average, title } = movie;

		const movieEl = document.createElement('div');
		movieEl.classList.add('trendingImgDiv');

		if (idx + carouselIndent < carouselSize) {
			movieEl.id = `image-${idx + carouselIndent}`;
		} else if (idx > movies.length - 1 - carouselIndent) {
			movieEl.id = `image-${idx - movies.length + carouselIndent}`;
		} else {
			movieEl.classList.add('hidden');
		}

		movieEl.innerHTML = `
		
			<img src = ${IMG_PATH + poster_path} alt = ${title}/>;

		    <div class="movie-info">

		    <span class="${getClassByRate(vote_average)}">${ratingTo1Decimal(
			vote_average
		)}</span>
		    </div>
		`;

		document.getElementById('imgs').append(movieEl);
	});

	const img = document.querySelectorAll('#imgs .trendingImgDiv');

	document
		.querySelector('.buttons-container')
		.addEventListener('click', (e) => {
			if (e.target.classList.contains('btn')) {
				e.preventDefault();
				// interval = setInterval(run, 2000);

				if (e.target.id === 'left') {
					idx--;
					changeImage(img);
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

function ratingTo1Decimal(x) {
	return Number.parseFloat(x).toFixed(1);
}

function showMovies(movies) {
	// main.innerHTML = '';

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

const nav = document.getElementById('navigation');
nav.addEventListener('click', (e) => {
	if (e.target.classList.contains('btn')) {
		console.log(e.target.id);
		const year = e.target.id;
		const title = e.target.innerText;
		choosePath(year, title);
		nav.classList.add('hide');
		main.classList.remove('hide');
	}
});
