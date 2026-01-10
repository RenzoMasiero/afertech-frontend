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

        <ListItemButton
          selected={selected === "paymentOrders"}
          onClick={() => onSelect("paymentOrders")}
        >
          <ListItemText primary="Órdenes de pago" />
        </ListItemButton>

        <ListItemButton
          selected={selected === "purchaseOrders"}
          onClick={() => onSelect("purchaseOrders")}
        >
          <ListItemText primary="Órdenes de compra" />
        </ListItemButton>

        <ListItemButton
          selected={selected === "clients"}
          onClick={() => onSelect("clients")}
        >
          <ListItemText primary="Clientes" />
        </ListItemButton>

        <ListItemButton
          selected={selected === "projects"}
          onClick={() => onSelect("projects")}
        >
          <ListItemText primary="Proyectos" />
        </ListItemButton>

        {/* ✅ TIPOS DE COSTO FIJO */}
        <ListItemButton
          selected={selected === "costTypes"}
          onClick={() => onSelect("costTypes")}
        >
          <ListItemText primary="Tipos de costo fijo" />
        </ListItemButton>

        {/* ✅ TIPOS DE COSTO VARIABLE */}
        <ListItemButton
          selected={selected === "variableCostTypes"}
          onClick={() => onSelect("variableCostTypes")}
        >
          <ListItemText primary="Tipos de costo variable" />
        </ListItemButton>
      </List>
    </Box>
  );
}
