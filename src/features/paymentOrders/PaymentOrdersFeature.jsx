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

import { mapPaymentOrdersPageToUI } from "../../mappers/paymentOrder.mapper";

import { getClients } from "../../api/clients.api";
import { getProjects } from "../../api/projects.api";
import { getInvoices } from "../../api/invoices.api";
import { getPurchaseOrders } from "../../api/purchaseOrders.api";

export default function PaymentOrdersFeature() {
  const [mode, setMode] = useState("list");
  const [paymentOrders, setPaymentOrders] = useState([]);
  const [selectedPaymentOrder, setSelectedPaymentOrder] = useState(null);

  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);

  useEffect(() => {
    getPaymentOrders().then((r) => {
      const mapped = mapPaymentOrdersPageToUI(r);
      setPaymentOrders(mapped.items);
    });

    getClients().then((r) => setClients(r.items));
    getProjects().then((r) => setProjects(r.items));
    getInvoices().then((r) => setInvoices(r.items));
    getPurchaseOrders().then((r) => setPurchaseOrders(r.items));
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
    let saved;

    if (data.id) {
      saved = await updatePaymentOrder(data.id, data);
    } else {
      saved = await createPaymentOrder(data);
    }

    setPaymentOrders((prev) => {
      const exists = prev.find((o) => o.id === saved.id);
      if (exists) {
        return prev.map((o) => (o.id === saved.id ? saved : o));
      }
      return [...prev, saved];
    });

    setSelectedPaymentOrder(saved);
    setMode("success");
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que querés eliminar esta orden de pago? Esta acción no se puede deshacer."
    );

    if (!confirmed) return;

    await deletePaymentOrder(id);
    setPaymentOrders((prev) => prev.filter((o) => o.id !== id));
    setMode("list");
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
        purchaseOrders={purchaseOrders}
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
        purchaseOrders={purchaseOrders}
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
        onEdit={handleEdit}
        onDelete={handleDelete}
        onBack={() => setMode("list")}
      />
    );
  }

  if (mode === "success" && selectedPaymentOrder) {
    return (
      <PaymentOrderSuccess
        order={selectedPaymentOrder}
        onBack={() => setMode("list")}
      />
    );
  }

  return null;
}
