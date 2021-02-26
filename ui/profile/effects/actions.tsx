import { CHANGE_INPUT, CHANGE_PASSWORD, CHANGE_PASSWORD_ERROR, CHANGE_PASSWORD_SUCCESS } from './constants';

export default {
  changeInput: (payload: any) => {
    return { type: CHANGE_INPUT, payload };
  },
  changePassword: () => {
    return { type: CHANGE_PASSWORD, payload: {} };
  },
  changePasswordSuccess: () => {
    return { type: CHANGE_PASSWORD_SUCCESS, payload: {} };
  },
  changePasswordError: (error: string) => {
    return { type: CHANGE_PASSWORD_ERROR, payload: { error } };
  },
};
