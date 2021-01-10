export default function CastCard({ info }) {
  return (
    <div className="cast-card">
      <img
        src={`https://image.tmdb.org/t/p/w440_and_h660_face/${info.profile_path}`}
        alt="movie"
      />
      <strong>{info.name}</strong>
      <p>{info.character}</p>
    </div>
  );
}
