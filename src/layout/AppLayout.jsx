import { Box } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout({ selected, onSelect, children }) {
  return (
    <Box sx={{ height: "300vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <Box sx={{ flex: 1, display: "flex" }}>
        <Sidebar selected={selected} onSelect={onSelect} />

        <Box sx={{ flex: 1, padding: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
