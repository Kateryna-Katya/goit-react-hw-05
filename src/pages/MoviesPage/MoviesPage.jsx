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
  const [searchQuery, setSearchQuery] = useState("");
  const query = searchParams.get("query") ?? "";

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    setSearchParams({ query: searchQuery });
  };
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  useEffect(() => {
    if (query === "") {
      setMovies([]);
      return;
    }
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await searchMovies(query);
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
          value={searchQuery}
          onChange={handleInputChange}
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
