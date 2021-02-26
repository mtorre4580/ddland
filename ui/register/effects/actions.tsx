import { CHANGE_INPUT, REGISTER, REGISTER_SUCCESS, REGISTER_ERROR } from './constants';

export default {
  changeInput: (payload: any) => {
    return { type: CHANGE_INPUT, payload };
  },
  register: () => {
    return { type: REGISTER, payload: {} };
  },
  registerSuccess: () => {
    return { type: REGISTER_SUCCESS, payload: {} };
  },
  registerError: (error: string) => {
    return { type: REGISTER_ERROR, payload: { error } };
  },
};
