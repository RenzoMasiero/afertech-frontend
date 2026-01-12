import { Box } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout({ selected, onSelect, children }) {
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <Box sx={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <Box sx={{ height: "100%", overflowY: "auto" }}>
          <Sidebar selected={selected} onSelect={onSelect} />
        </Box>

        <Box sx={{ flex: 1, padding: 3, overflowY: "auto" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
