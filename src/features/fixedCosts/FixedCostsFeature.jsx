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

import { mapFixedCostsPageToUI } from "../../mappers/fixedCost.mapper";

import { getCostTypes } from "../../api/costTypes.api";
import { getEmployees } from "../../api/employees.api";

export default function FixedCostsFeature({ authUser }) {
  const [mode, setMode] = useState("list");
  const [fixedCosts, setFixedCosts] = useState([]);
  const [selectedFixedCost, setSelectedFixedCost] = useState(null);

  const [costTypes, setCostTypes] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const loadPage = async (pageNumber = 0) => {
    const r = await getFixedCosts(pageNumber, 20);
    const mapped = mapFixedCostsPageToUI(r);

    setFixedCosts(mapped.items);
    setTotalItems(mapped.totalItems);
    setPage(mapped.page);
  };

  useEffect(() => {
    loadPage(0);

    // catálogos (no paginados para selects)
    getCostTypes(0, 1000).then((r) => setCostTypes(r.items));
    getEmployees(0, 1000).then((r) => setEmployees(r.items));
  }, []);

  const handleSave = async (data) => {
    try {
      if (data.id) {
        await updateFixedCost(data.id, data);
      } else {
        await createFixedCost(data);
      }

      await loadPage(0);
      setMode("list");
    } catch {
      return;
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "¿Estás seguro de que querés eliminar este costo fijo? Esta acción no se puede deshacer."
    );
    if (!ok) return;

    try {
      await deleteFixedCost(id);
      await loadPage(0);
      setMode("list");
    } catch {
      return;
    }
  };

  if (mode === "list") {
    return (
      <FixedCostsTable
        rows={fixedCosts}
        page={page}
        totalItems={totalItems}
        onPageChange={loadPage}
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