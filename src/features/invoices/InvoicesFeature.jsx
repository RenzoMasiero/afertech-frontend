import { useEffect, useState } from "react";
import InvoicesTable from "./InvoicesTable";
import InvoiceForm from "./InvoiceForm";
import InvoiceView from "./InvoiceView";
import InvoiceSuccess from "./InvoiceSuccess";

import {
  getInvoices,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from "../../api/invoices.api";
import { getClients } from "../../api/clients.api";
import { getProjects } from "../../api/projects.api";
import { getPurchaseOrders } from "../../api/purchaseOrders.api";

export default function InvoicesFeature({ authUser }) {
  const [mode, setMode] = useState("list");
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);

  useEffect(() => {
    getInvoices().then((r) => setInvoices(r.items));
    getClients().then((r) => setClients(r.items));
    getProjects().then((r) => setProjects(r.items));
    getPurchaseOrders().then((r) => setPurchaseOrders(r.items));
  }, []);

  const handleSave = async (data) => {
    const saved = data.id
      ? await updateInvoice(data.id, data)
      : await createInvoice(data);

    setInvoices((prev) => {
      const exists = prev.find((i) => i.id === saved.id);
      return exists
        ? prev.map((i) => (i.id === saved.id ? saved : i))
        : [...prev, saved];
    });

    setSelectedInvoice(saved);
    setMode("success");
  };

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "¿Estás seguro de que querés eliminar esta factura? Esta acción no se puede deshacer."
    );
    if (!ok) return;

    try {
      await deleteInvoice(id);
      setInvoices((prev) => prev.filter((i) => i.id !== id));
      setMode("list");
    } catch (error) {
      const status = error?.response?.status;

      if (status === 409) {
        alert(
          "No se puede eliminar la factura porque tiene una orden de pago asociada."
        );
        return;
      }

      alert("Ocurrió un error al eliminar la factura.");
    }
  };

  if (mode === "list") {
    return (
      <InvoicesTable
        rows={invoices}
        onAdd={() => setMode("create")}
        onView={(i) => {
          setSelectedInvoice(i);
          setMode("view");
        }}
      />
    );
  }

  if (mode === "create") {
    return (
      <InvoiceForm
        clients={clients}
        projects={projects}
        purchaseOrders={purchaseOrders}
        onCancel={() => setMode("list")}
        onSubmit={handleSave}
      />
    );
  }

  if (mode === "edit" && selectedInvoice) {
    return (
      <InvoiceForm
        clients={clients}
        projects={projects}
        purchaseOrders={purchaseOrders}
        initialData={selectedInvoice}
        onCancel={() => setMode("view")}
        onSubmit={handleSave}
      />
    );
  }

  if (mode === "view" && selectedInvoice) {
    return (
      <InvoiceView
        invoice={selectedInvoice}
        authUser={authUser}
        onEdit={() => setMode("edit")}
        onDelete={() => handleDelete(selectedInvoice.id)}
        onBack={() => setMode("list")}
      />
    );
  }

  if (mode === "success" && selectedInvoice) {
    return (
      <InvoiceSuccess
        invoice={selectedInvoice}
        onBack={() => setMode("list")}
      />
    );
  }

  return null;
}
