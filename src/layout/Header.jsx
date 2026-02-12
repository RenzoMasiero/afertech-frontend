import {
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  Button,
} from "@mui/material";

export default function Header({ onMenuClick, authUser, onLogout }) {
  const isMobile = useMediaQuery("(max-width:900px)");

const logoutButtonStyles = {
  backgroundColor: "#1976d2",
  color: "white",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#1565c0",
  },
};

  return (
    <Box
      sx={{
        backgroundColor: "#03a9f4",
        paddingX: 4,
        paddingY: isMobile ? 2 : 0,
      }}
    >
      {/* ===== DESKTOP ===== */}
      {!isMobile && (
        <Box
          sx={{
            height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4" sx={{ color: "white" }}>
            Gestión Total - AferTech
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {authUser && (
              <Typography variant="body1" sx={{ color: "white" }}>
                {authUser.email}
              </Typography>
            )}

            <Button
              variant="contained"
              size="small"
              onClick={onLogout}
              sx={logoutButtonStyles}
            >
              CERRAR SESIÓN
            </Button>
          </Box>
        </Box>
      )}

      {/* ===== MOBILE ===== */}
      {isMobile && (
        <Box sx={{ position: "relative" }}>
          {/* Línea 1 */}
          <Box
            sx={{
              height: 70,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              onClick={onMenuClick}
              sx={{
                position: "absolute",
                left: 0,
                color: "white",
                fontSize: "1.8rem",
              }}
              aria-label="open menu"
            >
              ☰
            </IconButton>

            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h6"
                sx={{ color: "white", lineHeight: 1.2 }}
              >
                Gestión Total
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                AferTech
              </Typography>
            </Box>
          </Box>

          {/* Línea 2 */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              paddingBottom: 1,
            }}
          >
            {authUser && (
              <Typography variant="body2" sx={{ color: "white" }}>
                {authUser.email}
              </Typography>
            )}

            <Button
              variant="contained"
              size="small"
              onClick={onLogout}
              sx={logoutButtonStyles}
            >
              Cerrar sesión
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
