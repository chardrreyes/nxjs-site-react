import styles from '../../styles/LatestMovies.module.css';
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useRef } from 'react';
import Link from 'next/link';

const LatestMovies = (props) => {
    const imagePath = 'https://image.tmdb.org/t/p/w200';
    const movieList = [];
    const ref = useRef(null);
    let movieArray = [];

    props?.movieList?.results.forEach(movie => {
        movieArray.push(movie);
        if(movieArray.length >= 5) {
            movieList.push(movieArray);
            movieArray = [];
        }
    });

    // movieArray.push(props.movieList);
    // movieList.push(props.movieList);
    // console.log(movieList);

    return(
        <div className={styles.movie_root}>
            <div onClick={() => movieScroll(-(ref.current.scrollWidth / (movieList.length)))} className={`${styles.control} ${styles.left}`}>
                <div className='icon-wrapper'>
                <IconContext.Provider value={{ size: "7vw" }}>
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
                                            
                                            <img className={styles.movie_image} src={`${imagePath}${movie.backdrop_path !== null ? movie.backdrop_path : movie.poster_path}`} />
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
                    <IconContext.Provider value={{ size: "7vw" }}>
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

export default LatestMovies;