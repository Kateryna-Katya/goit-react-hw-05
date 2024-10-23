import { useEffect, useState } from "react";
import { requestTrendingMovies } from "../../api/filmApi.js";
import MovieList from "../../components/MovieList/MovieList.jsx";
import style from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await requestTrendingMovies();
        setMovies(response.data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, []);

  return (
    <div className={style.container}>
      <h1>Trending today</h1>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
