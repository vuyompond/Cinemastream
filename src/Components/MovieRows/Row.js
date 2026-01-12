import React, { useEffect, useRef, useState } from 'react';
import './Row.css';
import MovieCard from '../MovieCard/MovieCard';

function Row({ title, fetchFunction, onMovieClick }) {
  const [movies, setMovies] = useState([]);
  const rowRef = useRef(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchFunction();
        setMovies(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(`Failed to load movies for row: ${title}`, error);
        setMovies([]);
      }
    };

    loadMovies();
  }, [fetchFunction, title]);

  const scrollLeft = () => {
    if (!rowRef.current) return;
    rowRef.current.scrollBy({ left: -500, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (!rowRef.current) return;
    rowRef.current.scrollBy({ left: 500, behavior: 'smooth' });
  };

  return (
    <div className="row-container">
      <h2 className="row-title">{title}</h2>
      <div className="row-wrapper">
        <button className="scroll-button left" onClick={scrollLeft}>&lt;</button>

        <div className="row-movies" ref={rowRef}>
          {(movies || []).map((movie, index) => (
            <MovieCard
              key={movie?.id ?? index}
              movie={movie}
              onClick={() => onMovieClick && onMovieClick(movie)}
            />
          ))}
        </div>

        <button className="scroll-button right" onClick={scrollRight}>&gt;</button>
      </div>
    </div>
  );
}

export default Row;
