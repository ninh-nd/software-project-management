import api from "~/api";
import { PromiseServer } from "../response-type";

export async function getSampleCode(): PromiseServer<Sample> {
  const response = await api.get("/scanner/sample");
  return response.data;
}

export async function createNewScanner(
  data: CreateNewScanner
): PromiseServer<string> {
  const response = await api.post("/scanner", {
    data,
  });
  return response.data;
}

export async function getAllScanners(): PromiseServer<Scanner[]> {
  const response = await api.get("/scanner");
  return response.data;
}
