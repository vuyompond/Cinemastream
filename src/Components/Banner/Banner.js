import React, { useEffect, useState } from 'react';
import './Banner.css';
import { fetchDiscoverMovie } from '../../api/tmdb';

function Banner({ onPlayTrailer }) {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadMovies = async () => {
      const moviesData = await fetchDiscoverMovie();
      setMovies(moviesData || []);
    };
    loadMovies();
  }, []);

  // Advance slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        movies.length ? (prevIndex + 1) % movies.length : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  if (movies.length === 0) return null;

  const featuredMovie = movies[currentIndex] || {};
  const title = featuredMovie.title || featuredMovie.name || '';
  const overview = featuredMovie.overview || '';
  const backdrop = featuredMovie.backdrop_path;

  const handlePlayClick = () => {
    if (onPlayTrailer) onPlayTrailer(featuredMovie);
  };

  return (
    <div
      className="banner"
      style={{
        backgroundImage: backdrop
          ? `url(https://image.tmdb.org/t/p/original${backdrop})`
          : 'none',
      }}
    >
      <h1 className="banner-title">{title}</h1>

      <p className="banner-overview">
        {overview.length > 300 ? overview.slice(0, 300) : overview}
      </p>

      <button className="banner-button" onClick={handlePlayClick}>
        Play trailer
      </button>
    </div>
  );
}

export default Banner;
