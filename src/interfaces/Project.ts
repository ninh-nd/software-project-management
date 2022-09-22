import Phase from "./Phase";

export default interface Project {
    _id?: string;
    name: string;
    url: string;
    status: string;
    createdAt?: string;
    updatedAt?: string;
    phaseList: Phase[];
}