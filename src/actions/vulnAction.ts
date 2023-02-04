import api from "~/api";
import { PromiseServer } from "~/interfaces/ServerResponse";
import {
  IVulnerability,
  IVulnerabilityCreate,
} from "~/interfaces/Vulnerability";

export async function getCVE(cveId: string): PromiseServer<IVulnerability> {
  const response = await api.get(`/vuln/search/${cveId}`);
  return response.data;
}
export async function createCVE(vuln: string): PromiseServer<IVulnerability> {
  const response = await api.post(`/vuln`, {
    type: "single",
    data: vuln,
  });
  return response.data;
}
export async function createCVEs(
  vulns: string
): PromiseServer<IVulnerability[]> {
  const response = await api.post(`/vuln`, {
    type: "multiple",
    data: vulns,
  });
  return response.data;
}

export async function getVulnerabilities(): PromiseServer<IVulnerability[]> {
  const response = await api.get(`/vuln`);
  return response.data;
}
