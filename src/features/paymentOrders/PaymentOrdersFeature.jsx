import { useEffect, useState } from "react";
import PaymentOrdersTable from "./PaymentOrdersTable";
import PaymentOrderForm from "./PaymentOrderForm";
import PaymentOrderView from "./PaymentOrderView";
import PaymentOrderSuccess from "./PaymentOrderSuccess";

import {
  getPaymentOrders,
  createPaymentOrder,
  updatePaymentOrder,
  deletePaymentOrder,
} from "../../api/paymentOrders.api";

import {
  mapPaymentOrdersPageToUI,
  mapPaymentOrderToUI,
} from "../../mappers/paymentOrder.mapper";

import { getClients } from "../../api/clients.api";
import { getProjects } from "../../api/projects.api";
import { getInvoices } from "../../api/invoices.api";

export default function PaymentOrdersFeature({ authUser }) {
  const [mode, setMode] = useState("list");
  const [paymentOrders, setPaymentOrders] = useState([]);
  const [selectedPaymentOrder, setSelectedPaymentOrder] = useState(null);

  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    getPaymentOrders().then((r) => {
      const mapped = mapPaymentOrdersPageToUI(r);
      setPaymentOrders(mapped.items);
    });

    getClients().then((r) => setClients(r.items));
    getProjects().then((r) => setProjects(r.items));
    getInvoices().then((r) => setInvoices(r.items));
  }, []);

  const handleAdd = () => {
    setSelectedPaymentOrder(null);
    setMode("create");
  };

  const handleView = (order) => {
    setSelectedPaymentOrder(order);
    setMode("view");
  };

  const handleEdit = (order) => {
    setSelectedPaymentOrder(order);
    setMode("edit");
  };

  const handleSave = async (data) => {
    let response;

    if (data.id) {
      response = await updatePaymentOrder(data.id, data);
    } else {
      response = await createPaymentOrder(data);
    }

    // 🔒 Fuente única de verdad: mapper SIEMPRE
    const mappedSaved = mapPaymentOrderToUI(response);

    setPaymentOrders((prev) => {
      const exists = prev.find((o) => o.id === mappedSaved.id);
      return exists
        ? prev.map((o) => (o.id === mappedSaved.id ? mappedSaved : o))
        : [...prev, mappedSaved];
    });

    // 🔒 Orden explícito: primero data, después modo
    setSelectedPaymentOrder(mappedSaved);
    setMode("success");
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que querés eliminar esta orden de pago? Esta acción no se puede deshacer."
    );
    if (!confirmed) return;

    try {
      await deletePaymentOrder(id);
      setPaymentOrders((prev) => prev.filter((o) => o.id !== id));
      setSelectedPaymentOrder(null);
      setMode("list");
    } catch (error) {
      const status = error?.response?.status;
      if (status === 409) {
        alert(
          "No se puede eliminar la orden de pago porque está asociada a una factura."
        );
        return;
      }
      alert("Ocurrió un error al eliminar la orden de pago.");
    }
  };

  if (mode === "list") {
    return (
      <PaymentOrdersTable
        rows={paymentOrders}
        onAdd={handleAdd}
        onView={handleView}
      />
    );
  }

  if (mode === "create") {
    return (
      <PaymentOrderForm
        clients={clients}
        projects={projects}
        invoices={invoices}
        onCancel={() => setMode("list")}
        onSubmit={handleSave}
      />
    );
  }

  if (mode === "edit" && selectedPaymentOrder) {
    return (
      <PaymentOrderForm
        clients={clients}
        projects={projects}
        invoices={invoices}
        initialData={selectedPaymentOrder}
        onCancel={() => setMode("view")}
        onSubmit={handleSave}
      />
    );
  }

  if (mode === "view" && selectedPaymentOrder) {
    return (
      <PaymentOrderView
        order={selectedPaymentOrder}
        authUser={authUser}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onBack={() => setMode("list")}
      />
    );
  }

  if (mode === "success") {
    // 🔒 NUNCA renderizar Success sin entidad válida
    if (!selectedPaymentOrder) return null;

    return (
      <PaymentOrderSuccess
        order={selectedPaymentOrder}
        onBack={() => setMode("list")}
      />
    );
  }

  return null;
}
