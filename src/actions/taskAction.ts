import resourcesAPI from "~/api"
import { PromiseServer } from "~/interfaces/ServerResponse"
import { ITaskUpdate, ITask } from "~/interfaces/Task"
export async function getTasks(projectName: string): PromiseServer<ITask[]> {
    const response = await resourcesAPI.get(`/task`, {
        params: {
            projectName
        }
    })
    return response.data
}
export async function deleteTask(taskId: string): PromiseServer<ITask> {
    const response = await resourcesAPI.delete(`/task/${taskId}`)
    return response.data
}
export async function createTask(task: ITaskUpdate): PromiseServer<ITask> {
    const response = await resourcesAPI.post(`/task`, task)
    return response.data
}
export async function updateTask(task: ITaskUpdate, taskId: string): PromiseServer<ITask> {
    const response = await resourcesAPI.put(`/task/${taskId}`, task)
    return response.data
}