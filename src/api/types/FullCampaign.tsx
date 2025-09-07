import {CampaignType} from "./CampaignType";
import {OrganizationType} from "./OrganizationType";
import {TeamType} from "./TeamType";

export type FullCampaign = {
  Campaign: CampaignType;
  Organization: OrganizationType
  Teams: [TeamType]
};
