import { useEffect, useState } from "react";
import FixedCostsTable from "./FixedCostsTable";
import FixedCostForm from "./FixedCostForm";
import FixedCostView from "./FixedCostView";
import FixedCostSuccess from "./FixedCostSuccess";

import {
  getFixedCosts,
  createFixedCost,
  updateFixedCost,
  deleteFixedCost,
} from "../../api/fixedCosts.api";
import { getCostTypes } from "../../api/costTypes.api";
import { getEmployees } from "../../api/employees.api";

export default function FixedCostsFeature({ authUser }) {
  const [mode, setMode] = useState("list");
  const [fixedCosts, setFixedCosts] = useState([]);
  const [selectedFixedCost, setSelectedFixedCost] = useState(null);

  const [costTypes, setCostTypes] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getFixedCosts().then((r) => setFixedCosts(r.items));
    getCostTypes().then((r) => setCostTypes(r.items));
    getEmployees().then((r) => setEmployees(r.items));
  }, []);

  const handleSave = async (data) => {
    const saved = data.id
      ? await updateFixedCost(data.id, data)
      : await createFixedCost(data);

    setFixedCosts((prev) => {
      const exists = prev.find((c) => c.id === saved.id);
      return exists
        ? prev.map((c) => (c.id === saved.id ? saved : c))
        : [...prev, saved];
    });

    setSelectedFixedCost(saved);
    setMode("success");
  };

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "¿Estás seguro de que querés eliminar este costo fijo? Esta acción no se puede deshacer."
    );
    if (!ok) return;

    try {
      await deleteFixedCost(id);
      setFixedCosts((prev) => prev.filter((c) => c.id !== id));
      setMode("list");
    } catch (error) {
      const status = error?.response?.status;

      if (status === 409) {
        alert(
          "No se puede eliminar el costo fijo porque está siendo utilizado."
        );
        return;
      }

      alert("Ocurrió un error al eliminar el costo fijo.");
    }
  };

  if (mode === "list") {
    return (
      <FixedCostsTable
        rows={fixedCosts}
        onAdd={() => setMode("create")}
        onView={(c) => {
          setSelectedFixedCost(c);
          setMode("view");
        }}
      />
    );
  }

  if (mode === "create") {
    return (
      <FixedCostForm
        costTypes={costTypes}
        employees={employees}
        onCancel={() => setMode("list")}
        onSubmit={handleSave}
      />
    );
  }

  if (mode === "edit" && selectedFixedCost) {
    return (
      <FixedCostForm
        costTypes={costTypes}
        employees={employees}
        initialData={selectedFixedCost}
        onCancel={() => setMode("view")}
        onSubmit={handleSave}
      />
    );
  }

  if (mode === "view" && selectedFixedCost) {
    return (
      <FixedCostView
        fixedCost={selectedFixedCost}
        authUser={authUser}
        onEdit={() => setMode("edit")}
        onDelete={() => handleDelete(selectedFixedCost.id)}
        onBack={() => setMode("list")}
      />
    );
  }

  if (mode === "success" && selectedFixedCost) {
    return (
      <FixedCostSuccess
        fixedCost={selectedFixedCost}
        onBack={() => setMode("list")}
      />
    );
  }

  return null;
}
