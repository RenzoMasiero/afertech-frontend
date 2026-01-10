import { Box, Typography, Button, Divider } from "@mui/material";

export default function CostTypeView({
  costType,
  authUser,
  onEdit,
  onDelete,
  onBack,
}) {
  const isAdmin = authUser?.role === "ADMIN";

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Detalle de tipo de costo fijo
      </Typography>

      <Typography>
        <strong>Nombre:</strong> {costType.name}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography>
        <strong>Cargado por:</strong> {costType.loadedBy}
      </Typography>

      <Typography>
        <strong>Fecha de carga:</strong> {costType.loadedAt}
      </Typography>

      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        {isAdmin && (
          <>
            <Button variant="contained" onClick={() => onEdit(costType)}>
              Editar
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={() => onDelete(costType.id)}
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
