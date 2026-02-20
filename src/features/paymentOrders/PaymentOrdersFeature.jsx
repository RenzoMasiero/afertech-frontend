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

  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const loadPage = async (pageNumber = 0) => {
    const r = await getPaymentOrders(pageNumber, 20);
    const mapped = mapPaymentOrdersPageToUI(r);

    setPaymentOrders(mapped.items);
    setTotalItems(mapped.totalItems);
    setPage(mapped.page);
  };

  useEffect(() => {
    loadPage(0);
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
    try {
      if (data.id) {
        await updatePaymentOrder(data.id, data);
      } else {
        await createPaymentOrder(data);
      }

      await loadPage(0);
      setMode("list");
    } catch {
      return;
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que querés eliminar esta orden de pago? Esta acción no se puede deshacer."
    );
    if (!confirmed) return;

    try {
      await deletePaymentOrder(id);
      await loadPage(0);
      setMode("list");
    } catch {
      return;
    }
  };

  if (mode === "list") {
    return (
      <PaymentOrdersTable
        rows={paymentOrders}
        page={page}
        totalItems={totalItems}
        onPageChange={loadPage}
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