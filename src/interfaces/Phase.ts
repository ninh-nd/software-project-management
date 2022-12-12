import { Task } from "./Task";

export default interface Phase {
    _id: string;
    name: string;
    tasks: Task[];
    createdAt?: string;
    updatedAt?: string;
}