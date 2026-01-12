import { useState } from "react";
import { Box, Drawer, useMediaQuery } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout({ selected, onSelect, children }) {
  const isMobile = useMediaQuery("(max-width:900px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header onMenuClick={isMobile ? handleOpenDrawer : undefined} />

      <Box sx={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {!isMobile && (
          <Box sx={{ height: "100%", overflowY: "auto" }}>
            <Sidebar selected={selected} onSelect={onSelect} />
          </Box>
        )}

        {isMobile && (
          <Drawer
            open={drawerOpen}
            onClose={handleCloseDrawer}
            ModalProps={{ keepMounted: true }}
          >
            <Box
              sx={{ height: "100%", overflowY: "auto" }}
              onClick={handleCloseDrawer}
            >
              <Sidebar selected={selected} onSelect={onSelect} />
            </Box>
          </Drawer>
        )}

        {/* Contenido central */}
        <Box
          sx={{
            flex: 1,
            padding: 3,
            overflowY: "auto",
            overflowX: isMobile ? "auto" : "hidden",

            // 👇 FIX REAL PARA MUI TABLE EN MOBILE
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
    </Box>
  );
}
