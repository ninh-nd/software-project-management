import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  OptionsObject,
  SnackbarKey,
  SnackbarMessage,
  useSnackbar,
} from "notistack";
import { getAccountInfo } from "~/actions/accountAction";
import { getCommits, getPullRequests } from "~/actions/activityHistoryAction";
import { getArtifact } from "~/actions/artifactAction";
import {
  assignTask,
  getMemberById,
  getMembersOfProject,
  markTask,
} from "~/actions/memberAction";
import {
  addArtifactToPhase,
  addTaskToPhase,
  getPhase,
  removeArtifactFromPhase,
  removeTaskFromPhase,
  updateArtifact,
} from "~/actions/phaseAction";
import { createPhaseModel, getProjectInfo } from "~/actions/projectAction";
import { getProjectOwn } from "~/actions/projectManagerAction";
import { getAllTasks, getAvailableTasks } from "~/actions/taskAction";
import { createThreat, getThreats } from "~/actions/threatActions";
import {
  createTicket,
  getTicket,
  getTickets,
  markTicket,
} from "~/actions/ticketAction";
import {
  createCVE,
  createCVEs,
  getVulnerabilities,
} from "~/actions/vulnAction";
import { IArtifactCreate } from "~/interfaces/Artifact";
import { IPhaseCreate } from "~/interfaces/PhasePreset";
import { IErrorResponse, ISuccessResponse } from "~/interfaces/ServerResponse";
import { IThreatCreate } from "~/interfaces/Threat";
import { ITicketCreateSent } from "~/interfaces/Ticket";
function toast(
  response: ISuccessResponse<any> | IErrorResponse,
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey,
  invalidateFn: Function
) {
  if (response.status === "success") {
    enqueueSnackbar(response.message, { variant: "success" });
    invalidateFn();
  } else if (response.status === "error") {
    enqueueSnackbar(response.message, { variant: "error" });
  }
}
export function useAccountInfoQuery() {
  return useQuery(["accountInfo"], () => getAccountInfo());
}

export function usePullRequestsQuery(project: string) {
  return useQuery(["pullRequests", project], () => getPullRequests(project));
}

export function useCommitsQuery(project: string) {
  return useQuery(["commits", project], () => getCommits(project));
}

export function useArtifactQuery(artifactId: string) {
  return useQuery(["artifact", artifactId], () => getArtifact(artifactId));
}

export function useMembersQuery(project: string) {
  return useQuery(["members", project], () => getMembersOfProject(project));
}

export function useMemberQuery(memberId: string) {
  return useQuery(["member", memberId], () => getMemberById(memberId));
}

interface MarkTaskParams {
  taskIdArray: string[];
  status: "complete" | "active";
  memberId: string;
}
export function useMarkTaskMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation<any, any, MarkTaskParams, any>({
    mutationFn: ({ taskIdArray, status }) => markTask(taskIdArray, status),
    onSuccess: (response, { memberId }) => {
      toast(response, enqueueSnackbar, () =>
        queryClient.invalidateQueries(["member", memberId])
      );
    },
  });
}

interface AssignTaskParams {
  taskId: string;
  memberId: string;
}
export function useAssignTaskMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation<any, any, AssignTaskParams, any>({
    mutationFn: ({ taskId, memberId }) => assignTask(taskId, memberId),
    onSuccess: (response, { memberId }) => {
      toast(response, enqueueSnackbar, () =>
        queryClient.invalidateQueries(["member", memberId])
      );
    },
  });
}

export function usePhaseQuery(id: string) {
  return useQuery(["phase", id], () => getPhase(id));
}

