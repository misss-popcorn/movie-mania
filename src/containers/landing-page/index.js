import MovieCard from "../.././components/MovieCard";
import Loader from "../.././components/Loader";
import {
  getAllGenres,
  getNewReleases,
  getMoviesByCategory,
  searchMovies,
} from "../.././services/api.js";

import React, { useState, useEffect, useRef } from "react";

export default function LandingPage() {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("-1");
  const [browseSectionHeading, setBrowseSectionHeading] = useState(
    "Browse movies by category"
  );
  const [loaderVisibility, setLoaderVisibility] = useState(true);
  const search = useRef(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      const [gResponse, mResponse] = await Promise.all([
        getAllGenres(),
        getNewReleases(),
      ]);
      setGenres(gResponse.genres);
      setMovies(mResponse.results);
      setLoaderVisibility(false);
    };
    fetchInitialData();
  }, []);

  const loadMovies = async (id) => {
    setLoaderVisibility(true);
    setSelectedGenre(id);
    const response = await getMoviesByCategory(id);
    setMovies(response.results);
    setLoaderVisibility(false);
  };

  const handleSearchMovies = async () => {
    setLoaderVisibility(true);
    const response = await searchMovies(search.current.value);
    setMovies(response.results);
    setBrowseSectionHeading(
      `Showing results for <strong>'${search.current.value}'</strong>`
    );
    setLoaderVisibility(false);
  };

  return (
    <>
      {loaderVisibility && <Loader />}
      <section className="search-section">
        <div className="search-section-heading">
          <span className="section-heading">
            Find perfect movie for <strong>evening</strong>
          </span>
        </div>
        <div className="search-section-main">
          <input
            type="text"
            className="search-input"
            placeholder="Search movies"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchMovies();
              }
            }}
            ref={search}
          />
          <button
            type="button"
            className="search-btn"
            onClick={handleSearchMovies}
          >
            Search
          </button>
        </div>
      </section>
      <section className="browse-section">
        <div className="browse-section-heading">
          <span
            className="section-heading"
            dangerouslySetInnerHTML={{ __html: browseSectionHeading }}
          ></span>
        </div>
        <div className="browse-section-options">
          <button
            value={"-1"}
            className={selectedGenre === "-1" ? "selected-genre" : ""}
          >
            New Release
          </button>

          {genres &&
            genres.map((genre) => {
              return (
                <button
                  className={selectedGenre === genre.id ? "selected-genre" : ""}
                  onClick={() => loadMovies(genre.id)}
                  key={genre.id}
                  value={genre.id}
                >
                  {genre.name}
                </button>
              );
            })}
        </div>
        <div className="browse-section-main">
          {movies &&
            movies.map((movie) => {
              return <MovieCard info={movie} key={movie.id} />;
            })}
        </div>
      </section>
    </>
  );
}
