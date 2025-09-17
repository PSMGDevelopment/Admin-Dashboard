import { apiClient } from "./apiClient";

export async function fetchOperatorByTenantID(tenantId: string) {

  const res = await apiClient.get(`/operators/tenant/${encodeURIComponent(tenantId)}`);

  return res.data;
}

