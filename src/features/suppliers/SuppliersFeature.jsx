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
} from "../../mappers/supplier.mapper";

export default function SuppliersFeature({ authUser }) {
  const [mode, setMode] = useState("list");
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const loadPage = async (pageNumber = 0) => {
    const r = await getSuppliers(pageNumber, 20);
    const mapped = mapSuppliersPageToUI(r);

    setSuppliers(mapped.items);
    setTotalItems(mapped.totalItems);
    setPage(mapped.page);
  };

  useEffect(() => {
    loadPage(0);
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
      if (data.id) {
        await updateSupplier(data.id, data);
      } else {
        await createSupplier(data);
      }

      await loadPage(0);
      setMode("list");
    } catch {
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
      await loadPage(0);
      setMode("list");
    } catch {
      return;
    }
  };

  if (mode === "list") {
    return (
      <SuppliersTable
        rows={suppliers}
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