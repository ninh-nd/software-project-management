import { IThreat } from "./Threat";
import { IVulnerability } from "./Vulnerability";

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
