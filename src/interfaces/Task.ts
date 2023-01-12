export interface ITask {
  _id: string;
  name: string;
  description: string;
  status?: string;
  createdBy?: string;
  updatedBy?: string;
  isNew?: boolean;
  projectName: string;
}

export type ITaskUpdate = Omit<ITask, "_id">;
