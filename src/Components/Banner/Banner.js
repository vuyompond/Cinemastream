import React, { useEffect, useState } from 'react';
import { fetchDiscoverMovie } from '../../api/tmdb';

// MUI
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

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
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: 320, sm: 380, md: 440 },
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
        backgroundImage: backdrop
          ? `url(https://image.tmdb.org/t/p/original${backdrop})`
          : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay + subtle gradient for readability */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.25) 75%, rgba(0,0,0,0.15) 100%)',
        }}
      />

      {/* Soft vignette */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          boxShadow: 'inset 0 0 140px rgba(0,0,0,0.7)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', pb: { xs: 3, md: 4 } }}>
        <Stack spacing={1.5} sx={{ maxWidth: { xs: '100%', md: '60%' } }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              letterSpacing: 0.3,
              lineHeight: 1.05,
              textShadow: '0 10px 30px rgba(0,0,0,0.65)',
              fontSize: { xs: '1.8rem', sm: '2.4rem', md: '3rem' },
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              opacity: 0.92,
              maxWidth: 800,
              textShadow: '0 8px 24px rgba(0,0,0,0.55)',
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {overview.length > 300 ? overview.slice(0, 300) : overview}
          </Typography>

          <Box sx={{ pt: 1 }}>
            <Button
              onClick={handlePlayClick}
              variant="contained"
              size="large"
              startIcon={<PlayArrowRoundedIcon />}
              sx={{
                textTransform: 'none',
                fontWeight: 700,
                borderRadius: 999,
                px: 2.5,
                py: 1.1,
                boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
              }}
            >
              Play trailer
            </Button>
          </Box>

          {/* Optional: slide indicator dots (pure UI, no logic change) */}
          <Box sx={{ display: 'flex', gap: 1, pt: 1.5, pb: 0.5 }}>
            {movies.slice(0, 8).map((_, idx) => (
              <Box
                key={idx}
                sx={{
                  width: idx === currentIndex ? 18 : 8,
                  height: 8,
                  borderRadius: 999,
                  transition: 'all 200ms ease',
                  bgcolor: idx === currentIndex ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.35)',
                }}
              />
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default Banner;
