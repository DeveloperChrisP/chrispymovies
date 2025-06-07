// header( 'authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDgyZGM3NmZkNWM4MmVmYTAxYTRmYmIyNWUxYWQ3YSIsIm5iZiI6MTc0OTIzNTIwNi4yNDg5OTk4LCJzdWIiOiI2ODQzMzYwNmVhNzQyY2Y3OTVhZDliNGIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nf_xlX9DZhh7XMTuTqikYaPErPVgbt63rt9EY0H4Sdc')
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c082dc76fd5c82efa01a4fbb25e1ad7a&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=c082dc76fd5c82efa01a4fbb25e1ad7a&query="'
// api_key=c082dc76fd5c82efa01a4fbb25e1ad7a
const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')
//get initial moves
getMovies(API_URL);

async function getMovies(url){
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}
function showMovies(movies){
    main.innerHTML = ''

    movies.forEach(movie => {
        const {title,poster_path, vote_average, overview} = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
        
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
            <h3>${overview}</h3>
            
             </div>
      
        `
        main.appendChild(movieEl)
    });
}

function getClassByRate(vote){
    if(vote >= 8){
        return 'green'
    }else if(vote >= 5) {
        return 'orange'
    }else{
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value 

    if(searchTerm && searchTerm !== ''){
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    }else{
        window.location.reload()
    }
})