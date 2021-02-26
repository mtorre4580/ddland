export interface Action {
  type: string;
  payload: any;
}

export interface StateForm {
  form: {
    email: string;
    password: string;
  };
  loading: boolean;
  error: string;
}

export interface RequestUser {
  email: string;
  password: string;
}

export interface Payload {
  [key: string]: string;
}
