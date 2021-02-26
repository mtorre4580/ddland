export interface Action {
  type: string;
  payload: any;
}

export interface StateForm {
  form: {
    oldPassword: string;
    newPassword: string;
  };
  loading: boolean;
  error: string;
  updated: boolean;
}
