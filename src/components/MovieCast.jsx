import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import NotFoundPage from "../pages/NotFoundPage";
import { getMovieCredits } from "../services/api";
import styles from "./MovieCast.module.css"; // імпортуйте стилі з CSS-модуля

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
        setMovieCast(data.cast);
        console.log(data.cast);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    asyncWrapper();
  }, [movieId]);

  return (
    <div className={styles["movie-cast-container"]}>
      {isLoading && (
        <div className={styles["loader-container"]}>
          <Loader />
        </div>
      )}
      {isError && <NotFoundPage />}
      {movieCast !== null && movieCast.length > 0 && (
        <>
          <h3>Movie Cast</h3>
          <ul className={styles["movie-cast-list"]}>
            {movieCast.map((actor) => (
              <li key={actor.id} className={styles["movie-cast-item"]}>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                  alt="actor photo"
                />
                <h3 className={styles["actor-name"]}>{actor.name}</h3>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MovieCast;
