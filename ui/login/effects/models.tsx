export interface FormProps {
  redirect: string;
}

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

export interface RequestLogin {
  email: string;
  password: string;
}

export interface Payload {
  [key: string]: string;
}
