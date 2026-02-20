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

import { mapClientsPageToUI } from "../../mappers/client.mapper";

export default function ClientsFeature({ authUser }) {
  const [mode, setMode] = useState("list");
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const loadPage = async (pageNumber = 0) => {
    const r = await getClients(pageNumber, 20);
    const mapped = mapClientsPageToUI(r);

    setClients(mapped.items);
    setTotalItems(mapped.totalItems);
    setPage(mapped.page);
  };

  useEffect(() => {
    loadPage(0);
  }, []);

  const handleSave = async (data) => {
    try {
      if (data.id) {
        await updateClient(data.id, data);
      } else {
        await createClient(data);
      }

      await loadPage(0);
      setMode("list");
    } catch {
      return;
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "¿Estás seguro de que querés eliminar este cliente? Esta acción no se puede deshacer."
    );
    if (!ok) return;

    try {
      await deleteClient(id);
      await loadPage(0);
      setMode("list");
    } catch {
      return;
    }
  };

  if (mode === "list") {
    return (
      <ClientsTable
        rows={clients}
        page={page}
        totalItems={totalItems}
        onPageChange={loadPage}
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