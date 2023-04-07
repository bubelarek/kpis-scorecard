export type RegisterUserResponse = {
    id: string;
    email: string;
  } | {
    isSuccess: false;
    message: string;
  }

export type ResetPwdResponse = {
    isSuccess: true;
  } | {
    isSuccess: false;
    message: string;
  }