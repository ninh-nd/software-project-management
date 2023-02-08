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
  projectName: string;
  createdAt: string;
  updatedAt: string;
}
export type ITicketCreate = Omit<ITicket, "_id" | "createdAt" | "updatedAt">;
