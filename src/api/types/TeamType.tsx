import {CoachType} from "./CoachType";

export type TeamType = {
  id: string;
  organization: string;
  campaignID: string;
  campaign: string;
  coach: CoachType;
  name: string;
  tenant: string
  status: string;
  expectedPlayerCount: number;
};
