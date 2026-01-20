import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPopularSeries, fetchPopularMovies } from "../../api/tmdb";

// MUI
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Stack,
  Paper,
  Divider,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import LocalMoviesRoundedIcon from "@mui/icons-material/LocalMoviesRounded";
import MovieRoundedIcon from "@mui/icons-material/MovieRounded";
import TvRoundedIcon from "@mui/icons-material/TvRounded";

export default function LandingPage() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);

  // Fetch popular movies
  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieData = await fetchPopularMovies();
        if (Array.isArray(movieData) && movieData.length > 0) {
          setPopularMovies(movieData.slice(0, 5));
        } else {
          setPopularMovies([]);
        }
      } catch (error) {
        console.error("Error fetching popular movies:", error);
        setPopularMovies([]);
      }
    };
    fetchData();
  }, []);

  // Fetch popular series
  useEffect(() => {
    const fetchData = async () => {
      try {
        const seriesData = await fetchPopularSeries();
        if (Array.isArray(seriesData) && seriesData.length > 0) {
          setPopularSeries(seriesData.slice(0, 5));
        } else {
          setPopularSeries([]);
        }
      } catch (error) {
        console.error("Error fetching popular series:", error);
        setPopularSeries([]);
      }
    };
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        backgroundImage: `radial-gradient(1200px 600px at 20% -10%, rgba(144, 202, 249, 0.14), transparent 60%),
                          radial-gradient(900px 500px at 90% 10%, rgba(206, 147, 216, 0.10), transparent 55%),
                          radial-gradient(1000px 600px at 50% 110%, rgba(255, 245, 157, 0.08), transparent 60%)`,
      }}
    >
      {/* Top Navigation */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "rgba(10,12,18,0.75)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <LocalMoviesRoundedIcon sx={{ opacity: 0.9 }} />
          <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: 0.3, flexGrow: 1 }}>
            CinemaStream
          </Typography>

          <Stack direction="row" spacing={1.2}>
            <Button
              component={Link}
              to="/login"
              variant="text"
              sx={{ textTransform: "none", fontWeight: 700 }}
            >
              Sign In
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              sx={{
                textTransform: "none",
                fontWeight: 800,
                borderRadius: 999,
                px: 2,
              }}
            >
              Register
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
        {/* Hero / Getting started */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 5,
            p: { xs: 2.5, md: 4 },
            mb: { xs: 3, md: 4 },
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "rgba(0,0,0,0.25)",
            backdropFilter: "blur(10px)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "linear-gradient(135deg, rgba(144, 202, 249, 0.10) 0%, rgba(206, 147, 216, 0.08) 40%, rgba(255, 245, 157, 0.06) 100%)",
            }}
          />

          <Stack spacing={1.2} sx={{ position: "relative", maxWidth: 900 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                letterSpacing: 0.2,
                fontSize: { xs: "1.9rem", sm: "2.4rem", md: "3rem" },
                lineHeight: 1.05,
              }}
            >
              Get access to the best movies and TV shows
            </Typography>

            <Typography variant="body1" sx={{ opacity: 0.85 }}>
              Stream your favourite shows to your heart&apos;s content.
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.85 }}>
              Ready to enjoy? Click register and join us now.
            </Typography>

            <Box sx={{ pt: 1 }}>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="large"
                sx={{
                  textTransform: "none",
                  fontWeight: 900,
                  borderRadius: 999,
                  px: 3,
                  py: 1.2,
                }}
              >
                Get Started
              </Button>
            </Box>
          </Stack>
        </Paper>

        {/* Popular Movies */}
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
            <MovieRoundedIcon sx={{ opacity: 0.9 }} />
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Popular Movies
            </Typography>
          </Stack>
          <Divider sx={{ mb: 2, opacity: 0.6 }} />

          {/* Poster wall grid (same style as Movies/Series pages) */}
          <Box
            sx={{
              display: "grid",
              gap: { xs: 2, md: 2.5 },
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(4, 1fr)",
                lg: "repeat(6, 1fr)",
                xl: "repeat(7, 1fr)",
              },
            }}
          >
            {popularMovies.map((movie) => {
              const poster = movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "";

              return (
                <Card
                  key={movie.id}
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "rgba(0,0,0,0.25)",
                    backdropFilter: "blur(8px)",
                    overflow: "hidden",
                    transition: "transform 180ms ease, box-shadow 180ms ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
                    },
                  }}
                >
                  <CardActionArea component={Link} to="/register">
                    <CardMedia
                      component="img"
                      image={poster}
                      alt={movie.title}
                      sx={{
                        aspectRatio: "2 / 3",
                        objectFit: "cover",
                        bgcolor: "rgba(255,255,255,0.06)",
                      }}
                    />
                    <CardContent sx={{ p: 1.3 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 700,
                          lineHeight: 1.2,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          minHeight: 34,
                        }}
                        title={movie.title}
                      >
                        {movie.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })}
          </Box>
        </Box>

        {/* Popular Series */}
        <Box>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
            <TvRoundedIcon sx={{ opacity: 0.9 }} />
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Popular Series
            </Typography>
          </Stack>
          <Divider sx={{ mb: 2, opacity: 0.6 }} />

          <Box
            sx={{
              display: "grid",
              gap: { xs: 2, md: 2.5 },
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(4, 1fr)",
                lg: "repeat(6, 1fr)",
                xl: "repeat(7, 1fr)",
              },
            }}
          >
            {popularSeries.map((series) => {
              const poster = series.poster_path
                ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
                : "";
              const title = series.name || series.title || "Untitled";

              return (
                <Card
                  key={series.id}
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "rgba(0,0,0,0.25)",
                    backdropFilter: "blur(8px)",
                    overflow: "hidden",
                    transition: "transform 180ms ease, box-shadow 180ms ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
                    },
                  }}
                >
                  <CardActionArea component={Link} to="/register">
                    <CardMedia
                      component="img"
                      image={poster}
                      alt={title}
                      sx={{
                        aspectRatio: "2 / 3",
                        objectFit: "cover",
                        bgcolor: "rgba(255,255,255,0.06)",
                      }}
                    />
                    <CardContent sx={{ p: 1.3 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 700,
                          lineHeight: 1.2,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          minHeight: 34,
                        }}
                        title={title}
                      >
                        {title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })}
          </Box>
        </Box>

        {/* Footer */}
        <Box sx={{ mt: 6, pb: 3, opacity: 0.75 }}>
          <Divider sx={{ mb: 2, opacity: 0.4 }} />
          <Typography variant="body2" align="center">
            © 2025 CinemaStream. All rights reserved.
          </Typography>
        </Box>
      </Container>

      {/* Keep TrailerModal import if you’ll use it later; currently not used in your original LandingPage logic */}
      {/* If you want, we can open trailer modal when clicking a poster instead of linking to /register */}
    </Box>
  );
}
