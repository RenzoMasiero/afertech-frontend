/**
 * Convierte un CostType del backend
 * al modelo de UI (reflejo exacto del response)
 */
export function mapCostTypeToUI(costType) {
  return {
    id: costType.id,
    name: costType.name,
    loadedAt: costType.loadedAt,
    loadedBy: costType.loadedBy,
  };
}

/**
 * Convierte la respuesta paginada del backend
 * en un modelo usable por el frontend
 */
export function mapCostTypesPageToUI(page) {
  const items = Array.isArray(page?.items)
    ? page.items.map(mapCostTypeToUI)
    : [];

  return {
    items,
    page: page?.page ?? 0,
    size: page?.size ?? items.length,
    totalItems: page?.totalItems ?? items.length,
    totalPages: page?.totalPages ?? 1,
  };
}
