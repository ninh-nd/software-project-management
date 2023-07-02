import { useQuery } from "@tanstack/react-query";
import { getChangeHistory } from "./axios";

export function useChangeHistoryQuery(objectId: string) {
  return useQuery(["changeHistory", objectId], () =>
    getChangeHistory(objectId)
  );
}
