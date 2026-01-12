import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";

const formatCurrency = (v) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(typeof v === "number" ? v : 0);

export default function VariableCostsTable({ rows, onAdd, onView }) {
  const isMobile = useMediaQuery("(max-width:900px)");

  const columns = [
    {
      field: "costTypeName",
      headerName: "Tipo",
      ...(isMobile ? { minWidth: 140 } : { flex: 1.2 }),
    },
    {
      field: "supplierName",
      headerName: "Proveedor",
      ...(isMobile ? { minWidth: 160 } : { flex: 1.5 }),
    },
    {
      field: "projectName",
      headerName: "Proyecto",
      ...(isMobile ? { minWidth: 160 } : { flex: 1.2 }),
      // 🔒 MISMO PATRÓN: valueGetter recibe el valor del field
      valueGetter: (v) => v ?? "-",
    },
    {
      field: "allocationMonth",
      headerName: "Mes",
      ...(isMobile ? { minWidth: 120 } : { flex: 1 }),
    },
    {
      field: "amount",
      headerName: "Monto",
      ...(isMobile ? { minWidth: 140 } : { flex: 1 }),
      renderCell: (p) => formatCurrency(p.row.amount),
    },
    {
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      ...(isMobile ? { minWidth: 120 } : {}),
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
        <Typography variant="h5">Costos variables</Typography>
        <Button variant="contained" onClick={onAdd}>
          + Agregar costo variable
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
