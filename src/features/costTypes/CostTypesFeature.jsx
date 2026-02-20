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
  mapCostTypesPageToUI,
} from "../../mappers/costType.mapper";

export default function CostTypesFeature({ authUser }) {
  const [mode, setMode] = useState("list");
  const [costTypes, setCostTypes] = useState([]);
  const [selectedCostType, setSelectedCostType] = useState(null);

  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const loadPage = async (pageNumber = 0) => {
    const r = await getCostTypes(pageNumber, 20);
    const mapped = mapCostTypesPageToUI(r);

    setCostTypes(mapped.items);
    setTotalItems(mapped.totalItems);
    setPage(mapped.page);
  };

  useEffect(() => {
    loadPage(0);
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
    try {
      if (data.id) {
        await updateCostType(data.id, data);
      } else {
        await createCostType(data);
      }

      await loadPage(0);
      setMode("list");
    } catch {
      return;
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que querés eliminar este tipo de costo fijo? Esta acción no se puede deshacer."
    );
    if (!confirmed) return;

    try {
      await deleteCostType(id);
      await loadPage(0);
      setMode("list");
    } catch {
      return;
    }
  };

  if (mode === "list") {
    return (
      <CostTypesTable
        rows={costTypes}
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