import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button, Container } from "@mui/material";
import LocalMoviesRoundedIcon from "@mui/icons-material/LocalMoviesRounded";

function NavBar() {
  const navItems = [
    { label: "Home", to: "/home" },
    { label: "Movies", to: "/movies" },
    { label: "TV Series", to: "/series" },
    { label: "Logout", to: "/landingpage" },
  ];

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        top: 0,
        left: 0,
        right: 0,
        width: "100vw", // force full viewport width
        bgcolor: "rgba(10,12,18,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Full-width container, padding handled inside */}
      <Container maxWidth={false} disableGutters>
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 64, md: 72 },
            px: { xs: 2, md: 4 }, // navbar padding here
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocalMoviesRoundedIcon sx={{ opacity: 0.9 }} />
            <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: 0.3 }}>
              <span style={{ color: "#90caf9" }}>Cinema</span>Stream
            </Typography>
          </Box>

          {/* Links */}
          <Box sx={{ display: "flex", gap: 1 }}>
            {navItems.map((item) => (
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
                  "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
