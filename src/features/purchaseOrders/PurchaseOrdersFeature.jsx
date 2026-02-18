import { useEffect, useState } from "react";
import PurchaseOrdersTable from "./PurchaseOrdersTable";
import PurchaseOrderForm from "./PurchaseOrderForm";
import PurchaseOrderView from "./PurchaseOrderView";
import PurchaseOrderSuccess from "./PurchaseOrderSuccess";

import {
  getPurchaseOrders,
  createPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
} from "../../api/purchaseOrders.api";

import {
  mapPurchaseOrdersPageToUI,
  mapPurchaseOrderToUI,
} from "../../mappers/purchaseOrder.mapper";

import { getClients } from "../../api/clients.api";
import { getProjects } from "../../api/projects.api";

export default function PurchaseOrdersFeature({ authUser }) {
  const [mode, setMode] = useState("list");
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState(null);

  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);

  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const loadPage = async (pageNumber = 0) => {
    const r = await getPurchaseOrders(pageNumber, 20);
    const mapped = mapPurchaseOrdersPageToUI(r);

    setPurchaseOrders(mapped.items);
    setTotalItems(mapped.totalItems);
    setPage(mapped.page);
  };

  useEffect(() => {
    loadPage(0);
    getClients().then((r) => setClients(r.items));
    getProjects().then((r) => setProjects(r.items));
  }, []);

  const handleAdd = () => {
    setSelectedPurchaseOrder(null);
    setMode("create");
  };

  const handleView = (order) => {
    setSelectedPurchaseOrder(order);
    setMode("view");
  };

  const handleEdit = (order) => {
    setSelectedPurchaseOrder(order);
    setMode("edit");
  };

  const handleSave = async (data) => {
    try {
      if (data.id) {
        await updatePurchaseOrder(data.id, data);
      } else {
        await createPurchaseOrder(data);
      }

      await loadPage(0);
      setMode("list");
    } catch {
      return;
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que querés eliminar esta orden de compra? Esta acción no se puede deshacer."
    );
    if (!confirmed) return;

    try {
      await deletePurchaseOrder(id);
      await loadPage(0);
      setMode("list");
    } catch {
      return;
    }
  };

  if (mode === "list") {
    return (
      <PurchaseOrdersTable
        rows={purchaseOrders}
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
      <PurchaseOrderForm
        clients={clients}
        projects={projects}
        onCancel={() => setMode("list")}
        onSubmit={handleSave}
      />
    );
  }

  if (mode === "edit" && selectedPurchaseOrder) {
    return (
      <PurchaseOrderForm
        clients={clients}
        projects={projects}
        initialData={selectedPurchaseOrder}
        onCancel={() => setMode("view")}
        onSubmit={handleSave}
      />
    );
  }

  if (mode === "view" && selectedPurchaseOrder) {
    return (
      <PurchaseOrderView
        order={selectedPurchaseOrder}
        authUser={authUser}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onBack={() => setMode("list")}
      />
    );
  }

  if (mode === "success") {
    if (!selectedPurchaseOrder) return null;

    return (
      <PurchaseOrderSuccess
        order={selectedPurchaseOrder}
        onBack={() => setMode("list")}
      />
    );
  }

  return null;
}
