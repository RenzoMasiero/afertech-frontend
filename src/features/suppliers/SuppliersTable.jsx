import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";

export default function SuppliersTable({ rows, onAdd, onView }) {
  const columns = [
    {
      field: "name",
      headerName: "Proveedor",
      flex: 1.5,
    },
    {
      field: "taxId",
      headerName: "CUIT",
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
        <Typography variant="h5">Proveedores</Typography>
        <Button variant="contained" onClick={onAdd}>
          + Agregar proveedor
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
