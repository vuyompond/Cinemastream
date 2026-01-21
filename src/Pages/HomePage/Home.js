import React, { useState } from 'react';

// Keep your existing components
import Navbar from '../../Components/NavBar/NavBar';
import Banner from '../../Components/Banner/Banner';
import Row from '../../Components/MovieRows/Row';
import TrailerModal from "../../Components/Modal/TrailerModal";

// Keep your existing API calls
import {
  fetchPopularMovies,
  fetchPopularSeries,
  fetchMovieDetails,
  fetchSeriesDetails
} from '../../api/tmdb';
import { fetchYoutubeTrailer } from '../../api/youtube';

// MUI
import { Box, Container, Paper, Typography, Divider } from '@mui/material';
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded';
import TvRoundedIcon from '@mui/icons-material/TvRounded';

function Home() {
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    name: "",
    overview: "",
    genres: [],
    actors: [],
  });

  const openTrailerModal = async (movie) => {
    try {
      const url = await fetchYoutubeTrailer(movie.title || movie.name);

      let details = {};
      if (movie.media_type === 'movie' || movie.title) {
        details = await fetchMovieDetails(movie.id);
      } else if (movie.media_type === 'tv' || movie.name) {
        details = await fetchSeriesDetails(movie.id);
      }

      if (url && details) {
        setTrailerUrl(url);
        setModalContent(details);
        setModalOpen(true);
      } else {
        alert('Trailer or details not found!');
      }
    } catch (error) {
      console.error('Error fetching trailer or details:', error);
      alert('Failed to load trailer or details.');
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setTrailerUrl(null);
    setModalContent({});
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        position: 'relative',
        backgroundImage: `radial-gradient(1200px 600px at 20% -10%, rgba(144, 202, 249, 0.18), transparent 60%),
                          radial-gradient(900px 500px at 90% 10%, rgba(206, 147, 216, 0.14), transparent 55%),
                          radial-gradient(1000px 600px at 50% 110%, rgba(255, 245, 157, 0.10), transparent 60%)`,
      }}
    >
      <Navbar />

      {/* Spacer for fixed/sticky Navbar so Banner is not hidden behind it */}
      <Box sx={{ height: { xs: 64, md: 72 } }} />

      {/* Hero */}
      <Box sx={{ pt: { xs: 2, md: 3 } }}>
        <Container maxWidth="xl">
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'rgba(18, 18, 18, 0.40)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Banner onPlayTrailer={openTrailerModal} />
          </Paper>
        </Container>
      </Box>

      {/* Content */}
      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 } }}>
        {/* Trending Movies */}
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <WhatshotRoundedIcon sx={{ opacity: 0.9 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 0.2 }}>
              Trending Movies
            </Typography>
          </Box>

          <Divider sx={{ mb: 2, opacity: 0.6 }} />

          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              p: { xs: 1.5, md: 2 },
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'rgba(0,0,0,0.25)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Row
              title="" // prevent duplicate title
              fetchFunction={fetchPopularMovies}
              onMovieClick={openTrailerModal}
            />
          </Paper>
        </Box>

        {/* Trending Series */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <TvRoundedIcon sx={{ opacity: 0.9 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 0.2 }}>
              Trending TV Series
            </Typography>
          </Box>

          <Divider sx={{ mb: 2, opacity: 0.6 }} />

          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              p: { xs: 1.5, md: 2 },
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'rgba(0,0,0,0.25)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Row
              title="" // prevent duplicate title
              fetchFunction={fetchPopularSeries}
              onMovieClick={openTrailerModal}
            />
          </Paper>
        </Box>
      </Container>

      <TrailerModal
        isOpen={modalOpen}
        trailerUrl={trailerUrl}
        modalContent={modalContent}
        onClose={closeModal}
      />
    </Box>
  );
}

export default Home;
