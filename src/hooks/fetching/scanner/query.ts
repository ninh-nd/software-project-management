import { useMutation, useQuery } from "@tanstack/react-query";
import { createNewScanner, getAllScanners, getSampleCode } from "./axios";

export function useSampleCode() {
  return useQuery(["sample"], getSampleCode);
}
export function useCreateNewScannerMutation() {
  return useMutation({
    mutationFn: (data: CreateNewScanner) => createNewScanner(data),
  });
}
export function useGetScanners() {
  return useQuery(["scanners"], getAllScanners);
}