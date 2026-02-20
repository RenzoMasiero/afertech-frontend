import { useEffect, useState } from "react";
import EmployeesTable from "./EmployeesTable";
import EmployeesForm from "./EmployeesForm";
import EmployeesView from "./EmployeesView";
import EmployeesSuccess from "./EmployeesSuccess";

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../api/employees.api";

import { mapEmployeesPageToUI } from "../../mappers/employee.mapper";

export default function EmployeesFeature({ authUser }) {
  const [mode, setMode] = useState("list");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const loadPage = async (pageNumber = 0) => {
    const r = await getEmployees(pageNumber, 20);
    const mapped = mapEmployeesPageToUI(r);

    setEmployees(mapped.items);
    setTotalItems(mapped.totalItems);
    setPage(mapped.page);
  };

  useEffect(() => {
    loadPage(0);
  }, []);

  const handleSave = async (data) => {
    try {
      if (data.id) {
        await updateEmployee(data.id, data);
      } else {
        await createEmployee(data);
      }

      await loadPage(0);
      setMode("list");
    } catch {
      return;
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "¿Estás seguro de que querés eliminar este empleado? Esta acción no se puede deshacer."
    );
    if (!ok) return;

    try {
      await deleteEmployee(id);
      await loadPage(0);
      setMode("list");
    } catch {
      return;
    }
  };

  if (mode === "list") {
    return (
      <EmployeesTable
        rows={employees}
        page={page}
        totalItems={totalItems}
        onPageChange={loadPage}
        onAdd={() => setMode("create")}
        onView={(e) => {
          setSelectedEmployee(e);
          setMode("view");
        }}
      />
    );
  }

  if (mode === "create") {
    return (
      <EmployeesForm
        onCancel={() => setMode("list")}
        onSubmit={handleSave}
      />
    );
  }

  if (mode === "edit" && selectedEmployee) {
    return (
      <EmployeesForm
        initialData={selectedEmployee}
        onCancel={() => setMode("view")}
        onSubmit={handleSave}
      />
    );
  }

  if (mode === "view" && selectedEmployee) {
    return (
      <EmployeesView
        employee={selectedEmployee}
        authUser={authUser}
        onEdit={() => setMode("edit")}
        onDelete={() => handleDelete(selectedEmployee.id)}
        onBack={() => setMode("list")}
      />
    );
  }

  if (mode === "success" && selectedEmployee) {
    return (
      <EmployeesSuccess
        employee={selectedEmployee}
        onBack={() => setMode("list")}
      />
    );
  }

  return null;
}