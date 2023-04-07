import { operationFailed } from "./operation-status";

export type RegisterUserResponse = {
    id: string;
    email: string;
  } | operationFailed


export type ResetPwdResponse = {
    isSuccess: true;
  } | operationFailed


