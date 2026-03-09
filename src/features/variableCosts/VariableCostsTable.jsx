import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";

const formatCurrency = (value, currency) => {
  const number = typeof value === "number" ? value : 0;
  const symbol = currency === "USD" ? "U$S " : "$ ";

  return (
    symbol +
    new Intl.NumberFormat("es-AR", {
      maximumFractionDigits: 2,
    }).format(number)
  );
};

export default function VariableCostsTable({
  rows,
  page,
  totalItems,
  onPageChange,
  onAdd,
  onView,
}) {
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
      renderCell: (params) => params.row.projectName ?? "-",
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
      renderCell: (params) =>
        formatCurrency(params.row.amount, params.row.currencyOriginal),
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
          paginationMode="server"
          rowCount={totalItems}
          paginationModel={{ page, pageSize: 20 }}
          onPaginationModelChange={(model) => {
            if (model.page !== page) {
              onPageChange(model.page);
            }
          }}
          pageSizeOptions={[20]}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}

