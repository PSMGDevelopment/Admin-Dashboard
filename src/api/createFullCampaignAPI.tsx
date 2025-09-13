import { apiClient } from "./apiClient";
import {FullCampaign} from "./types/FullCampaign";

export async function createFullCampaignAPI(fullCampaign: FullCampaign) {

  const res = await apiClient.post("/campaigns/full",
      fullCampaign
  );
  return res.data;
}

