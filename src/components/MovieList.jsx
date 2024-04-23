import { Link, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={styles["movie-list"]}>
      {Array.isArray(movies) &&
        movies.map((movie) => {
          return (
            <li key={movie.id} className={styles["movie-item"]}>
              <Link
                state={location}
                to={`/movies/${movie.id}`}
                className={styles["movie-link"]}
              >
                {movie.title}
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export default MovieList;
