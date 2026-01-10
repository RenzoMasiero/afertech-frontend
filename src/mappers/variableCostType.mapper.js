/**
 * Convierte un tipo de costo variable del backend
 * al modelo de UI (reflejo exacto del response)
 */
export function mapVariableCostTypeToUI(type) {
  return {
    id: type.id,
    name: type.name,
    loadedAt: type.loadedAt,
    loadedBy: type.loadedBy,
  };
}

/**
 * Convierte la respuesta paginada del backend
 * en un modelo usable por el frontend
 */
export function mapVariableCostTypesPageToUI(page) {
  const items = Array.isArray(page?.items)
    ? page.items.map(mapVariableCostTypeToUI)
    : [];

  return {
    items,
    page: page?.page ?? 0,
    size: page?.size ?? items.length,
    totalItems: page?.totalItems ?? items.length,
    totalPages: page?.totalPages ?? 1,
  };
}
