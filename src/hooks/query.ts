import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  OptionsObject,
  SnackbarKey,
  SnackbarMessage,
  useSnackbar,
} from "notistack";
import {
  deleteAccount,
  getAccountById,
  getAccountInfo,
  getAllAccounts,
  updateAccount,
} from "~/actions/accountAction";
import { getCommits, getPullRequests } from "~/actions/activityHistoryAction";
import { getArtifact } from "~/actions/artifactAction";
import { getImportProjects } from "~/actions/githubAction";
import {
  assignTask,
  getMemberById,
  getMembersOfProject,
  markTask,
  getProjectIn,
} from "~/actions/userAction";
import {
  addArtifactToPhase,
  addTaskToPhase,
  getPhase,
  removeArtifactFromPhase,
  removeTaskFromPhase,
  updateArtifact,
} from "~/actions/phaseAction";
import { createPhaseModel, getProjectInfo } from "~/actions/projectAction";
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
import {
  IAccountRegister,
  IAccountUpdate,
  IArtifactCreate,
  IPhaseCreate,
  IThreatCreate,
  ITicketCreateSent,
} from "~/interfaces/Entity";
import { IErrorResponse, ISuccessResponse } from "~/interfaces/ServerResponse";
import { login, register } from "~/actions/authAction";
import { useNavigate } from "react-router-dom";
import { useProjectActions } from "./project";
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
  return useMutation({
    mutationFn: ({ taskIdArray, status }: MarkTaskParams) =>
      markTask(taskIdArray, status),
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
  return useMutation({
    mutationFn: ({ taskId, memberId }: AssignTaskParams) =>
      assignTask(taskId, memberId),
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
  return useMutation({
    mutationFn: ({ phaseId, taskId }: ActionTaskToPhaseParams) =>
      addTaskToPhase(phaseId, taskId),
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
  return useMutation({
    mutationFn: ({ phaseId, taskId }: ActionTaskToPhaseParams) =>
      removeTaskFromPhase(phaseId, taskId),
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
  type RemoveArtifactFromPhase = Omit<ActionArtifactToPhase, "artifact">;
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
export function useUpdateArtifactMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: ({ phaseId, artifactId, artifact }: ActionArtifactToPhase) =>
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
  return useMutation({
    mutationFn: ({ projectId, model }: CreatePhaseModelParams) =>
      createPhaseModel(projectId, model),
    onSuccess: (response, { projectId }) => {
      toast(response, enqueueSnackbar, () =>
        queryClient.invalidateQueries(["projectInfo", projectId])
      );
    },
  });
}
export function useProjectInQuery() {
  return useQuery(["projectIn"], getProjectIn);
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
  return useMutation({
    mutationFn: (threat: IThreatCreate) => createThreat(threat),
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
  return useMutation({
    mutationFn: (ticket: ITicketCreateSent) => createTicket(ticket),
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
  return useMutation({
    mutationFn: ({ id, status }: MarkTicketParams) => markTicket(id, status),
    onSuccess: (response, { id }) => {
      toast(response, enqueueSnackbar, () => {
        queryClient.invalidateQueries(["ticket", id]);
      });
    },
  });
}
export function useCreateCVEMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: ({ cveId }: { cveId: string }) => createCVE(cveId),
    onSuccess: (response) => {
      toast(response, enqueueSnackbar, () =>
        queryClient.invalidateQueries(["vulns"])
      );
    },
  });
}
export function useCreateCVEsMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: ({ cveIds }: { cveIds: string }) => createCVEs(cveIds),
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
export function useGetImportProjectsQuery(
  username: string,
  accessToken: string
) {
  return useQuery(
    ["importProjects"],
    () => getImportProjects(username, accessToken),
    {
      enabled: !!username && !!accessToken,
    }
  );
}
export function useAccountsQuery() {
  return useQuery(["accounts"], getAllAccounts);
}
export function useAccountByIdQuery(id: string) {
  return useQuery(["account", id], () => getAccountById(id));
}
interface AccountUpdateParams {
  id: string;
  updateData: IAccountUpdate;
}
export function useAccountUpdateMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: ({ id, updateData }: AccountUpdateParams) =>
      updateAccount(id, updateData),
    onSuccess: (response) => {
      toast(response, enqueueSnackbar, () => {
        queryClient.invalidateQueries(["accounts"]);
      });
    },
  });
}
interface LoginParams {
  username: string;
  password: string;
}
export function useLoginMutation() {
  const { setCurrentProject } = useProjectActions();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ username, password }: LoginParams) =>
      login(username, password),
    onSuccess: async () => {
      const { data } = await getAccountInfo();
      if (data) {
        const { role } = data;
        if (role === "admin") {
          navigate("/admin/accounts");
        } else {
          const { data } = await getProjectIn();
          if (!data) {
            enqueueSnackbar("Can't get list of project owned", {
              variant: "error",
            });
            return;
          }
          const currentProject = data[0].name;
          setCurrentProject(currentProject);
          navigate(`/${currentProject}/`);
        }
      }
    },
  });
}
export function useDeleteAccountMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (id: string) => deleteAccount(id),
    onSuccess: (response) => {
      toast(response, enqueueSnackbar, () => {
        queryClient.invalidateQueries(["accounts"]);
      });
    },
  });
}
export function useCreateAccountMutation() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (account: IAccountRegister) => register(account),
    onSuccess: (response) => {
      toast(response, enqueueSnackbar, () => {
        navigate("/login");
      });
    },
  });
}
