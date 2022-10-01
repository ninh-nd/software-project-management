export default interface Task {
    _id: string;
    name: string;
    description: string;
    status: string;
    createdBy?: string;
    updatedBy?: string;
    isNew?: boolean;
}

export type TaskUpdate = Omit<Task, "_id">;