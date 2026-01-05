import { useEffect, useState } from "react";
import ClientsTable from "./ClientsTable";
import ClientForm from "./ClientForm";
import ClientView from "./ClientView";
import ClientSuccess from "./ClientSuccess";

import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
} from "../../api/clients.api";

export default function ClientsFeature({ authUser }) {
  const [mode, setMode] = useState("list");
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    getClients().then((r) => setClients(r.items));
  }, []);

  const handleSave = async (data) => {
    const saved = data.id
      ? await updateClient(data.id, data)
      : await createClient(data);

    setClients((prev) => {
      const exists = prev.find((c) => c.id === saved.id);
      return exists
        ? prev.map((c) => (c.id === saved.id ? saved : c))
        : [...prev, saved];
    });

    setSelectedClient(saved);
    setMode("success");
  };

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "¿Estás seguro de que querés eliminar este cliente? Esta acción no se puede deshacer."
    );
    if (!ok) return;

    await deleteClient(id);
    setClients((prev) => prev.filter((c) => c.id !== id));
    setMode("list");
  };

  if (mode === "list") {
    return (
      <ClientsTable
        rows={clients}
        onAdd={() => setMode("create")}
        onView={(c) => {
          setSelectedClient(c);
          setMode("view");
        }}
      />
    );
  }

  if (mode === "create") {
    return (
      <ClientForm
        onCancel={() => setMode("list")}
        onSubmit={handleSave}
      />
    );
  }

  if (mode === "edit" && selectedClient) {
    return (
      <ClientForm
        initialData={selectedClient}
        onCancel={() => setMode("view")}
        onSubmit={handleSave}
      />
    );
  }

  if (mode === "view" && selectedClient) {
    return (
      <ClientView
        client={selectedClient}
        authUser={authUser}
        onEdit={() => setMode("edit")}
        onDelete={() => handleDelete(selectedClient.id)}
        onBack={() => setMode("list")}
      />
    );
  }

  if (mode === "success" && selectedClient) {
    return (
      <ClientSuccess
        client={selectedClient}
        onBack={() => setMode("list")}
      />
    );
  }

  return null;
}
