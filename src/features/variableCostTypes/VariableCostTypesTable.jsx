import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";

export default function VariableCostTypesTable({ rows, onAdd, onView }) {
  const columns = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      renderCell: (p) => (
        <Button size="small" onClick={() => onView(p.row)}>
          Ver
        </Button>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Tipos de costo variable</Typography>
        <Button variant="contained" onClick={onAdd}>
          + Agregar tipo
        </Button>
      </Box>

      <Box sx={{ height: 520 }}>
        <DataGrid
          rows={rows || []}
          columns={columns}
          getRowId={(r) => r.id}
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10]}
        />
      </Box>
    </Box>
  );
}
