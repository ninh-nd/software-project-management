export default interface ServerResponse<T> {
    status: string;
    data: T;
    message: string;
}