// src/mappers/client.mapper.js

/**
 * Convierte un client del backend al modelo de UI
 * ⚠️ El modelo UI refleja EXACTAMENTE el response del backend
 */
function mapClientToUI(client) {
  return {
    id: client.id,

    name: client.name,
    taxId: client.taxId,
    active: client.active,

    loadedAt: client.loadedAt,
    loadedBy: client.loadedBy,
  };
}

/**
 * Convierte la respuesta paginada del backend
 * en un modelo usable por el frontend
 */
export function mapClientsPageToUI(page) {
  const items = Array.isArray(page?.items)
    ? page.items.map(mapClientToUI)
    : [];

  return {
    items,
    page: page?.page ?? 0,
    size: page?.size ?? items.length,
    totalItems: page?.totalItems ?? items.length,
    totalPages: page?.totalPages ?? 1,
  };
}
