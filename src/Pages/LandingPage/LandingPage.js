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

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchPopularMovies();
        setPopularMovies(Array.isArray(data) ? data.slice(0, 12) : []);
      } catch (e) {
        console.error("Error fetching popular movies:", e);
        setPopularMovies([]);
      }
    };
    loadMovies();
  }, []);

  useEffect(() => {
    const loadSeries = async () => {
      try {
        const data = await fetchPopularSeries();
        setPopularSeries(Array.isArray(data) ? data.slice(0, 12) : []);
      } catch (e) {
        console.error("Error fetching popular series:", e);
        setPopularSeries([]);
      }
    };
    loadSeries();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        px: { xs: 2, md: 4 },
        backgroundImage: `
          radial-gradient(1200px 600px at 20% -10%, rgba(144,202,249,0.14), transparent 60%),
          radial-gradient(900px 500px at 90% 10%, rgba(206,147,216,0.10), transparent 55%),
          radial-gradient(1000px 600px at 50% 110%, rgba(255,245,157,0.08), transparent 60%)
        `,
      }}
    >
      {/* Top Nav */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "rgba(10,12,18,0.75)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
          <LocalMoviesRoundedIcon sx={{ opacity: 0.9 }} />
          <Typography sx={{ fontWeight: 900, flexGrow: 1, ml: 1 }}>
            CinemaStream
          </Typography>

          <Stack direction="row" spacing={1}>
            <Button component={Link} to="/login" sx={{ fontWeight: 700, textTransform: "none" }}>
              Sign In
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              sx={{ fontWeight: 800, borderRadius: 999, textTransform: "none" }}
            >
              Register
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Hero */}
      <Paper
        elevation={0}
        sx={{
          mt: 4,
          mb: 4,
          borderRadius: 5,
          p: { xs: 3, md: 5 },
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "rgba(0,0,0,0.25)",
          backdropFilter: "blur(10px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(135deg, rgba(144,202,249,0.10) 0%, rgba(206,147,216,0.08) 40%, rgba(255,245,157,0.06) 100%)",
          }}
        />

        <Box sx={{ position: "relative" }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              mb: 1,
              fontSize: { xs: "1.9rem", sm: "2.4rem", md: "3rem" },
              lineHeight: 1.05,
            }}
          >
            Get access to the best movies and TV shows
          </Typography>

          <Typography sx={{ opacity: 0.85 }}>
            Stream your favourite content anytime, anywhere.
          </Typography>

          <Button
            component={Link}
            to="/register"
            variant="contained"
            size="large"
            sx={{ mt: 3, borderRadius: 999, fontWeight: 900, textTransform: "none" }}
          >
            Get Started
          </Button>
        </Box>
      </Paper>

      {/* Popular Movies Row */}
      <RowSection title="Popular Movies" icon={<MovieRoundedIcon />} items={popularMovies} />

      {/* Popular Series Row */}
      <RowSection title="Popular Series" icon={<TvRoundedIcon />} items={popularSeries} />

      {/* Footer */}
      <Box sx={{ mt: 6, pb: 3, opacity: 0.75 }}>
        <Divider sx={{ mb: 2, opacity: 0.4 }} />
        <Typography align="center" variant="body2">
          © 2025 CinemaStream. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

/* ======================
   Horizontal Row Section
   ====================== */
function RowSection({ title, icon, items }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
        {icon}
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          {title}
        </Typography>
      </Stack>

      <Divider sx={{ mb: 2, opacity: 0.6 }} />

      <Box
        sx={{
          display: "flex",
          gap: { xs: 2, md: 2.5 },
          overflowX: "auto",
          pb: 1,
          scrollSnapType: "x mandatory",

          // Hide scrollbar (optional)
          "&::-webkit-scrollbar": { height: 8 },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255,255,255,0.18)",
            borderRadius: 999,
          },
          "&::-webkit-scrollbar-track": { background: "rgba(255,255,255,0.06)" },
        }}
      >
        {items.map((item) => {
          const poster = item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : "";
          const titleText = item.title || item.name || "Untitled";

          return (
            <Card
              key={item.id}
              elevation={0}
              sx={{
                flex: "0 0 auto",
                width: { xs: 170, sm: 190, md: 210 }, // 👈 controls poster size
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "rgba(0,0,0,0.25)",
                backdropFilter: "blur(8px)",
                overflow: "hidden",
                scrollSnapAlign: "start",
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
                  alt={titleText}
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
                    title={titleText}
                  >
                    {titleText}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}
