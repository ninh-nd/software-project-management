interface IResponse<T> {
    status: string
    data: T
    message: string
}
export type PromiseServer<T> = Promise<IResponse<T>>