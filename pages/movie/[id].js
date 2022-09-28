import { useRouter } from 'next/router';
import styles from '../../styles/MovieDetails.module.css';
import { MdHighQuality } from "react-icons/md";

export default function Movie({ movies }) {
     
    const movieRouter = useRouter();
    const { id } = movieRouter.query;
    const imagePath = 'https://image.tmdb.org/t/p/w200';

    return (<>
        <div className={styles.movie_wrapper}>
            <div className={styles.movie_details_container}>
                <div className={styles.movie_details_header}>
                    <span><img className={styles.movie_image} src={`${imagePath}${movies.backdrop_path !== null ? movies.backdrop_path : movies.poster_path}`} /></span>
                    <span className={styles.movie_title_label}>{movies.title}</span>
                </div>
                <div className={styles.movie_content}>
                    <div className={styles.movie_overview_details}>
                        <div className={styles.movie_chronology}>
                            {movies.release_date} <MdHighQuality /> | Popularity {movies.popularity}
                        </div>
                        <div className='movie_overview'>
                            {movies.overview}
                        </div>
                    </div>
                    <div className={styles.movie_other_details}>
                        <div className={styles.movie_language}>
                            <span>Language:</span> {movies.spoken_languages.map((language, index) => (<span key={index}>{language.name},</span>))} <span>more</span>
                        </div>
                        <div className={styles.movie_genre}>
                            <span>Genre:</span> {movies.genres.map((genre, index) => (<span key={index}>{genre.name},</span>))} <span>more</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export async function getServerSideProps({params}){
    //I'm using .env NEXT_PUBLIC_API_KEY=moviedbapikey
    const request = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`);
    const apiData = await request.json();

    return {
        props: {movies: apiData},
    }
}