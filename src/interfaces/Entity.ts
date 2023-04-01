export interface IAccount {
  _id: string;
  username: string;
  email: string;
  thirdParty: IThirdParty[];
}

export interface IActivity {
  _id: string;
  action: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface IArtifact {
  _id: string;
  name: string;
  content: string;
  type: "image" | "log" | "source code" | "executable" | "library";
  url: string;
  version: string;
  threatList: IThreat[];
  vulnerabilityList: IVulnerability[];
}

export interface IArtifactCreate {
  name: string;
  content: string;
  type: "image" | "log" | "source code" | "executable" | "library";
  url: string;
  version: string;
  threatList: string[];
  vulnerabilityList: string[];
}
interface IIndividualContribution {
  author: string;
  total: number;
}
export interface ICommits {
  total: number;
  contribution: IIndividualContribution[];
}
export interface IPullRequests {
  total: number;
  contribution: IIndividualContribution[];
}
export interface IPhase {
  _id: string;
  name: string;
  tasks: ITask[];
  artifacts: IArtifact[];
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface IPhasePreset {
  name: string;
  description: string;
  phases: [
    {
      name: string;
      description: string;
      order: number;
    }
  ];
}
export interface IPhaseCreate {
  name: string;
  description: string;
  order: number;
}
export interface IProject {
  _id: string;
  name: string;
  url: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  phaseList: IPhase[];
}
export interface ITask {
  _id: string;
  name: string;
  description: string;
  status?: string;
  createdBy?: string;
  updatedBy?: string;
  isNew?: boolean;
  projectName: string;
}

export type ITaskUpdate = Omit<ITask, "_id">;
export interface IThirdParty {
  name: string;
  username: string;
  url: string;
  accessToken: string;
}
export interface IThreat {
  _id: string;
  name: string;
  description: string;
}
export type IThreatCreate = Omit<IThreat, "_id">;
export interface ITicket {
  _id: string;
  status: "open" | "closed";
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  assignee: IUser[];
  assigner: IUser;
  targetedVulnerability: IVulnerability[];
  projectName: string;
  createdAt: string;
  updatedAt: string;
}
export type ITicketCreate = Omit<ITicket, "_id" | "createdAt" | "updatedAt">;
export interface ITicketCreateSent {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  assignee: string[];
  assigner: string;
  targetedVulnerability: string[];
  projectName: string;
}
export interface IUser {
  _id: string;
  name: string;
  taskAssigned: ITask[];
  activityHistory: IActivity[];
  account: IAccount;
}
export interface IVulnerability {
  _id: string;
  cveId: string;
  description: string;
  score: number;
  severity: "High" | "Medium" | "Low";
  cwes: string[];
  product: string;
  version: string[];
  vendor: string;
}
export type IVulnerabilityCreate = Omit<IVulnerability, "_id" | "severity">;
