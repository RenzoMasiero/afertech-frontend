import { useEffect, useState } from "react";
import VariableCostTypesTable from "./VariableCostTypesTable";
import VariableCostTypeForm from "./VariableCostTypeForm";
import VariableCostTypeView from "./VariableCostTypeView";
import VariableCostTypeSuccess from "./VariableCostTypeSuccess";

import {
  getVariableCostTypes,
  createVariableCostType,
  updateVariableCostType,
  deleteVariableCostType,
} from "../../api/variableCostTypes.api";

import {
  mapVariableCostTypesPageToUI,
} from "../../mappers/variableCostType.mapper";

export default function VariableCostTypesFeature({ authUser }) {
  const [mode, setMode] = useState("list");
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const loadPage = async (pageNumber = 0) => {
    const r = await getVariableCostTypes(pageNumber, 20);
    const mapped = mapVariableCostTypesPageToUI(r);

    setTypes(mapped.items);
    setTotalItems(mapped.totalItems);
    setPage(mapped.page);
  };

  useEffect(() => {
    loadPage(0);
  }, []);

  const handleAdd = () => {
    setSelectedType(null);
    setMode("create");
  };

  const handleView = (type) => {
    setSelectedType(type);
    setMode("view");
  };

  const handleEdit = (type) => {
    setSelectedType(type);
    setMode("edit");
  };

  const handleSave = async (data) => {
    try {
      if (data.id) {
        await updateVariableCostType(data.id, data);
      } else {
        await createVariableCostType(data);
      }

      await loadPage(0);
      setMode("list");
    } catch {
      return;
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que querés eliminar este tipo de costo variable? Esta acción no se puede deshacer."
    );
    if (!confirmed) return;

    try {
      await deleteVariableCostType(id);
      await loadPage(0);
      setMode("list");
    } catch {
      return;
    }
  };

  if (mode === "list") {
    return (
      <VariableCostTypesTable
        rows={types}
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
      <VariableCostTypeForm
        onCancel={() => setMode("list")}
        onSubmit={handleSave}
      />
    );
  }

  if (mode === "edit" && selectedType) {
    return (
      <VariableCostTypeForm
        initialData={selectedType}
        onCancel={() => setMode("view")}
        onSubmit={handleSave}
      />
    );
  }

  if (mode === "view" && selectedType) {
    return (
      <VariableCostTypeView
        type={selectedType}
        authUser={authUser}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onBack={() => setMode("list")}
      />
    );
  }

  if (mode === "success" && selectedType) {
    return (
      <VariableCostTypeSuccess
        type={selectedType}
        onBack={() => setMode("list")}
      />
    );
  }

  return null;
}