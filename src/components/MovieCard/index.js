export default function MovieCard({info}) {
    return (
       <div className="movie-card">
            <img 
              src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${info.backdrop_path}`}
              alt="movie"
            />
            <b>{info.title}</b>
            <p>{info.release_date}</p>
          </div>
    );
  }