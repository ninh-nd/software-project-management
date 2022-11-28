import resourcesAPI from "~/api";
import { TaskUpdate as Task } from "~/interfaces/Task";
export async function getTasks(projectName: string) {
    const response = await resourcesAPI.get(`/task`, {
        params: {
            projectName
        }
    });
    return response.data;
}
export async function deleteTask(taskId: string) {
    const response = await resourcesAPI.delete(`/task/${taskId}`);
    return response.data;
}
export async function createTask(task: Task) {
    const response = await resourcesAPI.post(`/task`, task);
    return response.data;
}
export async function updateTask(task: Task, taskId: string) {
    const response = await resourcesAPI.put(`/task/${taskId}`, task);
    return response.data;
}