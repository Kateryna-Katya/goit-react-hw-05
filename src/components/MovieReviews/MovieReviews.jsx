import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../api/filmApi";
import style from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await getMovieReviews(movieId);
        setReviews(response.data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      {reviews !== null && reviews.length > 0 ? (
        <ul className={style.list}>
          {reviews.map((review) => (
            <li key={review.id}>
              <p className={style.author}>Author: {review.author}</p>
              <p className={style.comment}>Comment: {review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        !loading && !error && <p>No reviews available for this movie.</p>
      )}
    </div>
  );
};

export default MovieReviews;
