import { useEffect, useState } from "react";

import CostTypesTable from "./CostTypesTable";
import CostTypeForm from "./CostTypeForm";
import CostTypeView from "./CostTypeView";
import CostTypeSuccess from "./CostTypeSuccess";

import {
  getCostTypes,
  createCostType,
  updateCostType,
  deleteCostType,
} from "../../api/costTypes.api";

import {
  mapCostTypeToUI,
  mapCostTypesPageToUI,
} from "../../mappers/costType.mapper";

export default function CostTypesFeature({ authUser }) {
  const [mode, setMode] = useState("list");
  const [costTypes, setCostTypes] = useState([]);
  const [selectedCostType, setSelectedCostType] = useState(null);

  useEffect(() => {
    getCostTypes().then((r) => {
      const mapped = mapCostTypesPageToUI(r);
      setCostTypes(mapped.items);
    });
  }, []);

  const handleAdd = () => {
    setSelectedCostType(null);
    setMode("create");
  };

  const handleView = (costType) => {
    setSelectedCostType(costType);
    setMode("view");
  };

  const handleEdit = (costType) => {
    setSelectedCostType(costType);
    setMode("edit");
  };

  const handleSave = async (data) => {
    let response;

    if (data.id) {
      response = await updateCostType(data.id, data);
    } else {
      response = await createCostType(data);
    }

    // 🔒 Fuente única de verdad: mapper
    const mappedSaved = mapCostTypeToUI(response);

    setCostTypes((prev) => {
      const exists = prev.find((c) => c.id === mappedSaved.id);
      return exists
        ? prev.map((c) => (c.id === mappedSaved.id ? mappedSaved : c))
        : [...prev, mappedSaved];
    });

    setSelectedCostType(mappedSaved);
    setMode("success");
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que querés eliminar este tipo de costo fijo? Esta acción no se puede deshacer."
    );
    if (!confirmed) return;

    try {
      await deleteCostType(id);
      setCostTypes((prev) => prev.filter((c) => c.id !== id));
      setSelectedCostType(null);
      setMode("list");
    } catch (error) {
      const status = error?.response?.status;
      if (status === 409) {
        alert(
          "No se puede eliminar el tipo de costo porque está siendo utilizado."
        );
        return;
      }
      alert("Ocurrió un error al eliminar el tipo de costo.");
    }
  };

  if (mode === "list") {
    return (
      <CostTypesTable
        rows={costTypes}
        onAdd={handleAdd}
        onView={handleView}
      />
    );
  }

  if (mode === "create") {
    return (
      <CostTypeForm
        onCancel={() => setMode("list")}
        onSubmit={handleSave}
      />
    );
  }

  if (mode === "edit" && selectedCostType) {
    return (
      <CostTypeForm
        initialData={selectedCostType}
        onCancel={() => setMode("view")}
        onSubmit={handleSave}
      />
    );
  }

  if (mode === "view" && selectedCostType) {
    return (
      <CostTypeView
        costType={selectedCostType}
        authUser={authUser}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onBack={() => setMode("list")}
      />
    );
  }

  if (mode === "success") {
    if (!selectedCostType) return null;

    return (
      <CostTypeSuccess
        costType={selectedCostType}
        onBack={() => setMode("list")}
      />
    );
  }

  return null;
}
