import {
  getById,
  getCredits,
  getKeywords,
  getRecommendations,
} from "../.././services/api.js";
import { useParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import LazyLoad from "react-lazyload";
import moment from "moment";
import CurrencyFormat from 'react-currency-format';

import CastCard from "../.././components/CastCard";
import RecommendationCard from "../.././components/RecommendationCard";
import Moment from "react-moment";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [movieGenre, setMovieGenre] = useState("");
  const [duration, setDuration] = useState("");
  const ref = useRef(null);

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  const formatCrew = (crew) => {
    const uniqueArr = {};
    const newArr = [];
    crew.forEach(function (entry, idx) {
      if (entry.id in uniqueArr) {
        uniqueArr[entry.id].job = uniqueArr[entry.id].job + "/" + entry.job;
      } else {
        uniqueArr[entry.id] = entry;
      }
    });
    for (var key in uniqueArr) newArr.push(uniqueArr[key]);
    return newArr;
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      const [mResponse, cResponse, kResponse, rResponse] = await Promise.all([
        getById(id),
        getCredits(id),
        getKeywords(id),
        getRecommendations(id),
      ]);
      setMovie({
        ...mResponse,
        ...{ crew: formatCrew(cResponse.crew) },
        ...{ cast: cResponse.cast },
        ...{ keywords: kResponse.keywords },
        ...{ recommendations: rResponse.results },
      });
    };
    fetchInitialData();
  }, [id]);

  useEffect(() => {
    if (movie && movie.genres && movie.genres.length) {
      setDuration(
        moment.duration(movie.runtime, "minutes").format("h[h] m[m]")
      );
      const selectedMovieGenre = movie.genres
        .map(function (author) {
          return author.name;
        })
        .join(",");
      setMovieGenre(selectedMovieGenre);
    }
  }, [movie]);

  return (
    <>
      <section className="feature-image">
        <LazyLoad height={540}>
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt="feature"
          />
        </LazyLoad>
        <div className="feature-image-title">
          <h1>{movie.original_title}</h1>
          <p>
            <span>
              <Moment format="DD/MM/YYYY">{movie.release_date}</Moment>
            </span>
            <span className="separator">|</span>
            <span>{movieGenre}</span>
            <span className="separator">|</span>
            <span>{duration}</span>
          </p>
        </div>
      </section>
      <section className="movie-detail">
        <div className="movie-description">
          <b className="section-heading">Overview</b>
          <p className="about">{movie.overview}</p>
          <div className="movie-info">
            {movie.crew &&
              movie.crew.slice(0, 4).map((crew) => {
                return (
                  <span key={crew.id}>
                    <strong>{crew.name}</strong>
                    <p>{crew.job}</p>
                  </span>
                );
              })}
          </div>
        </div>
        <div className="release-details">
          <span>
            <strong>Status</strong>
            <p>{movie.status}</p>
          </span>
          <span>
            <strong>Original Language</strong>
            <p>{movie.original_language}</p>
          </span>
          <span>
            <strong>Budget</strong>
            <p><CurrencyFormat value={movie.budget} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
          </span>
          <span>
            <strong>Revenue</strong>
            <p><CurrencyFormat value={movie.revenue} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
          </span>
        </div>
      </section>
      <section className="cast-details">
        <b className="section-heading">Cast</b>
        <div className="slider-actions">
          <button className="prev" onClick={() => scroll(-200)}>
            &#10094;
          </button>
          <button className="next" onClick={() => scroll(200)}>
            &#10095;
          </button>
        </div>
        <div className="cast-outer">
          <div className="cast" ref={ref}>
            {movie &&
              movie.cast &&
              movie.cast.map((cast) => {
                return <CastCard key={cast.id} info={cast} />;
              })}
          </div>
        </div>
      </section>
      <section className="tags-section">
        <div className="media">
          <b className="section-heading">Media</b>
          <img
            alt="media"
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          />
        </div>
        <div className="keywords">
          <b className="section-heading">Keywords</b>
          <div className="keywords-detail">
            {movie &&
              movie.keywords &&
              movie.keywords.map((keyword) => {
                return <span key={keyword.id}>{keyword.name}</span>;
              })}
          </div>
        </div>
      </section>
      <section className="recommendations">
        <b className="section-heading">Recommendations</b>
        <div className="main">
          {movie &&
            movie.recommendations &&
            movie.recommendations.map((recommendation) => {
              return (
                <RecommendationCard
                  key={recommendation.id}
                  info={recommendation}
                />
              );
            })}
        </div>
      </section>
    </>
  );
}
