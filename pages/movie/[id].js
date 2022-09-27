import { useRouter } from 'next/router';

export default function Movie() {
     
    const movieRouter = useRouter();
    const movieId = movieRouter.query;

    return <div>About {movieId}</div>
}