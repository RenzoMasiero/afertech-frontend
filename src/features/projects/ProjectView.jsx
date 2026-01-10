import { Box, Typography, Button, Divider } from "@mui/material";

const formatDateTime = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
};

export default function ProjectView({
  project,
  authUser,
  onEdit,
  onDelete,
  onBack,
}) {
  const isAdmin = authUser?.role === "ADMIN";

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Detalle de proyecto
      </Typography>

      <Typography>
        <strong>Nombre:</strong> {project.name}
      </Typography>

      <Typography>
        <strong>Descripción:</strong> {project.description}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography>
        <strong>Cargado el:</strong> {formatDateTime(project.loadedAt)}
      </Typography>

      <Typography>
        <strong>Cargado por:</strong> {project.loadedBy}
      </Typography>

      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        {isAdmin && (
          <>
            <Button variant="contained" onClick={() => onEdit(project)}>
              Editar
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => onDelete(project.id)}
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
