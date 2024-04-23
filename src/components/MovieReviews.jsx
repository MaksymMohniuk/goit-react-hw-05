import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import NotFoundPage from "../pages/NotFoundPage";
import { getMovieReviews } from "../services/api";
import styles from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function asyncWrapper() {
      try {
        setIsLoading(true);
        const data = await getMovieReviews(movieId);
        setMovieReviews(data.results);
        console.log(data.results);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    asyncWrapper();
  }, [movieId]);

  return (
    <div className={styles["review-container"]}>
      {isLoading && (
        <div className={styles["loader-container"]}>
          <Loader />
        </div>
      )}
      {isError && <NotFoundPage />}
      {movieReviews && movieReviews.length > 0 ? (
        <div>
          <h3>Movie Reviews</h3>
          <ul className={styles["review-list"]}>
            {movieReviews.map((review) => (
              <li key={review.id} className={styles["review-item"]}>
                <p className={styles["review-author"]}>{review.author}</p>
                <p className={styles["review-content"]}>{review.content}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>We do not find any reviews</p>
      )}
    </div>
  );
};

export default MovieReviews;
