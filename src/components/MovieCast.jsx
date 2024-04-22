import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import NotFoundPage from "../pages/NotFoundPage";
import { getMovieCredits } from "../services/api";

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function asyncWrapper() {
      try {
        setIsLoading(true);
        const data = await getMovieCredits(movieId);
        setMovieCast(data);
        console.log(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    asyncWrapper();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {isError && <NotFoundPage />}
      {movieCast !== null && movieCast.length > 0 && (
        <>
          <ul>
            {movieCast.map((actor) => (
              <li key={actor.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                  alt="actor photo"
                />
                <h3>{actor.original_name}</h3>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MovieCast;
