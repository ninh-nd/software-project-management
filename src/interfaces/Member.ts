import { ITask } from "./Task"
import { IActivity } from "./Activity"
export interface IMember {
    _id: string
    name: string
    taskAssigned: ITask[],
    activityHistory: IActivity[]
}