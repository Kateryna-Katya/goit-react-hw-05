import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../api/filmApi.js";
import MovieList from "../../components/MovieList/MovieList.jsx";
import style from "./MoviesPage.module.css";
const MoviesPage = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(searchParams.get("query") ?? "");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    setSearchParams({ query });
    setQuery("");
  };
  useEffect(() => {
    if (query === "") {
      return;
    }
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await searchMovies(query);
        query;
        setMovies(response.data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [query]);

  return (
    <>
      <form onSubmit={handleSearch} className={style.form}>
        <input
          className={style.input}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
        />
        <button type="submit" className={style.button}>
          Search
        </button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      {movies.length !== 0 && <MovieList movies={movies} />}
    </>
  );
};

export default MoviesPage;
