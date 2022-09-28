import styles from '../../styles/PopularMovies.module.css';
import { GrFormNext, GrFormPrevious} from "react-icons/gr";
import { IconContext } from "react-icons";
import { useRef } from 'react';
import Link from 'next/link';


const PopularMovies = (props) => {
    console.log(props);
    const imagePath = 'https://image.tmdb.org/t/p/w200';
    const dataY = [];
    const ref = useRef(null);
    let dataX = [];

    props.movieList.results.forEach(element => {
        dataX.push(element);
        if(dataX.length >= 5) {
            dataY.push(dataX);
            dataX = [];
        }
    });

    return(
        <div className={styles.movie_root}>
            <div onClick={() => movieScroll(-(ref.current.scrollWidth / (dataY.length)))} className={`${styles.control} ${styles.left}`}>
                <IconContext.Provider value={{ color: "blue", size: "5rem" }}>
                    <GrFormPrevious />
                </IconContext.Provider> 
            </div>
            <div className={styles.movie_container} ref={ref}>
                {
                    dataY.map((movies, index) => (
                        <div className={styles.movie_group} id={`movie_gr_${index}`}  ref={ref}>
                            {                    
                                movies.map(movie => (
                                    <Link href={`/movie/${movie.id}`}>
                                        <div className={styles.movie_card} key={movie.id}>
                                            
                                            <img className={styles.movie_image} src={`${imagePath}${movie.backdrop_path !== null ? movie.backdrop_path : movie.poster_path}`} />
                                            <div className={styles.movie_card_details}>
                                                <span className={styles.movie_card_details_title}>{movie.title}</span>
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
                    <IconContext.Provider value={{ color: "blue", size: "5rem" }}>
                        <GrFormNext />
                    </IconContext.Provider> 
            </div>
        </div>
    );

    function movieScroll(offset) {
        console.log(offset)
        ref.current.scrollLeft += offset;
    }
}

export default PopularMovies;