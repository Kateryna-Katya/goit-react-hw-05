import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../api/filmApi";
import style from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoading(true);
        const response = await getMovieCast(movieId);
        setCast(response.data.cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCast();
  }, [movieId]);

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      <ul className={style.list}>
        {cast !== null &&
          cast.length > 0 &&
          cast.map((actor) => (
            <li key={actor.cast_id} className={style.item}>
              <img
                className={style.img}
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                width={200}
                alt={actor.name}
              />
              <div>
                <p className={style.name}>
                  <b>{actor.name}</b>
                </p>
                <p className={style.about}>Character: {actor.character}</p>
              </div>
            </li>
          ))}
      </ul>
      {cast !== null && cast.length === 0 && (
        <p>We don&apos;t have any information about the cast for this movie.</p>
      )}
    </>
  );
};

export default MovieCast;
