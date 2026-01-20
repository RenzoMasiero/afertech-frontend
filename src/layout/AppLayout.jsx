import { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  useMediaQuery,
  Modal,
  Typography,
  Button,
} from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout({ selected, onSelect, children }) {
  const isMobile = useMediaQuery("(max-width:900px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [error, setError] = useState({
    open: false,
    message: "",
    details: [],
  });

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

  /* ===== GLOBAL API ERROR LISTENER ===== */
  useEffect(() => {
    const handler = (event) => {
      const { message, details } = event.detail || {};

      setError({
        open: true,
        message: message || "Ocurrió un error inesperado",
        details: Array.isArray(details) ? details : [],
      });
    };

    window.addEventListener("global-api-error", handler);
    return () => window.removeEventListener("global-api-error", handler);
  }, []);

  const handleCloseError = () => {
    setError({ open: false, message: "", details: [] });
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Header onMenuClick={isMobile ? handleOpenDrawer : undefined} />

      <Box sx={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* ===== SIDEBAR DESKTOP ===== */}
        {!isMobile && (
          <Box
            sx={{
              height: "100%",
              overflowY: "auto",
              backgroundColor: "#e0e0e0",
            }}
          >
            <Sidebar selected={selected} onSelect={onSelect} />
          </Box>
        )}

        {/* ===== SIDEBAR MOBILE ===== */}
        {isMobile && (
          <Drawer
            open={drawerOpen}
            onClose={handleCloseDrawer}
            ModalProps={{ keepMounted: true }}
          >
            <Box
              sx={{
                height: "100%",
                overflowY: "auto",
                backgroundColor: "#e0e0e0",
              }}
              onClick={handleCloseDrawer}
            >
              <Sidebar selected={selected} onSelect={onSelect} />
            </Box>
          </Drawer>
        )}

        {/* ===== CONTENIDO CENTRAL (ÚNICO SCROLL) ===== */}
        <Box
          sx={{
            flex: 1,
            padding: 3,
            overflowY: "auto",
            overflowX: isMobile ? "auto" : "hidden",

            ...(isMobile && {
              "& .MuiTable-root": {
                width: "max-content",
              },
              "& .MuiTableCell-root": {
                whiteSpace: "nowrap",
                width: "max-content",
              },
            }),
          }}
        >
          {children}
        </Box>
      </Box>

      {/* ===== GLOBAL ERROR MODAL ===== */}
      <Modal open={error.open} onClose={handleCloseError}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "background.paper",
            padding: 4,
            minWidth: 320,
            maxWidth: 600,
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {error.message}
          </Typography>

          {error.details.length > 0 && (
            <Box sx={{ mt: 2 }}>
              {error.details.map((detail, index) => (
                <Typography key={index} variant="body2">
                  • {detail}
                </Typography>
              ))}
            </Box>
          )}

          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={handleCloseError}>
              Cerrar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
