import resourcesAPI from "~/api";
import { PromiseServer } from "~/interfaces/ServerResponse";
import { IVulnerability } from "~/interfaces/Vulnerability";

export async function getCVE(cveId: string): PromiseServer<IVulnerability> {
  const response = await resourcesAPI.get(`/vuln/search/${cveId}`);
  return response.data;
}
export async function createCVE(vuln: IVulnerability) {
  const response = await resourcesAPI.post(`/vuln`, {
    type: "single",
    data: vuln,
  });
  return response.data;
}
export async function createCVEs(vulns: IVulnerability[]) {
  const response = await resourcesAPI.post(`/vuln`, {
    type: "multiple",
    data: vulns,
  });
  return response.data;
}

export async function getVulnerabilities(): PromiseServer<IVulnerability[]> {
  const response = await resourcesAPI.get(`/vuln`);
  return response.data;
}
