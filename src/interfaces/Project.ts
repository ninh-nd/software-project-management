import { IPhase } from "./Phase";

export interface IProject {
  _id?: string;
  name: string;
  url: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  phaseList: IPhase[];
}
