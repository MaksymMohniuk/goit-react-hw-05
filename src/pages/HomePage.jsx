import { useState, useEffect } from "react";
import { getTrendingMovies } from "../services/api";
import Loader from "../components/Loader/Loader";
import NotFoundPage from "./NotFoundPage";
import MovieList from "../components/MovieList";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setIsLoading(true);
        const movies = await getTrendingMovies();
        setTrendingMovies(movies);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className={styles["homepage-container"]}>
      <h1 className={styles["homepage-title"]}>Trending today</h1>
      {isLoading && (
        <div className={styles["loader-container"]}>
          <Loader />
        </div>
      )}
      {isError && <NotFoundPage />}
      {trendingMovies && <MovieList movies={trendingMovies} />}
    </div>
  );
};

export default HomePage;
