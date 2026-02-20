import { useEffect, useState } from "react";
import VariableCostsTable from "./VariableCostsTable";
import VariableCostForm from "./VariableCostForm";
import VariableCostView from "./VariableCostView";
import VariableCostSuccess from "./VariableCostSuccess";

import {
  getVariableCosts,
  createVariableCost,
  updateVariableCost,
  deleteVariableCost,
} from "../../api/variableCosts.api";

import {
  mapVariableCostsPageToUI,
} from "../../mappers/variableCost.mapper";

import { getVariableCostTypes } from "../../api/variableCostTypes.api";
import { getSuppliers } from "../../api/suppliers.api";
import { getProjects } from "../../api/projects.api";

export default function VariableCostsFeature({ authUser }) {
  const [mode, setMode] = useState("list");
  const [variableCosts, setVariableCosts] = useState([]);
  const [selectedCost, setSelectedCost] = useState(null);

  const [costTypes, setCostTypes] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [projects, setProjects] = useState([]);

  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const loadPage = async (pageNumber = 0) => {
    const r = await getVariableCosts(pageNumber, 20);
    const mapped = mapVariableCostsPageToUI(r);

    setVariableCosts(mapped.items);
    setTotalItems(mapped.totalItems);
    setPage(mapped.page);
  };

  useEffect(() => {
    loadPage(0);

    // catálogos (no paginados para selects)
    getVariableCostTypes(0, 1000).then((r) => setCostTypes(r.items));
    getSuppliers(0, 1000).then((r) => setSuppliers(r.items));
    getProjects(0, 1000).then((r) => setProjects(r.items));
  }, []);

  const handleAdd = () => {
    setSelectedCost(null);
    setMode("create");
  };

  const handleView = (cost) => {
    setSelectedCost(cost);
    setMode("view");
  };

  const handleEdit = (cost) => {
    setSelectedCost(cost);
    setMode("edit");
  };

  const handleSave = async (data) => {
    try {
      if (data.id) {
        await updateVariableCost(data.id, data);
      } else {
        await createVariableCost(data);
      }

      await loadPage(0);
      setMode("list");
    } catch {
      return;
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que querés eliminar este costo variable? Esta acción no se puede deshacer."
    );
    if (!confirmed) return;

    try {
      await deleteVariableCost(id);
      await loadPage(0);
      setMode("list");
    } catch {
      return;
    }
  };

  if (mode === "list") {
    return (
      <VariableCostsTable
        rows={variableCosts}
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
      <VariableCostForm
        costTypes={costTypes}
        suppliers={suppliers}
        projects={projects}
        onCancel={() => setMode("list")}
        onSubmit={handleSave}
      />
    );
  }

  if (mode === "edit" && selectedCost) {
    return (
      <VariableCostForm
        costTypes={costTypes}
        suppliers={suppliers}
        projects={projects}
        initialData={selectedCost}
        onCancel={() => setMode("view")}
        onSubmit={handleSave}
      />
    );
  }

  if (mode === "view" && selectedCost) {
    return (
      <VariableCostView
        cost={selectedCost}
        authUser={authUser}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onBack={() => setMode("list")}
      />
    );
  }

  if (mode === "success" && selectedCost) {
    return (
      <VariableCostSuccess
        cost={selectedCost}
        onBack={() => setMode("list")}
      />
    );
  }

  return null;
}