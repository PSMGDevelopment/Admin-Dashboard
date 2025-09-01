import { apiClient } from "./apiClient";

export async function fetchCampaigns({ page = 1, pageSize = 10, sort = "id", order = "asc" }) {
  const _start = (page - 1) * pageSize;
  const _end = page * pageSize;

  const res = await apiClient.get("/campaigns", {
    params: {
      _start,
      _end,
      _sort: sort,
      _order: order,
    },
  });

  return res.data;
}

