import styles from '../styles/MovieList.module.css';
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image'

const MovieList = (props) => {
    const imagePath = 'https://image.tmdb.org/t/p/w200';
    const movieList = [];
    const ref = useRef(null);
    let movieListBuilder = [];

    props.movieList?.results.forEach(element => {
        movieListBuilder.push(element);
        if(movieListBuilder.length >= 5) {
            movieList.push(movieListBuilder);
            movieListBuilder = [];
        }
    });

    return(
        <div className={styles.movie_root}>
            <div onClick={() => movieScroll(-(ref.current.scrollWidth / (movieList.length)))} className={`${styles.control} ${styles.left}`}>
                <div className='icon-wrapper'>
                <IconContext.Provider value={{ size: "4vw" }}>
                    <AiOutlineCaretLeft />
                </IconContext.Provider>
                </div>
            </div>
            <div className={styles.movie_container} ref={ref}>
                {
                    movieList.map((movies, i) => (
                        <div className={styles.movie_group} id={`movie_gr_${i}`}  ref={ref} key={i}>
                            {                    
                                movies.map((movie, index) => (
                                    <Link href={`/movie/${movie.id}`} key={index}>
                                        <div className={styles.movie_card} key={movie.id}>
                                            {movie.poster_path !== null &&
                                            <Image width={200} height={130} src={`${imagePath}${movie.backdrop_path !== null ? movie.backdrop_path : movie.poster_path}`} alt="Movie picture" />
                                            }
                                            <div className={styles.movie_card_details}>
                                                <span className={styles.movie_card_details_title}>{movie.title}</span>
                                                <span className={styles.movie_card_details_overview}>
                                                    <p> Release Date: {movie.release_date}</p>
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
            <div onClick={() => movieScroll(ref.current.scrollWidth / (movieList.length))}  className={`${styles.control} ${styles.right}`}>
                <div className='icon-wrapper'>
                    <IconContext.Provider value={{ size: "4vw" }}>
                        <AiOutlineCaretRight />
                    </IconContext.Provider> 
                </div>
            </div>
        </div>
    );

    function movieScroll(offset) {
        ref.current.scrollLeft += offset;
    }
}

export default MovieList;