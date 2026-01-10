import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";

export default function EmployeesTable({ rows, onAdd, onView }) {
  const columns = [
    {
      field: "employee",
      headerName: "Empleado",
      flex: 1.5,
      renderCell: (params) =>
        `${params.row.firstName} ${params.row.lastName}`,
    },
    {
      field: "documentNumber",
      headerName: "Documento",
      flex: 1,
    },
    {
      field: "hireDate",
      headerName: "Fecha de ingreso",
      flex: 1,
    },
    {
      field: "terminationDate",
      headerName: "Fecha de egreso",
      flex: 1,
      renderCell: (params) => params.row.terminationDate ?? "-",
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
        <Typography variant="h5">Empleados</Typography>
        <Button variant="contained" onClick={onAdd}>
          + Agregar empleado
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
