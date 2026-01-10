import { Box, Typography, Button, Divider } from "@mui/material";

export default function VariableCostTypeView({
  type,
  authUser,
  onEdit,
  onDelete,
  onBack,
}) {
  const isAdmin = authUser?.role === "ADMIN";

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Detalle de tipo de costo variable
      </Typography>

      <Typography>
        <strong>Nombre:</strong> {type.name}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        {isAdmin && (
          <>
            <Button variant="contained" onClick={() => onEdit(type)}>
              Editar
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={() => onDelete(type.id)}
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
