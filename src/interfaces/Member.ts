import { Task } from "./Task";
import Activity from "./Activity";
export default interface Member {
    _id: string;
    name: string;
    taskAssigned: Task[],
    activityHistory: Activity[]
}