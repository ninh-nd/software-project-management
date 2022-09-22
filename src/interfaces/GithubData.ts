interface IndividualContribution {
    author: string;
    total: number;
}
export interface Commits {
    total: number;
    contribution: IndividualContribution[];
}
export interface PullRequests {
    total: number;
    contribution: IndividualContribution[];
}