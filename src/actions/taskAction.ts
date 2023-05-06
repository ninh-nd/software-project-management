import api from "~/api";
import { PromiseServer } from "~/interfaces/ServerResponse";
import { TaskUpdate, Task } from "~/interfaces/Entity";
export async function getAllTasks(projectName: string): PromiseServer<Task[]> {
  const response = await api.get(`/task`, {
    params: {
      projectName,
    },
  });
  return response.data;
}
export async function getAvailableTasks(
  projectName: string
): PromiseServer<Task[]> {
  const response = await api.get(`/task`, {
    params: {
      projectName,
      filter: "unassigned",
    },
  });
  return response.data;
}
export async function deleteTask(taskId: string): PromiseServer<Task> {
  const response = await api.delete(`/task/${taskId}`);
  return response.data;
}
export async function createTask(task: TaskUpdate): PromiseServer<Task> {
  const response = await api.post(`/task`, { data: task });
  return response.data;
}
export async function updateTask(
  task: TaskUpdate,
  taskId: string
): PromiseServer<Task> {
  const response = await api.put(`/task/${taskId}`, { data: task });
  return response.data;
}
