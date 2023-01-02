import { ITask } from "./Task"

export interface IPhase {
    _id: string
    name: string
    tasks: ITask[]
    createdAt?: string
    updatedAt?: string
}