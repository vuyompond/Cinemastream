import React from "react";

// MUI
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Stack,
  Chip,
  Avatar,
  Divider,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

function TrailerModal({ isOpen, trailerUrl, modalContent = {}, onClose }) {
  const { name = "Details", overview = "", genres = [], actors = [] } = modalContent;

  return (
    <Dialog
      open={Boolean(isOpen)}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          bgcolor: "rgba(10,12,18,0.92)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.08)",
          overflow: "hidden",
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Header */}
        <Box
          sx={{
            px: { xs: 2, md: 2.5 },
            py: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            {name}
          </Typography>

          <IconButton onClick={onClose} sx={{ color: "rgba(255,255,255,0.8)" }}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        {/* Trailer */}
        {trailerUrl ? (
          <Box sx={{ position: "relative", width: "100%", aspectRatio: "16 / 9", bgcolor: "#000" }}>
            <Box
              component="iframe"
              title="Trailer"
              src={trailerUrl}
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: 0,
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>
        ) : null}

        {/* Details */}
        <Box sx={{ p: { xs: 2, md: 2.5 } }}>
          {overview ? (
            <>
              <Typography variant="body2" sx={{ opacity: 0.85, lineHeight: 1.6 }}>
                {overview}
              </Typography>
              <Divider sx={{ my: 2, opacity: 0.25 }} />
            </>
          ) : null}

          {/* Genres */}
          <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
            Genres
          </Typography>

          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 2 }}>
            {Array.isArray(genres) && genres.length > 0 ? (
              genres.map((g) => (
                <Chip
                  key={g.id}
                  label={g.name}
                  size="small"
                  sx={{
                    borderRadius: 999,
                    bgcolor: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.9)",
                  }}
                />
              ))
            ) : (
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                No genres found.
              </Typography>
            )}
          </Stack>

          {/* Actors */}
          <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
            Actors
          </Typography>

          <Stack spacing={1.2}>
            {Array.isArray(actors) && actors.length > 0 ? (
              actors.map((actor) => (
                <Box
                  key={actor.cast_id ?? `${actor.name}-${actor.character}`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.2,
                    p: 1,
                    borderRadius: 3,
                    bgcolor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <Avatar
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w92${actor.profile_path}`
                        : undefined
                    }
                    alt={actor.name}
                    sx={{ width: 36, height: 36 }}
                  />

                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {actor.name}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.75 }}>
                      as {actor.character}
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                No actors found.
              </Typography>
            )}
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default TrailerModal;
