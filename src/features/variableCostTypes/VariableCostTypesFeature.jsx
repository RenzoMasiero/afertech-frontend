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
  mapVariableCostTypeToUI,
} from "../../mappers/variableCostType.mapper";

export default function VariableCostTypesFeature({ authUser }) {
  const [mode, setMode] = useState("list");
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    getVariableCostTypes().then((r) => {
      const mapped = mapVariableCostTypesPageToUI(r);
      setTypes(mapped.items);
    });
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
      let response;

      if (data.id) {
        response = await updateVariableCostType(data.id, data);
      } else {
        response = await createVariableCostType(data);
      }

      // 🔒 Fuente única de verdad: mapper SIEMPRE
      const mappedSaved = mapVariableCostTypeToUI(response);

      setTypes((prev) => {
        const exists = prev.find((t) => t.id === mappedSaved.id);
        return exists
          ? prev.map((t) => (t.id === mappedSaved.id ? mappedSaved : t))
          : [...prev, mappedSaved];
      });

      // 🔒 Orden explícito: primero data, después modo
      setSelectedType(mappedSaved);
      setMode("success");
    } catch {
      // 🔒 Error ya canalizado globalmente (popup)
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
      setTypes((prev) => prev.filter((t) => t.id !== id));
      setSelectedType(null);
      setMode("list");
    } catch {
      // 🔒 Error ya canalizado globalmente (popup)
      return;
    }
  };

  if (mode === "list") {
    return (
      <VariableCostTypesTable
        rows={types}
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

  if (mode === "success") {
    // 🔒 NUNCA renderizar Success sin entidad válida
    if (!selectedType) return null;

    return (
      <VariableCostTypeSuccess
        type={selectedType}
        onBack={() => setMode("list")}
      />
    );
  }

  return null;
}
