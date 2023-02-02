export interface IThreat {
  _id: string;
  name: string;
  description: string;
}
export type IThreatCreate = Omit<IThreat, "_id">;
