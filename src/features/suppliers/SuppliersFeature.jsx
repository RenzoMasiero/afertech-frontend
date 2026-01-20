import { useEffect, useState } from "react";
import SuppliersTable from "./SuppliersTable";
import SupplierForm from "./SupplierForm";
import SupplierView from "./SupplierView";
import SupplierSuccess from "./SupplierSuccess";

import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../../api/suppliers.api";

import {
  mapSuppliersPageToUI,
  mapSupplierToUI,
} from "../../mappers/supplier.mapper";

export default function SuppliersFeature({ authUser }) {
  const [mode, setMode] = useState("list");
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  useEffect(() => {
    getSuppliers().then((r) => {
      const mapped = mapSuppliersPageToUI(r);
      setSuppliers(mapped.items);
    });
  }, []);

  const handleAdd = () => {
    setSelectedSupplier(null);
    setMode("create");
  };

  const handleView = (supplier) => {
    setSelectedSupplier(supplier);
    setMode("view");
  };

  const handleEdit = (supplier) => {
    setSelectedSupplier(supplier);
    setMode("edit");
  };

  const handleSave = async (data) => {
    try {
      let response;

      if (data.id) {
        response = await updateSupplier(data.id, data);
      } else {
        response = await createSupplier(data);
      }

      // 🔒 Fuente única de verdad: mapper SIEMPRE
      const mappedSaved = mapSupplierToUI(response);

      setSuppliers((prev) => {
        const exists = prev.find((s) => s.id === mappedSaved.id);
        return exists
          ? prev.map((s) => (s.id === mappedSaved.id ? mappedSaved : s))
          : [...prev, mappedSaved];
      });

      // 🔒 Orden explícito: primero data, después modo
      setSelectedSupplier(mappedSaved);
      setMode("success");
    } catch {
      // 🔒 Error ya canalizado globalmente (popup)
      return;
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que querés eliminar este proveedor? Esta acción no se puede deshacer."
    );
    if (!confirmed) return;

    try {
      await deleteSupplier(id);
      setSuppliers((prev) => prev.filter((s) => s.id !== id));
      setSelectedSupplier(null);
      setMode("list");
    } catch {
      // 🔒 Error ya canalizado globalmente (popup)
      return;
    }
  };

  if (mode === "list") {
    return (
      <SuppliersTable
        rows={suppliers}
        onAdd={handleAdd}
        onView={handleView}
      />
    );
  }

  if (mode === "create") {
    return (
      <SupplierForm
        onCancel={() => setMode("list")}
        onSubmit={handleSave}
      />
    );
  }

  if (mode === "edit" && selectedSupplier) {
    return (
      <SupplierForm
        initialData={selectedSupplier}
        onCancel={() => setMode("view")}
        onSubmit={handleSave}
      />
    );
  }

  if (mode === "view" && selectedSupplier) {
    return (
      <SupplierView
        supplier={selectedSupplier}
        authUser={authUser}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onBack={() => setMode("list")}
      />
    );
  }

  if (mode === "success") {
    // 🔒 NUNCA renderizar Success sin entidad válida
    if (!selectedSupplier) return null;

    return (
      <SupplierSuccess
        supplier={selectedSupplier}
        onBack={() => setMode("list")}
      />
    );
  }

  return null;
}
