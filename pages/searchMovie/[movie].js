import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PopularMovies from '../components/PopularMovies';
import styles from '../../styles/Home.module.css';

export default function Movie() {
    const [ movieList, setMovieList] = useState(null);
    const movieRouter = useRouter();
    const { movie } = movieRouter.query;

    useEffect(() => {
        setMovieList(null)
        searchMovie(movie);
    },[movie])

    console.log(movieList);
    return (<>
        {movieList && 
            <PopularMovies movieList={movieList} />
        }
        {!movieList || movieList.results.length == 0 && 
            <div className={styles.no_result}>
                <h3>No result found.</h3>
            </div>
        }
    </>)


    async function searchMovie(movie) {
        //I'm using .env NEXT_PUBLIC_API_KEY=moviedbapikey;
        const request = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=${movie}&page=3&include_adult=false`);
        const apiData = await request.json();
        setMovieList(apiData);
    }
}
