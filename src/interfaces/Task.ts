export default interface Task {
    _id: string;
    name: string;
    description: string;
    status: string;
    createdBy?: string;
    updatedBy?: string;
    isNew?: boolean;
}
export interface TaskUpdate {
    name: string;
    description: string;
    status: string;
    createdBy?: string;
    updatedBy?: string;
    isNew?: boolean;
}