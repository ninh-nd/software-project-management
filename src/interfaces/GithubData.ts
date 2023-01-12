interface IIndividualContribution {
  author: string;
  total: number;
}
export interface ICommits {
  total: number;
  contribution: IIndividualContribution[];
}
export interface IPullRequests {
  total: number;
  contribution: IIndividualContribution[];
}
