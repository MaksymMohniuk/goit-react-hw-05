import { useState, useEffect } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import NotFoundPage from "./NotFoundPage";
import { getMovieDetails } from "../services/api";
import MovieCast from "../components/MovieCast";
import MovieReviews from "../components/MovieReviews";

const MovieDetailsPage = () => {
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
    <div>
      {isLoading && <Loader />}
      {isError && <NotFoundPage />}
      {movieDetails !== null && (
        <>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
            alt="poster"
          />
          <h1>{movieDetails.title}</h1>
          <p>Popularity : {movieDetails.popularity}</p>
          <p>Overview : {movieDetails.overview}</p>
          <h2>Additional information</h2>
          <Link to="cast">Cast</Link>
          <Link to="reviews">Reviews</Link>
          <Routes>
            <Route path="cast" element={<MovieCast />}></Route>
            <Route path="reviews" element={<MovieReviews />}></Route>
          </Routes>
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;
