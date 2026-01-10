/**
 * Convierte un proveedor del backend
 * al modelo de UI (reflejo exacto del response)
 */
export function mapSupplierToUI(supplier) {
  return {
    id: supplier.id,
    name: supplier.name,
    taxId: supplier.taxId,
    loadedAt: supplier.loadedAt,
    loadedBy: supplier.loadedBy,
  };
}

/**
 * Convierte la respuesta paginada del backend
 * en un modelo usable por el frontend
 */
export function mapSuppliersPageToUI(page) {
  const items = Array.isArray(page?.items)
    ? page.items.map(mapSupplierToUI)
    : [];

  return {
    items,
    page: page?.page ?? 0,
    size: page?.size ?? items.length,
    totalItems: page?.totalItems ?? items.length,
    totalPages: page?.totalPages ?? 1,
  };
}
