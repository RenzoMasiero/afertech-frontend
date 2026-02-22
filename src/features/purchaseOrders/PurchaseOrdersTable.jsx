import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";

const formatCurrency = (value, currency) => {
  if (typeof value !== "number") return "-";

  const symbol = currency === "USD" ? "U$S " : "$ ";

  return (
    symbol +
    new Intl.NumberFormat("es-AR", {
      maximumFractionDigits: 2,
    }).format(value)
  );
};

export default function PurchaseOrdersTable({
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
      field: "purchaseOrderNumber",
      headerName: "Orden de compra",
      ...(isMobile ? { minWidth: 180 } : { flex: 1 }),
    },
    {
      field: "clientName",
      headerName: "Cliente",
      ...(isMobile ? { minWidth: 160 } : { flex: 1.5 }),
    },
    {
      field: "projectName",
      headerName: "Proyecto",
      ...(isMobile ? { minWidth: 160 } : { flex: 1.5 }),
    },
    {
      field: "issueDate",
      headerName: "Fecha",
      ...(isMobile ? { minWidth: 140 } : { flex: 1 }),
    },
    {
      field: "totalWithTax",
      headerName: "Total",
      ...(isMobile ? { minWidth: 140 } : { flex: 1 }),
      renderCell: (params) =>
        formatCurrency(params.row.totalWithTax, params.row.currencyOriginal),
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
        <Typography variant="h5">Órdenes de compra</Typography>
        <Button variant="contained" onClick={onAdd}>
          + Agregar orden de compra
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