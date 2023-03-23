type ISuccessResponse<T> = {
  status: "success";
  data: T;
  message: string;
};
type IErrorResponse = {
  status: "error";
  data: null;
  message: string;
};
export type PromiseServer<T> = Promise<ISuccessResponse<T> | IErrorResponse>;
