import resourcesAPI from "~/api";
import ServerResponse from "~/interfaces/ServerResponse";
import { TaskUpdate, Task } from "~/interfaces/Task";
export async function getTasks(projectName: string): Promise<ServerResponse<Task[]>> {
    const response = await resourcesAPI.get(`/task`, {
        params: {
            projectName
        }
    });
    return response.data;
}
export async function deleteTask(taskId: string): Promise<ServerResponse<Task>> {
    const response = await resourcesAPI.delete(`/task/${taskId}`);
    return response.data;
}
export async function createTask(task: TaskUpdate): Promise<ServerResponse<Task>> {
    const response = await resourcesAPI.post(`/task`, task);
    return response.data;
}
export async function updateTask(task: TaskUpdate, taskId: string): Promise<ServerResponse<Task>> {
    const response = await resourcesAPI.put(`/task/${taskId}`, task);
    return response.data;
}