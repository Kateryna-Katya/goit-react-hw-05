import { Suspense, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import clsx from "clsx";
import { requestMovieDetails } from "../../api/filmApi";
import style from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const goBackLink = useRef(location.state?.from ?? "/movies");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await requestMovieDetails(movieId);
        setMovie(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [movieId]);

  if (!movie && !loading) {
    return <div>No movie found</div>;
  }

  const createIsActive = ({ isActive }) => {
    return clsx(style.addInfoLink, isActive && style.active);
  };

  return (
    <>
      <Link to={goBackLink.current} className={style.goBackButton}>
        Go Back
      </Link>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      {movie && (
        <div className={style.movieContainer}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className={style.moviePoster}
          />
          <div className={style.movieDetails}>
            <h2>
              {movie.title} ({movie.release_date.substring(0, 4)})
            </h2>
            <p className={style.userScore}>
              User Score: {movie.vote_average * 10}%
            </p>
            <p className={style.overview}>{movie.overview}</p>
            <p className={style.genres}>
              Genres: {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
          </div>
        </div>
      )}
      <ul className={style.navLinks}>
        <li>
          <NavLink to="cast" className={createIsActive}>
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink to="reviews" className={createIsActive}>
            Reviews
          </NavLink>
        </li>
      </ul>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetailsPage;
