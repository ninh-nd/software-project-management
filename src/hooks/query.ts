import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  OptionsObject,
  SnackbarKey,
  SnackbarMessage,
  useSnackbar,
} from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteAccount,
  getAccountById,
  getAccountInfo,
  getAllAccounts,
  getPermissions,
  updateAccessToken,
  updateAccount,
  updatePermission,
} from "~/actions/accountAction";
import { getHistoryByProject } from "~/actions/activityHistoryAction";
import { getAllArtifacts, getArtifact } from "~/actions/artifactAction";
import { login, register } from "~/actions/authAction";
import { getCWE } from "~/actions/cweAction";
import { getGithubRepos } from "~/actions/githubAction";
import {
  addArtifactToPhase,
  addTaskToPhase,
  createPhasesFromTemplate,
  getPhase,
  getPhaseTemplates,
  removeArtifactFromPhase,
  removeTaskFromPhase,
  updateArtifact,
} from "~/actions/phaseAction";
import { getProjectInfo, importProject } from "~/actions/projectAction";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getAvailableTasks,
  getTask,
  updateTask,
} from "~/actions/taskAction";
import { createThreat, getThreats } from "~/actions/threatActions";
import {
  createTicket,
  getTicket,
  getTickets,
  markTicket,
} from "~/actions/ticketAction";
import {
  assignTask,
  getMemberByAccountId,
  getMemberById,
  getMembersOfProject,
  getProjectIn,
} from "~/actions/userAction";
import {
  AccountRegister,
  AccountUpdate,
  ArtifactCreate,
  GithubRepoImport,
  PhaseTemplateCreate,
  Task,
  TaskCreate,
  TaskUpdate,
  ThreatCreate,
  TicketCreateSent,
} from "~/interfaces/Entity";
import { IErrorResponse, ISuccessResponse } from "~/interfaces/ServerResponse";
import { useAccountContext, useSetAccountContext } from "./general";
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

export function useMemberByAccountIdQuery() {
  const account = useAccountContext();
  return useQuery(
    ["userInfo", account._id],
    () => getMemberByAccountId(account._id),
    {
      enabled: !!account,
    }
  );
}

export function useActivityHistoryQuery(projectName: string) {
  return useQuery(["activityHistory", projectName], () =>
    getHistoryByProject(projectName, undefined)
  );
}

export function useActivityHistoryOfUserQuery(projectName: string) {
  const account = useAccountContext();
  return useQuery(
    ["activityHistory", projectName],
    () => getHistoryByProject(projectName, account.username),
    {
      enabled: !!account,
    }
  );
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
interface ActionArtifactToPhase {
  phaseId: string;
  artifactId: string;
  artifact: ArtifactCreate;
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
export function useProjectInQuery() {
  return useQuery(["projectIn"], getProjectIn);
}
export function useTasksQuery(projectName: string) {
  return useQuery(["tasks", projectName], () => getAllTasks(projectName));
}
export function useAvailableTasksQuery(projectName: string) {
  return useQuery(["tasks", projectName], () => getAvailableTasks(projectName));
}
export function useThreatsQuery() {
  return useQuery(["threats"], getThreats);
}
export function useCreateThreatMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (threat: ThreatCreate) => createThreat(threat),
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
    mutationFn: (ticket: TicketCreateSent) => createTicket(ticket),
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
export function useGetGithubRepo() {
  return useQuery(["repos"], getGithubRepos);
}
export function useAccountsQuery() {
  return useQuery(["accounts"], getAllAccounts);
}
export function useAccountByIdQuery(id: string) {
  return useQuery(["account", id], () => getAccountById(id));
}
interface AccountUpdateParams {
  id: string;
  updateData: AccountUpdate;
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
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const setAccountContext = useSetAccountContext();
  return useMutation({
    mutationFn: ({ username, password }: LoginParams) =>
      login(username, password),
    onSuccess: async () => {
      const { data } = await getAccountInfo();
      if (data) {
        // IMPORTANT!
        setAccountContext(data);
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
          navigate(`/${currentProject}/`);
        }
      }
    },
    onError: (error) => {
      enqueueSnackbar("Wrong username/password", { variant: "error" });
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
    mutationFn: (account: AccountRegister) => register(account),
    onSuccess: (response) => {
      toast(response, enqueueSnackbar, () => {
        navigate("/login");
      });
    },
  });
}
export function usePermissionListQuery() {
  return useQuery(["permissions"], getPermissions);
}
interface UpdatePermissionParams {
  id: string;
  permission: string[];
}
export function useUpdatePermissionMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: ({ id, permission }: UpdatePermissionParams) =>
      updatePermission(id, permission),
    onSuccess: (response, { id }) => {
      toast(response, enqueueSnackbar, () => {
        queryClient.invalidateQueries(["permissions"]);
        queryClient.invalidateQueries(["account", id]);
      });
    },
  });
}
export function useArtifactsQuery(projectName: string) {
  return useQuery(["artifacts", projectName], () =>
    getAllArtifacts(projectName)
  );
}
export function useCWEQuery(id: string) {
  return useQuery(["cwe", id], () => getCWE(id));
}
export function usePhaseTemplatesQuery() {
  return useQuery(["phaseTemplates"], getPhaseTemplates);
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
interface UpdateAccessTokenParams {
  id: string;
  accessToken: string;
}
export function useUpdateAccessTokenMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: ({ id, accessToken }: UpdateAccessTokenParams) =>
      updateAccessToken(id, accessToken),
    onSuccess: (response) => {
      toast(response, enqueueSnackbar, () => {
        queryClient.invalidateQueries(["accountInfo"]);
      });
    },
  });
}
export function useImportProjectMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: GithubRepoImport) => importProject(data),
    onSuccess: (response) => {
      toast(response, enqueueSnackbar, () => {
        queryClient.invalidateQueries(["projectIn"]);
        const { data } = response;
        if (data) {
          navigate(`/${data.name}/`);
        }
      });
    },
  });
}

export function useDeleteTaskMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: (response) => {
      toast(response, enqueueSnackbar, () => {
        queryClient.invalidateQueries(["tasks"]);
      });
    },
  });
}

interface CreateTaskParams {
  data: TaskCreate;
  projectName: string;
}
export function useCreateTaskMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: ({ data, projectName }: CreateTaskParams) =>
      createTask(data, projectName),
    onSuccess: (response) => {
      toast(response, enqueueSnackbar, () => {
        queryClient.invalidateQueries(["tasks"]);
      });
    },
  });
}
interface UpdateTaskParams {
  data: TaskUpdate;
  id: string;
}
export function useUpdateTaskMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: ({ data, id }: UpdateTaskParams) => updateTask(data, id),
    onSuccess: (response) => {
      toast(response, enqueueSnackbar, () => {
        queryClient.invalidateQueries(["tasks"]);
        // Member page
        queryClient.invalidateQueries(["userInfo"]);
      });
    },
  });
}
export function useTaskQuery(id: string) {
  return useQuery(["tasks", id], () => getTask(id));
}
