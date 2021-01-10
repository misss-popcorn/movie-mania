export default function RecommendationCard({ info }) {
  return (
    <div className="recommendation-card">
      <img
        src={`https://image.tmdb.org/t/p/original/${info.backdrop_path}`}
        alt="movie"
      />
      <b>{info.title}</b>
    </div>
  );
}
