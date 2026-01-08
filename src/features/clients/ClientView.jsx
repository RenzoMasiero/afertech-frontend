import { Box, Typography, Button, Divider } from "@mui/material";

const formatDateTime = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
};

export default function ClientView({
  client,
  authUser,
  onEdit,
  onDelete,
  onBack,
}) {
  const isAdmin = authUser?.role === "ADMIN";

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Detalle de cliente
      </Typography>

      <Typography>
        <strong>Nombre:</strong> {client.name}
      </Typography>
      <Typography>
        <strong>CUIT:</strong> {client.taxId}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography>
        <strong>Cargado el:</strong> {formatDateTime(client.loadedAt)}
      </Typography>
      <Typography>
        <strong>Cargado por:</strong> {client.loadedBy}
      </Typography>

      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        {isAdmin && (
          <>
            <Button variant="contained" onClick={() => onEdit(client)}>
              Editar
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => onDelete(client.id)}
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
