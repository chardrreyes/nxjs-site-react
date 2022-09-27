import { useRouter } from 'next/router';

export default function Movie() {
     
    const movieRouter = useRouter()
    const { id } = movieRouter.query

    return <h1>About {id}</h1>
}