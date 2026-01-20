import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import TrailerModal from "../../Components/Modal/TrailerModal";
import { fetchGenres } from "../../api/tmdb";
import { fetchYoutubeTrailer } from "../../api/youtube";

// MUI
import {
  Box,
  Container,
  Paper,
  Typography,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import MovieRoundedIcon from "@mui/icons-material/MovieRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";

function Movies() {
  const [movieList, setMovieList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [trailerUrl, setTrailerUrl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    name: "",
    overview: "",
    genres: [],
    actors: [],
  });

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const g = await fetchGenres();
        setGenres(Array.isArray(g) ? g : []);
      } catch (e) {
        console.error("Failed to load genres", e);
        setGenres([]);
      }
    };
    loadGenres();
  }, []);

  useEffect(() => {
    setMovieList([]);
    setPage(1);
    loadMovies(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGenre, searchTerm]);

  useEffect(() => {
    if (page > 1) loadMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadMovies = async (reset = false) => {
    setLoading(true);
    try {
      let url = "";

      if (searchTerm.trim()) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${
          process.env.REACT_APP_TMDB_API_KEY
        }&language=en-US&page=${page}&query=${encodeURIComponent(searchTerm)}`;
      } else {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${
          process.env.REACT_APP_TMDB_API_KEY
        }&language=en-US&page=${page}${
          selectedGenre ? `&with_genres=${selectedGenre}` : ""
        }`;
      }

      const res = await fetch(url);
      const data = await res.json();

      const results = Array.isArray(data?.results) ? data.results : [];
      setMovieList((prev) => (reset ? results : [...prev, ...results]));
    } catch (err) {
      console.error("Failed to load movies", err);
      if (reset) setMovieList([]);
    }
    setLoading(false);
  };

  const openTrailerModal = async (movie, type = "movie") => {
    try {
      const detailsUrl = `https://api.themoviedb.org/3/${type}/${movie.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&append_to_response=credits`;
      const res = await fetch(detailsUrl);
      const details = await res.json();

      const title = details.title || details.name || "";
      const url = await fetchYoutubeTrailer(title);

      setTrailerUrl(url);
      setModalContent({
        name: title,
        overview: details.overview || "",
        genres: Array.isArray(details.genres) ? details.genres : [],
        actors: details.credits?.cast?.slice(0, 5) || [],
      });
      setModalOpen(true);
    } catch (error) {
      console.error("Failed to load movie details", error);
      alert("Failed to load movie details.");
    }
  };

  const activeGenreName =
    selectedGenre && Array.isArray(genres)
      ? genres.find((g) => String(g.id) === String(selectedGenre))?.name
      : "";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        position: "relative",
        backgroundImage: `radial-gradient(1200px 600px at 20% -10%, rgba(144, 202, 249, 0.14), transparent 60%),
                          radial-gradient(900px ivati 500px at 90% 10%, rgba(206, 147, 216, 0.10), transparent 55%),
                          radial-gradient(1000px 600px at 50% 110%, rgba(255, 245, 157, 0.08), transparent 60%)`,
      }}
    >
      <NavBar />

      {/* Spacer for fixed/sticky navbar */}
      <Box sx={{ height: { xs: 64, md: 72 } }} />

      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 } }}>
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            p: { xs: 2, md: 2.5 },
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "rgba(0,0,0,0.25)",
            backdropFilter: "blur(8px)",
            mb: { xs: 2.5, md: 3 },
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
            justifyContent="space-between"
          >
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <MovieRoundedIcon sx={{ opacity: 0.9 }} />
                <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: 0.2 }}>
                  Movies
                </Typography>
              </Box>

              <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5 }}>
                Browse by genre or search by title.
              </Typography>

              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
                {searchTerm.trim() ? (
                  <Chip
                    size="small"
                    icon={<SearchRoundedIcon />}
                    label={`Search: "${searchTerm.trim()}"`}
                    onDelete={() => setSearchTerm("")}
                    sx={{ borderRadius: 999 }}
                  />
                ) : null}

                {activeGenreName ? (
                  <Chip
                    size="small"
                    icon={<TuneRoundedIcon />}
                    label={`Genre: ${activeGenreName}`}
                    onDelete={() => setSelectedGenre("")}
                    sx={{ borderRadius: 999 }}
                  />
                ) : null}
              </Box>
            </Box>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ width: { xs: "100%", md: "62%" } }}
            >
              <TextField
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                  setMovieList([]);
                }}
                placeholder="Search movies by name..."
                fullWidth
                size="medium"
                InputProps={{
                  startAdornment: (
                    <Box sx={{ display: "flex", alignItems: "center", mr: 1, opacity: 0.7 }}>
                      <SearchRoundedIcon />
                    </Box>
                  ),
                }}
              />

              <FormControl fullWidth>
                <InputLabel id="movie-genre-select-label">Genre</InputLabel>
                <Select
                  labelId="movie-genre-select-label"
                  value={selectedGenre}
                  label="Genre"
                  onChange={(e) => setSelectedGenre(e.target.value)}
                >
                  <MenuItem value="">
                    <em>All Genres</em>
                  </MenuItem>
                  {(genres || []).map((genre) => (
                    <MenuItem key={genre.id} value={genre.id}>
                      {genre.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Stack>

          <Divider sx={{ mt: 2, opacity: 0.6 }} />
        </Paper>

        {/* CSS Grid Poster Wall */}
        <Box
          sx={{
            display: "grid",
            gap: { xs: 2, md: 2.5 },
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",   // phones
              sm: "repeat(3, 1fr)",   // small screens
              md: "repeat(4, 1fr)",   // medium
              lg: "repeat(6, 1fr)",   // large (poster wall)
              xl: "repeat(7, 1fr)",   // extra large
            },
          }}
        >
          {(movieList || []).map((movie) => {
            const poster = movie.poster_path
              ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
              : "";

            return (
              <Card
                key={movie.id}
                elevation={0}
                sx={{
                  borderRadius: 3,
                  bgcolor: "rgba(0,0,0,0.35)",
                  overflow: "hidden",
                  transition: "transform .2s",
                  "&:hover": { transform: "scale(1.04)" },
                }}
              >
                <CardActionArea onClick={() => openTrailerModal(movie, "movie")}>
                  <CardMedia
                    component="img"
                    image={poster}
                    alt={movie.title}
                    sx={{
                      width: "100%",
                      aspectRatio: "2 / 3",
                      objectFit: "cover",
                      bgcolor: "rgba(255,255,255,0.06)",
                    }}
                  />
                  <CardContent sx={{ py: 1 }}>
                    <Typography variant="body2" align="center" sx={{ fontWeight: 500 }}>
                      {movie.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </Box>

        {/* Load more */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: { xs: 3, md: 4 } }}>
          <Button
            onClick={() => setPage((p) => p + 1)}
            disabled={loading}
            variant="contained"
            size="large"
            sx={{
              textTransform: "none",
              fontWeight: 700,
              borderRadius: 999,
              px: 3,
              py: 1.1,
            }}
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        </Box>
      </Container>

      <TrailerModal
        isOpen={modalOpen}
        trailerUrl={trailerUrl}
        modalContent={modalContent}
        onClose={() => {
          setModalOpen(false);
          setTrailerUrl(null);
          setModalContent({ name: "", overview: "", genres: [], actors: [] });
        }}
      />
    </Box>
  );
}

export default Movies;
