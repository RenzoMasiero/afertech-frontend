import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";

export default function ClientsTable({ rows, onAdd, onView }) {
  const columns = [
    { field: "name", headerName: "Nombre", flex: 1.5 },
    { field: "taxId", headerName: "CUIT", flex: 1 },
    {
      field: "active",
      headerName: "Activo",
      flex: 0.5,
      renderCell: (params) => (params.value ? "Sí" : "No"),
    },
    {
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      renderCell: (params) => (
        <Button size="small" onClick={() => onView(params.row)}>
          Ver
        </Button>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Clientes</Typography>
        <Button variant="contained" onClick={onAdd}>
          + Agregar cliente
        </Button>
      </Box>

      <Box sx={{ height: 520 }}>
        <DataGrid
          rows={rows || []}
          columns={columns}
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
