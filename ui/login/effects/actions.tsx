import { CHANGE_INPUT, AUTH, AUTH_SUCCESS, AUTH_ERROR } from './constants';
import { Payload } from './models';

export default {
  changeInput: (payload: Payload) => {
    return { type: CHANGE_INPUT, payload };
  },
  autenticate: () => {
    return { type: AUTH, payload: {} };
  },
  autenticateSuccess: () => {
    return { type: AUTH_SUCCESS, payload: {} };
  },
  autenticateError: (error: string) => {
    return { type: AUTH_ERROR, payload: { error } };
  },
};
