import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../components/SerchForm/SearchForm";
import Loader from "../components/Loader/Loader";
import NotFoundPage from "./NotFoundPage";
import MovieList from "../components/MovieList";
import { getMoviesByQuery } from "../services/api";

const MoviesPage = () => {
  const [films, setFilms] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  useEffect(() => {
    if (!query) return;

    async function getMoviesByQuery() {
      try {
        setIsLoading(true);
        const data = await getMoviesByQuery(query);
        setFilms(data.results);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getMoviesByQuery();
  }, [query]);

  const onSetSearchQuery = (searchTerm) => {
    setSearchParams({ query: searchTerm });
  };

  return (
    <div>
      <SearchForm onSetSearchQuery={onSetSearchQuery} />
      {isLoading && <Loader />}
      {isError && <NotFoundPage />}
      {films && <MovieList films={films} />}
    </div>
  );
};

export default MoviesPage;
