export interface IArtifact {
  _id: string;
  name: string;
  content: string;
  type: "image" | "log" | "source code" | "executable" | "library";
  url: string;
  version: string;
  threatList: string[]; // List of threat name
  vulnerabilityList: string[]; // List of CVE-IDs
}
