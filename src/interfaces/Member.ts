import { ITask } from "./Task";
import { IActivity } from "./Activity";
import { IAccount } from "./Account";
export interface IMember {
  _id: string;
  name: string;
  taskAssigned: ITask[];
  activityHistory: IActivity[];
  account: IAccount;
}
