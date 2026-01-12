import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";

export default function Header({ onMenuClick }) {
  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <Box
      sx={{
        height: 100,
        backgroundColor: "#03a9f4",
        display: "flex",
        alignItems: "center",
        paddingX: 4,
        justifyContent: isMobile ? "center" : "flex-start",
      }}
    >
      {isMobile ? (
        <>
          <IconButton
            onClick={onMenuClick}
            sx={{
              position: "absolute",
              left: 16,
              color: "white",
              fontSize: "1.8rem",
            }}
            aria-label="open menu"
          >
            ☰
          </IconButton>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" sx={{ color: "white", lineHeight: 1.2 }}>
              Gestión Total
            </Typography>
            <Typography
              variant="h4"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              AferTech
            </Typography>
          </Box>
        </>
      ) : (
        <Typography variant="h4" sx={{ color: "white" }}>
          Gestión Total - AferTech
        </Typography>
      )}
    </Box>
  );
}
