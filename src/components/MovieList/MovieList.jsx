import { Link, useLocation } from "react-router-dom";
import style from "./MovieList.module.css";
const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={style.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={style.item}>
          <Link
            to={`/movies/${movie.id}`}
            className={style.link}
            state={{ from: location }}
          >
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default MovieList;
