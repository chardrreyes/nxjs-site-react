import styles from '../../styles/PopularMovies.module.css';
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useRef } from 'react';
import Link from 'next/link';

const PopularMovies = (props) => {
    const imagePath = 'https://image.tmdb.org/t/p/w200';
    const dataY = [];
    const ref = useRef(null);
    let dataX = [];

    props.movieList?.results.forEach(element => {
        dataX.push(element);
        if(dataX.length >= 5) {
            dataY.push(dataX);
            dataX = [];
        }
    });

    return(
        <div className={styles.movie_root}>
            <div onClick={() => movieScroll(-(ref.current.scrollWidth / (dataY.length)))} className={`${styles.control} ${styles.left}`}>
                <div className='icon-wrapper'>
                <IconContext.Provider value={{ size: "7vw" }}>
                    <AiOutlineCaretLeft />
                </IconContext.Provider>
                </div>
            </div>
            <div className={styles.movie_container} ref={ref}>
                {
                    dataY.map((movies, i) => (
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
            <div onClick={() => movieScroll(ref.current.scrollWidth / (dataY.length))}  className={`${styles.control} ${styles.right}`}>
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

export default PopularMovies;