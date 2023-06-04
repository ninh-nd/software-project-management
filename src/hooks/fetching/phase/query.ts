import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addArtifactToPhase,
  addTaskToPhase,
  createPhasesFromTemplate,
  getPhase,
  getPhaseTemplates,
  removeArtifactFromPhase,
  removeTaskFromPhase,
} from "./axios";
import { PhaseTemplateCreate } from ".";
import { useSnackbar } from "notistack";
import { toast } from "~/utils/toast";
import { ArtifactCreate } from "../artifact";

export function useAddArtifactToPhaseMutation() {
  interface AddArtifactToPhase {
    phaseId: string;
    artifact: ArtifactCreate;
  }
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: ({ phaseId, artifact }: AddArtifactToPhase) =>
      addArtifactToPhase(phaseId, artifact),
    onSuccess: (response, { phaseId }) => {
      toast(response, enqueueSnackbar, () =>
        queryClient.invalidateQueries(["phase", phaseId])
      );
    },
  });
}
export function useRemoveArtifactFromPhaseMutation() {
  interface RemoveArtifactFromPhase {
    phaseId: string;
    artifactId: string;
  }
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: ({ phaseId, artifactId }: RemoveArtifactFromPhase) =>
      removeArtifactFromPhase(phaseId, artifactId),
    onSuccess: (response, { phaseId }) => {
      toast(response, enqueueSnackbar, () =>
        queryClient.invalidateQueries(["phase", phaseId])
      );
    },
  });
}
interface ActionTaskToPhaseParams {
  phaseId: string;
  taskId: string;
  currentProject: string;
}
export function useAddTaskToPhaseMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: ({ phaseId, taskId }: ActionTaskToPhaseParams) =>
      addTaskToPhase(phaseId, taskId),
    onSuccess: (response, { phaseId, currentProject }) => {
      toast(response, enqueueSnackbar, () => {
        queryClient.invalidateQueries(["phase", phaseId]);
        queryClient.invalidateQueries(["tasks", currentProject]);
      });
    },
  });
}
export function useRemoveTaskFromPhaseMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: ({ phaseId, taskId }: ActionTaskToPhaseParams) =>
      removeTaskFromPhase(phaseId, taskId),
    onSuccess: (response, { phaseId, currentProject }) => {
      toast(response, enqueueSnackbar, () => {
        queryClient.invalidateQueries(["phase", phaseId]);
        queryClient.invalidateQueries(["tasks", currentProject]);
      });
    },
  });
}
interface CreatePhasesFromTemplateParams {
  projectName: string;
  data: PhaseTemplateCreate;
}
export function useCreatePhasesFromTemplateMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: ({ projectName, data }: CreatePhasesFromTemplateParams) =>
      createPhasesFromTemplate(projectName, data),
    onSuccess: (response, { projectName }) => {
      toast(response, enqueueSnackbar, () => {
        queryClient.invalidateQueries(["projectInfo", projectName]);
      });
    },
  });
}
export function usePhaseTemplatesQuery() {
  return useQuery(["phaseTemplates"], getPhaseTemplates);
}
export function usePhaseQuery(id: string) {
  return useQuery(["phase", id], () => getPhase(id));
}
