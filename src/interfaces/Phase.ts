import { IArtifact } from "./Artifact";
import { ITask } from "./Task";

export interface IPhase {
  _id: string;
  name: string;
  tasks: ITask[];
  artifacts: IArtifact[];
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}
