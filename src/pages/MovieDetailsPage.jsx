import { useState, useEffect, useRef } from "react";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import NotFoundPage from "./NotFoundPage";
import { getMovieDetails } from "../services/api";
import MovieCast from "../components/MovieCast";
import MovieReviews from "../components/MovieReviews";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function asyncWrapper() {
      try {
        setIsLoading(true);
        const data = await getMovieDetails(movieId);
        setMovieDetails(data);
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
    <div className={styles["details-container"]}>
      <Link to={backLinkRef.current}>
        <button className={styles["back-button"]}>Go back</button>
      </Link>
      {isLoading && (
        <div className={styles["loader-container"]}>
          <Loader />
        </div>
      )}
      {isError && <NotFoundPage />}
      {movieDetails !== null && (
        <div className={styles["movie-details"]}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
            alt="poster"
            className={styles["movie-poster"]}
          />
          <h1 className={styles["movie-title"]}>{movieDetails.title}</h1>
          <p className={styles["movie-popularity"]}>
            Popularity: {movieDetails.popularity}
          </p>
          <p className={styles["movie-overview"]}>
            Overview: {movieDetails.overview}
          </p>
          <div className={styles["additional-info"]}>
            <h2>Additional information</h2>
            <Link to="cast" className={styles["additional-info-link"]}>
              Cast
            </Link>
            <Link to="reviews" className={styles["additional-info-link"]}>
              Reviews
            </Link>
            <Routes>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
