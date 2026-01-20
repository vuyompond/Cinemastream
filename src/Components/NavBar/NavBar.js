import React from "react";
import { NavLink } from "react-router-dom";

// MUI
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
} from "@mui/material";
import LocalMoviesRoundedIcon from "@mui/icons-material/LocalMoviesRounded";

function NavBar() {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: "rgba(10,12,18,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: "xl",
          width: "100%",
          mx: "auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocalMoviesRoundedIcon sx={{ opacity: 0.9 }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              letterSpacing: 0.3,
            }}
          >
            <span style={{ color: "#90caf9" }}>Cinema</span>Stream
          </Typography>
        </Box>

        {/* Navigation links */}
        <Box sx={{ display: "flex", gap: 1 }}>
          {[
            { label: "Home", to: "/" },
            { label: "Movies", to: "/movies" },
            { label: "Series", to: "/series" },
          ].map((item) => (
            <Button
              key={item.to}
              component={NavLink}
              to={item.to}
              end
              sx={{
                textTransform: "none",
                fontWeight: 700,
                color: "rgba(255,255,255,0.85)",
                borderRadius: 999,
                px: 2,
                "&.active": {
                  bgcolor: "rgba(144, 202, 249, 0.18)",
                  color: "#90caf9",
                },
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
