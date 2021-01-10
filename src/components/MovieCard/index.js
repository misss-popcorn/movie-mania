import { Link } from "react-router-dom";
import Moment from "react-moment";

export default function MovieCard({ info }) {
  return (
    <Link className="movie-card-link" to={`/movie/${info.id}`}>
      <div className="movie-card">
        <img
          src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${info.poster_path}`}
          alt="movie"
        />
        <b>{info.title}</b>
        <p>
          <Moment format="MMM DD, YYYY">{info.release_date}</Moment>
        </p>
      </div>
    </Link>
  );
}
