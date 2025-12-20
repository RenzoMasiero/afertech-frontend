import { useEffect, useState } from "react";
import AppLayout from "./layout/AppLayout";
import InvoicesTable from "./components/InvoicesTable";
import InvoiceForm from "./components/InvoiceForm";
import InvoiceView from "./components/InvoiceView";
import InvoiceSuccess from "./components/InvoiceSuccess";
import { Box, Typography } from "@mui/material";

export default function App() {
  const [section, setSection] = useState("home");
  const [mode, setMode] = useState("list");
  // list | create | view | edit | success

  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  /* ===== LOAD INVOICES ===== */
  useEffect(() => {
    fetch("http://localhost:8080/invoices")
      .then((r) => r.json())
      .then(setInvoices);
  }, []);

  /* ===== HANDLERS ===== */
  const handleAdd = () => {
    setSelectedInvoice(null);
    setMode("create");
  };

  const handleView = (invoice) => {
    setSelectedInvoice(invoice);
    setMode("view");
  };

  const handleEdit = (invoice) => {
    setSelectedInvoice(invoice);
    setMode("edit");
  };

  const handleSaved = (savedInvoice) => {
    setInvoices((prev) => {
      const exists = prev.find((i) => i.id === savedInvoice.id);
      if (exists) {
        return prev.map((i) =>
          i.id === savedInvoice.id ? savedInvoice : i
        );
      }
      return [...prev, savedInvoice];
    });

    setSelectedInvoice(savedInvoice);
    setMode("success");
  };

  return (
    <AppLayout selected={section} onSelect={setSection}>
      {/* ===== HOME ===== */}
      {section === "home" && (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3" color="primary">
            Afertech
          </Typography>
        </Box>
      )}

      {/* ===== INVOICES ===== */}
      {section === "invoices" && mode === "list" && (
        <InvoicesTable
          rows={invoices}
          onAdd={handleAdd}
          onView={handleView}
        />
      )}

      {section === "invoices" && mode === "create" && (
        <InvoiceForm
          onCancel={() => setMode("list")}
          onSubmit={handleSaved}
        />
      )}

      {section === "invoices" && mode === "view" && selectedInvoice && (
        <InvoiceView
          invoice={selectedInvoice}
          onEdit={handleEdit}
          onBack={() => setMode("list")}
        />
      )}

      {section === "invoices" && mode === "edit" && selectedInvoice && (
        <InvoiceForm
          initialData={selectedInvoice}
          onCancel={() => setMode("view")}
          onSubmit={handleSaved}
        />
      )}

      {section === "invoices" && mode === "success" && selectedInvoice && (
        <InvoiceSuccess
          invoice={selectedInvoice}
          onBack={() => setMode("list")}
        />
      )}
    </AppLayout>
  );
}
