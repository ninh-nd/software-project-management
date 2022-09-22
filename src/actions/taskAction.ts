import resourcesAPI from "../api";
import { TaskUpdate as Task } from "../interfaces/Task";
export async function getTasks() {
    const response = await resourcesAPI.get(`/task`);
    return response;
}
export async function deleteTask(taskId: string) {
    const response = await resourcesAPI.delete(`/task/${taskId}`);
    return response;
}
export async function createTask(task: Task) {
    const response = await resourcesAPI.post(`/task`, task);
    return response;
}
export async function updateTask(task: Task, taskId: string) {
    const response = await resourcesAPI.put(`/task/${taskId}`, task);
    return response;
}