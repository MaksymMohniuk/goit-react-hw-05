import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../components/SerchForm/SearchForm";
import Loader from "../components/Loader/Loader";
import NotFoundPage from "./NotFoundPage";
import MovieList from "../components/MovieList";
import { getMoviesByQuery } from "../services/api";

const MoviesPage = () => {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  useEffect(() => {
    if (!query) return;

    async function asyncWrapper() {
      try {
        setIsLoading(true);
        const data = await getMoviesByQuery(query);
        setMovies(data);
        console.log(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    asyncWrapper();
  }, [query]);

  const onSetSearchQuery = (searchTerm) => {
    setSearchParams({ query: searchTerm });
  };

  return (
    <div>
      <SearchForm onSetSearchQuery={onSetSearchQuery} />
      {isLoading && <Loader />}
      {isError && <NotFoundPage />}
      {movies && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
