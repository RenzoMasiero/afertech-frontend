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

export default function EmployeesFeature({ authUser }) {
  const [mode, setMode] = useState("list");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    getEmployees().then((r) => setEmployees(r.items));
  }, []);

  const handleSave = async (data) => {
    const saved = data.id
      ? await updateEmployee(data.id, data)
      : await createEmployee(data);

    setEmployees((prev) => {
      const exists = prev.find((e) => e.id === saved.id);
      return exists
        ? prev.map((e) => (e.id === saved.id ? saved : e))
        : [...prev, saved];
    });

    setSelectedEmployee(saved);
    setMode("success");
  };

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "¿Estás seguro de que querés eliminar este empleado? Esta acción no se puede deshacer."
    );
    if (!ok) return;

    try {
      await deleteEmployee(id);
      setEmployees((prev) => prev.filter((e) => e.id !== id));
      setMode("list");
    } catch (error) {
      const status = error?.response?.status;

      if (status === 409) {
        alert(
          "No se puede eliminar el empleado porque está siendo utilizado en costos."
        );
        return;
      }

      alert("Ocurrió un error al eliminar el empleado.");
    }
  };

  if (mode === "list") {
    return (
      <EmployeesTable
        rows={employees}
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