interface ActionTaskToPhaseParams {
  phaseId: string;
  taskId: string;
  currentProject: string;
}
export function useAddTaskToPhaseMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation<any, any, ActionTaskToPhaseParams, any>({
    mutationFn: ({ phaseId, taskId }) => addTaskToPhase(phaseId, taskId),
    onSuccess: (response, { phaseId, currentProject }) => {
      toast(response, enqueueSnackbar, () => {
        queryClient.invalidateQueries(["phase", phaseId]);
        queryClient.invalidateQueries(["taskList", currentProject]);
      });
    },
  });
}
export function useRemoveTaskFromPhaseMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation<any, any, ActionTaskToPhaseParams, any>({
    mutationFn: ({ phaseId, taskId }) => removeTaskFromPhase(phaseId, taskId),
    onSuccess: (response, { phaseId, currentProject }) => {
      toast(response, enqueueSnackbar, () => {
        queryClient.invalidateQueries(["phase", phaseId]);
        queryClient.invalidateQueries(["taskList", currentProject]);
      });
    },
  });
}
interface ActionArtifactToPhase {
  phaseId: string;
  artifactId: string;
  artifact: IArtifactCreate;
}
export function useAddArtifactToPhaseMutation() {
  type AddArtifactToPhase = Omit<ActionArtifactToPhase, "artifactId">;
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation<any, any, AddArtifactToPhase, any>({
    mutationFn: ({ phaseId, artifact }) =>
      addArtifactToPhase(phaseId, artifact),
    onSuccess: (response, { phaseId }) => {
      toast(response, enqueueSnackbar, () =>
        queryClient.invalidateQueries(["phase", phaseId])
      );
    },
  });
}
export function useRemoveArtifactFromPhaseMutation() {
  type RemoveArtifactFromPhase = Omit<ActionArtifactToPhase, "artifact">;
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation<any, any, RemoveArtifactFromPhase, any>({
    mutationFn: ({ phaseId, artifactId }) =>
      removeArtifactFromPhase(phaseId, artifactId),
    onSuccess: (response, { phaseId }) => {
      toast(response, enqueueSnackbar, () =>
        queryClient.invalidateQueries(["phase", phaseId])
      );
    },
  });
}
export function useUpdateArtifactMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation<any, any, ActionArtifactToPhase, any>({
    mutationFn: ({ phaseId, artifactId, artifact }) =>
      updateArtifact(phaseId, artifactId, artifact),
    onSuccess: (response, { artifactId, phaseId }) => {
      toast(response, enqueueSnackbar, () => {
        queryClient.invalidateQueries(["artifact", artifactId]);
        queryClient.invalidateQueries(["phase", phaseId]);
      });
    },
  });
}
export function useProjectInfoQuery(projectName: string) {
  return useQuery(["projectInfo", projectName], () =>
    getProjectInfo(projectName)
  );
}
interface CreatePhaseModelParams {
  projectId: string;
  model: IPhaseCreate[];
}
export function useCreatePhaseModelMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation<any, any, CreatePhaseModelParams, any>({
    mutationFn: ({ projectId, model }) => createPhaseModel(projectId, model),
    onSuccess: (response, { projectId }) => {
      toast(response, enqueueSnackbar, () =>
        queryClient.invalidateQueries(["projectInfo", projectId])
      );
    },
  });
}
export function useProjectOwnQuery() {
  return useQuery(["projectOwn"], getProjectOwn);
}
export function useTasksQuery(projectName: string) {
  return useQuery(["taskList", projectName], () => getAllTasks(projectName));
}
export function useAvailableTasksQuery(projectName: string) {
  return useQuery(["taskList", projectName], () =>
    getAvailableTasks(projectName)
  );
}
export function useThreatsQuery() {
  return useQuery(["threats"], getThreats);
}
export function useCreateThreatMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation<any, any, IThreatCreate, any>({
    mutationFn: (threat) => createThreat(threat),
    onSuccess: (response) => {
      toast(response, enqueueSnackbar, () =>
        queryClient.invalidateQueries(["threats"])
      );
    },
  });
}
export function useTicketsQuery(projectName: string) {
  return useQuery(["tickets", projectName], () => getTickets(projectName));
}
export function useCreateTicketMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation<any, any, ITicketCreateSent, any>({
    mutationFn: (ticket) => createTicket(ticket),
    onSuccess: (response) => {
      toast(response, enqueueSnackbar, () => {
        queryClient.invalidateQueries(["tickets"]);
      });
    },
  });
}
export function useTicketQuery(id: string) {
  return useQuery(["ticket", id], () => getTicket(id));
}
interface MarkTicketParams {
  id: string;
  status: "open" | "closed";
}
export function useMarkTicketMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation<any, any, MarkTicketParams, any>({
    mutationFn: ({ id, status }) => markTicket(id, status),
    onSuccess: (response, { id }) => {
      toast(response, enqueueSnackbar, () => {
        queryClient.invalidateQueries(["ticket", id]);
      });
    },
  });
}
interface CreateCVEParams {
  cveId: string;
}
export function useCreateCVEMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation<any, any, CreateCVEParams, any>({
    mutationFn: ({ cveId }) => createCVE(cveId),
    onSuccess: (response) => {
      toast(response, enqueueSnackbar, () =>
        queryClient.invalidateQueries(["vulns"])
      );
    },
  });
}
interface CreateCVEsParams {
  cveIds: string;
}
export function useCreateCVEsMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation<any, any, CreateCVEsParams, any>({
    mutationFn: ({ cveIds }) => createCVEs(cveIds),
    onSuccess: (response) => {
      toast(response, enqueueSnackbar, () =>
        queryClient.invalidateQueries(["vulns"])
      );
    },
  });
}
export function useVulnsQuery() {
  return useQuery(["vulns"], getVulnerabilities);
}
