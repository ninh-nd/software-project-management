import { useQuery } from "@tanstack/react-query";
import { getVulnProgress } from "./axios";

export function useVulnProgress(projectName: string) {
  return useQuery(["progress", projectName], () =>
    getVulnProgress(projectName)
  );
}
