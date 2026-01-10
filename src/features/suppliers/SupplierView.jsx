import { Box, Typography, Button, Divider } from "@mui/material";

export default function SupplierView({
  supplier,
  authUser,
  onEdit,
  onDelete,
  onBack,
}) {
  const isAdmin = authUser?.role === "ADMIN";

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Detalle de proveedor
      </Typography>

      <Typography>
        <strong>Proveedor:</strong> {supplier.name}
      </Typography>

      <Typography>
        <strong>CUIT:</strong> {supplier.taxId}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        {isAdmin && (
          <>
            <Button variant="contained" onClick={() => onEdit(supplier)}>
              Editar
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={() => onDelete(supplier.id)}
            >
              Eliminar
            </Button>
          </>
        )}

        <Button variant="outlined" onClick={onBack}>
          Volver
        </Button>
      </Box>
    </Box>
  );
}
