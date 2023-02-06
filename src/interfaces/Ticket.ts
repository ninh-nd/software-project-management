import { IMember } from "./Member";
import { IVulnerability } from "./Vulnerability";

export interface ITicket {
  _id: string;
  status: "open" | "closed";
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  assignee: IMember[];
  assigner: IMember;
  targetedVulnerability: IVulnerability[];
}
export type ITicketCreate = Omit<ITicket, "_id">;
