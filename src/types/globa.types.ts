export interface TGenericRes<T> {
  success: boolean;
  statusCode: number;
  message: string;
  token?: string;
  data: T;
}

export interface ErrorMessage {
  path: string;
  message: string;
}

export interface TGenericErrRes {
  success: boolean;
  message: string;
  statusCode?: number;
  errorMessages: ErrorMessage[];
  stack?: string; // Optional stack trace
}
