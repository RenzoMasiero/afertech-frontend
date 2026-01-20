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
  mapVariableCostToUI,
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

  useEffect(() => {
    getVariableCosts().then((r) => {
      const mapped = mapVariableCostsPageToUI(r);
      setVariableCosts(mapped.items);
    });

    getVariableCostTypes().then((r) => setCostTypes(r.items));
    getSuppliers().then((r) => setSuppliers(r.items));
    getProjects().then((r) => setProjects(r.items));
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
      let response;

      if (data.id) {
        response = await updateVariableCost(data.id, data);
      } else {
        response = await createVariableCost(data);
      }

      // 🔒 Fuente única de verdad: mapper SIEMPRE
      const mappedSaved = mapVariableCostToUI(response);

      setVariableCosts((prev) => {
        const exists = prev.find((c) => c.id === mappedSaved.id);
        return exists
          ? prev.map((c) => (c.id === mappedSaved.id ? mappedSaved : c))
          : [...prev, mappedSaved];
      });

      // 🔒 Orden explícito: primero data, después modo
      setSelectedCost(mappedSaved);
      setMode("success");
    } catch {
      // 🔒 Error ya canalizado globalmente (popup)
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
      setVariableCosts((prev) => prev.filter((c) => c.id !== id));
      setSelectedCost(null);
      setMode("list");
    } catch {
      // 🔒 Error ya canalizado globalmente (popup)
      return;
    }
  };

  if (mode === "list") {
    return (
      <VariableCostsTable
        rows={variableCosts}
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

  if (mode === "success") {
    // 🔒 NUNCA renderizar Success sin entidad válida
    if (!selectedCost) return null;

    return (
      <VariableCostSuccess
        cost={selectedCost}
        onBack={() => setMode("list")}
      />
    );
  }

  return null;
}
