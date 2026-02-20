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

  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const loadPage = async (pageNumber = 0) => {
    const r = await getProjects(pageNumber, 20);

    setProjects(r.items);
    setTotalItems(r.totalItems);
    setPage(r.page);
  };

  useEffect(() => {
    loadPage(0);
  }, []);

  const handleSave = async (data) => {
    try {
      if (data.id) {
        await updateProject(data.id, data);
      } else {
        await createProject(data);
      }

      await loadPage(0);
      setMode("list");
    } catch {
      return;
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "¿Estás seguro de que querés eliminar este proyecto? Esta acción no se puede deshacer."
    );
    if (!ok) return;

    try {
      await deleteProject(id);
      await loadPage(0);
      setMode("list");
    } catch {
      return;
    }
  };

  if (mode === "list") {
    return (
      <ProjectsTable
        rows={projects}
        page={page}
        totalItems={totalItems}
        onPageChange={loadPage}
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