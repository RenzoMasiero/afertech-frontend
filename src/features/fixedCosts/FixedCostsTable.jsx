import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";

const formatCurrency = (value) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(typeof value === "number" ? value : 0);

export default function FixedCostsTable({ rows, onAdd, onView }) {
  const isMobile = useMediaQuery("(max-width:900px)");

  const columns = [
    {
      field: "costTypeName",
      headerName: "Tipo de costo",
      ...(isMobile ? { minWidth: 180 } : { flex: 1.5 }),
    },
    {
      field: "employeeName",
      headerName: "Empleado",
      ...(isMobile ? { minWidth: 160 } : { flex: 1.5 }),
    },
    {
      field: "amount",
      headerName: "Monto",
      ...(isMobile ? { minWidth: 140 } : { flex: 1 }),
      renderCell: (params) => formatCurrency(params.row.amount),
    },
    {
      field: "allocationMonth",
      headerName: "Mes imputado",
      ...(isMobile ? { minWidth: 160 } : { flex: 1 }),
    },
    {
      field: "paymentDate",
      headerName: "Fecha de pago",
      ...(isMobile ? { minWidth: 160 } : { flex: 1 }),
    },
    {
      field: "description",
      headerName: "Descripción",
      ...(isMobile ? { minWidth: 220 } : { flex: 2 }),
    },
    {
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      ...(isMobile ? { minWidth: 120 } : {}),
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
        <Typography variant="h5">Costos fijos</Typography>
        <Button variant="contained" onClick={onAdd}>
          + Agregar costo fijo
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
