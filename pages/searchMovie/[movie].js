import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';
import MovieList from '../../components/MovieList';

export default function Movie() {
    const [ movieList, setMovieList] = useState(null);
    const movieRouter = useRouter();
    const { movie } = movieRouter.query;

    useEffect(() => {
        setMovieList(null)
        searchMovie(movie);
    },[movie])

    return (<>
        {movieList && 
            <MovieList movieList={movieList} />
        }
        {!movieList || movieList.results.length == 0 && 
            <div className={styles.no_result}>
                <h3>No result found.</h3>
            </div>
        }
    </>)


    async function searchMovie(movie) {
        //I'm using .env NEXT_PUBLIC_API_KEY=moviedbapikey;
        const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=${movie}&page=3&include_adult=false`);
        const apiData = await request.json();
        setMovieList(apiData);
    }
}

// export async function getServerSideProps(){
//     //I'm using .env.local NEXT_PUBLIC_API_URL=moviedbapikey
//     const requestPopularMovies = await fetch(`${process.env.NEXT_PUBLIC_API_URL}3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`);
//     const requestLatestMovies = await fetch(`${process.env.NEXT_PUBLIC_API_URL}3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`);
    
//     const dataLatestMovies = await requestLatestMovies.json();
//     const dataPopularMovies = await requestPopularMovies.json();
  
//     console.log("Authored by Chard Reyes");
//     return {
//         props: {
//           popularMovies: dataPopularMovies,
//           latestMovies: dataLatestMovies
//         },
//     }
// }
