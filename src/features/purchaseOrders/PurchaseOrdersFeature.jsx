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

  useEffect(() => {
    getPurchaseOrders().then((r) => {
      const mapped = mapPurchaseOrdersPageToUI(r);
      setPurchaseOrders(mapped.items);
    });

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
      let response;

      if (data.id) {
        response = await updatePurchaseOrder(data.id, data);
      } else {
        response = await createPurchaseOrder(data);
      }

      // 🔒 Fuente única de verdad: mapper SIEMPRE
      const mappedSaved = mapPurchaseOrderToUI(response);

      setPurchaseOrders((prev) => {
        const exists = prev.find((o) => o.id === mappedSaved.id);
        return exists
          ? prev.map((o) => (o.id === mappedSaved.id ? mappedSaved : o))
          : [...prev, mappedSaved];
      });

      // 🔒 Orden explícito: primero data, después modo
      setSelectedPurchaseOrder(mappedSaved);
      setMode("success");
    } catch {
      // 🔒 Error ya canalizado globalmente (popup)
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
      setPurchaseOrders((prev) => prev.filter((o) => o.id !== id));
      setSelectedPurchaseOrder(null);
      setMode("list");
    } catch {
      // 🔒 Error ya canalizado globalmente (popup)
      return;
    }
  };

  if (mode === "list") {
    return (
      <PurchaseOrdersTable
        rows={purchaseOrders}
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
    // 🔒 NUNCA renderizar Success sin entidad válida
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
