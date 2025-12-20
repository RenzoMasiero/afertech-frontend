import { Box, List, ListItemButton, ListItemText } from "@mui/material";

export default function Sidebar({ selected, onSelect }) {
  return (
    <Box sx={{ width: 220, backgroundColor: "#e0e0e0", height: "100%" }}>
      <List>
        <ListItemButton
          selected={selected === "home"}
          onClick={() => onSelect("home")}
        >
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton
          selected={selected === "invoices"}
          onClick={() => onSelect("invoices")}
        >
          <ListItemText primary="Facturas" />
        </ListItemButton>

        <ListItemButton disabled>
          <ListItemText primary="Órdenes de compra" />
        </ListItemButton>

        <ListItemButton disabled>
          <ListItemText primary="Proyectos" />
        </ListItemButton>
      </List>
    </Box>
  );
}
