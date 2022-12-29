import { IThirdParty } from "./ThirdParty"

export interface IAccount {
    _id: string
    username: string
    email: string
    thirdParty: IThirdParty[]
}