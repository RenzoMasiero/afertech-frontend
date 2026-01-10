import { useEffect, useState } from "react";
import ProjectsTable from "./ProjectsTable";
import ProjectForm from "./ProjectForm";
import ProjectView from "./ProjectView";
import ProjectSuccess from "./ProjectSuccess";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../api/projects.api";

export default function ProjectsFeature({ authUser }) {
  const [mode, setMode] = useState("list");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    getProjects().then((r) => {
      setProjects(r.items);
    });
  }, []);

  const handleSave = async (data) => {
    const saved = data.id
      ? await updateProject(data.id, data)
      : await createProject(data);

    setProjects((prev) => {
      const exists = prev.find((p) => p.id === saved.id);
      return exists
        ? prev.map((p) => (p.id === saved.id ? saved : p))
        : [...prev, saved];
    });

    setSelectedProject(saved);
    setMode("success");
  };

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "¿Estás seguro de que querés eliminar este proyecto? Esta acción no se puede deshacer."
    );
    if (!ok) return;

    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setMode("list");
    } catch (error) {
      const status = error?.response?.status;

      if (status === 409) {
        alert(
          "No se puede eliminar el proyecto porque tiene entidades asociadas."
        );
        return;
      }

      alert("Ocurrió un error al eliminar el proyecto.");
    }
  };

  if (mode === "list") {
    return (
      <ProjectsTable
        rows={projects}
        onAdd={() => setMode("create")}
        onView={(p) => {
          setSelectedProject(p);
          setMode("view");
        }}
      />
    );
  }

  if (mode === "create") {
    return (
      <ProjectForm
        onCancel={() => setMode("list")}
        onSubmit={handleSave}
      />
    );
  }

  if (mode === "edit" && selectedProject) {
    return (
      <ProjectForm
        initialData={selectedProject}
        onCancel={() => setMode("view")}
        onSubmit={handleSave}
      />
    );
  }

  if (mode === "view" && selectedProject) {
    return (
      <ProjectView
        project={selectedProject}
        authUser={authUser}
        onEdit={() => setMode("edit")}
        onDelete={() => handleDelete(selectedProject.id)}
        onBack={() => setMode("list")}
      />
    );
  }

  if (mode === "success" && selectedProject) {
    return (
      <ProjectSuccess
        project={selectedProject}
        onBack={() => setMode("list")}
      />
    );
  }

  return null;
}
