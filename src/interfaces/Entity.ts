export interface Account {
  _id: string;
  username: string;
  email: string;
  thirdParty: ThirdParty[];
  role: "admin" | "manager" | "member";
  permission: string[];
}

export interface ActivityHistory {
  _id: string;
  id: string;
  action: "pr" | "commit";
  content: string;
  createdBy: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Artifact {
  _id: string;
  name: string;
  type: "image" | "log" | "source code" | "executable" | "library";
  url: string;
  version?: string;
  threatList: Threat[];
  vulnerabilityList: Vulnerability[];
  cpe?: string;
}

export interface ArtifactCreate {
  name: string;
  type: "image" | "log" | "source code" | "executable" | "library";
  url: string;
  version?: string;
  threatList: string[];
  cpe?: string;
}

export interface ArtifactUpdate {
  name: string;
  url: string;
  version?: string;
  threatList: string[];
  cpe?: string;
}
interface IndividualContribution {
  author: string;
  total: number;
}
export interface Commits {
  total: number;
  contribution: IndividualContribution[];
}
export interface PullRequests {
  total: number;
  contribution: IndividualContribution[];
}
export interface Phase {
  _id: string;
  name: string;
  tasks: Task[];
  artifacts: Artifact[];
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface PhaseTemplate {
  _id: string;
  name: string;
  description: string;
  phases: {
    name: string;
    description: string;
    order: number;
  }[];
  isPrivate: boolean;
  createdBy: string;
}
export interface PhaseTemplateCreate
  extends Omit<PhaseTemplate, "_id" | "createdBy"> {}
export interface Project {
  _id: string;
  name: string;
  url: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  phaseList: Phase[];
}
export interface Task {
  _id: string;
  name: string;
  description: string;
  status: "active" | "completed";
  dueDate: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface TaskCreate
  extends Omit<Task, "_id" | "createdBy" | "updatedBy" | "dueDate"> {
  dueDate: Date;
}
export interface TaskUpdate extends Partial<TaskCreate> {}
export interface ThirdParty {
  name: string;
  username: string;
  url: string;
  accessToken: string;
}
export interface Threat {
  _id: string;
  name: string;
  description: string;
  type:
    | "Spoofing"
    | "Tampering"
    | "Repudiation"
    | "Information Disclosure"
    | "Denial of Service"
    | "Elevation of Privilege";
  score: {
    total: number;
    details: {
      damage: number;
      reproducibility: number;
      exploitability: number;
      affectedUsers: number;
      discoverability: number;
    };
  };
  status: "Non mitigated" | "Partially mitigated" | "Fully mitigated";
  mitigation: string[];
}
export interface ThreatCreate extends Omit<Threat, "_id" | "status"> {}
export interface Ticket {
  _id: string;
  status: "open" | "closed";
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  assignee: User;
  assigner: User;
  targetedVulnerability: Vulnerability[];
  projectName: string;
  createdAt: string;
  updatedAt: string;
}
export interface TicketCreate {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  assignee: string;
  assigner: string;
  targetedVulnerability: Vulnerability[];
  projectName: string;
}
export interface User {
  _id: string;
  name: string;
  taskAssigned: Task[];
  ticketAssigned: Ticket[];
  activityHistory: ActivityHistory[];
  account: Account;
  projectIn: Project[];
}
export interface Vulnerability {
  cveId: string;
  description: string;
  score?: number;
  severity: string;
  cwes: string[];
  _id: string;
}
export interface AccountUpdate {
  email: string;
  role: "manager" | "member";
}
export interface AccountRegister {
  username: string;
  email: string;
  confirmPassword: string;
  password: string;
}
export interface CWE {
  _id: string;
  cweId: string;
  name: string;
  description: string;
  modesOfIntroduction: string[];
  likelihood: string;
  mitigation: string[];
  consequences: string[];
  detectionMethods: string[];
  __v: number;
}
export interface GithubRepoImport {
  name: string;
  url: string;
  status: "private" | "public";
  owner: string;
}
export interface Workflow {
  name: string;
  content: string;
}
