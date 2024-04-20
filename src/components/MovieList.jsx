const MovieList = ({ films }) => {
  return (
    <ul>
      {Array.isArray(films) &&
        films.map((film) => {
          return <li key={film.id}>{film.title}</li>;
        })}
    </ul>
  );
};

export default MovieList;
