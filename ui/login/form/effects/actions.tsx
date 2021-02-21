import { CHANGE_INPUT, AUTH, AUTH_SUCCESS, AUTH_ERROR } from './constants';

export default {
  changeInput: (payload: any) => {
    return { type: CHANGE_INPUT, payload };
  },
  autenticate: () => {
    return { type: AUTH, payload: {} };
  },
  autenticateSucces: () => {
    return { type: AUTH_SUCCESS, payload: {} };
  },
  autenticateError: (error: string) => {
    return { type: AUTH_ERROR, payload: { error } };
  },
};
