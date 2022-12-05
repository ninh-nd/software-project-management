export interface Task {
    _id: string;
    name: string;
    description: string;
    status?: string;
    createdBy?: string;
    updatedBy?: string;
    isNew?: boolean;
    projectName: string;
}

export type TaskUpdate = Omit<Task, "_id">;