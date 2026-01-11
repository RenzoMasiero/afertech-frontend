import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

function SectionTitle({ children }) {
  return (
    <Box
      sx={{
        px: 2,
        py: 1.5,
        mt: 2,
        background:
          "linear-gradient(to right, #03a9f4 0%, #03a9f4 35%, #e0e0e0 70%, #e0e0e0 100%)",
      }}
    >
      <Typography
        sx={{
          fontSize: "1rem",
          fontWeight: "bold",
          color: "#000000",
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}

export default function Sidebar({ selected, onSelect }) {
  return (
    <Box sx={{ width: 220, backgroundColor: "#e0e0e0", height: "100%" }}>
      <List>
        {/* Home */}
        <ListItemButton
          selected={selected === "home"}
          onClick={() => onSelect("home")}
        >
          <ListItemText primary="Home" />
        </ListItemButton>

        {/* Operación */}
        <SectionTitle>Operación</SectionTitle>

        <ListItemButton
          selected={selected === "purchaseOrders"}
          onClick={() => onSelect("purchaseOrders")}
        >
          <ListItemText primary="Órdenes de compra" />
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

        {/* Costos */}
        <SectionTitle>Costos</SectionTitle>

        <ListItemButton
          selected={selected === "fixedCosts"}
          onClick={() => onSelect("fixedCosts")}
        >
          <ListItemText primary="Costos fijos" />
        </ListItemButton>

        <ListItemButton
          selected={selected === "variableCosts"}
          onClick={() => onSelect("variableCosts")}
        >
          <ListItemText primary="Costos variables" />
        </ListItemButton>

        {/* Administración */}
        <SectionTitle>Administración</SectionTitle>

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

        <ListItemButton
          selected={selected === "suppliers"}
          onClick={() => onSelect("suppliers")}
        >
          <ListItemText primary="Proveedores" />
        </ListItemButton>

        <ListItemButton
          selected={selected === "employees"}
          onClick={() => onSelect("employees")}
        >
          <ListItemText primary="Empleados" />
        </ListItemButton>

        <ListItemButton
          selected={selected === "costTypes"}
          onClick={() => onSelect("costTypes")}
        >
          <ListItemText primary="Tipos de costo fijo" />
        </ListItemButton>

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
