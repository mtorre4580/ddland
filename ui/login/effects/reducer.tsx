import { StateForm, Action } from './models';
import { CHANGE_INPUT, AUTH, AUTH_SUCCESS, AUTH_ERROR } from './constants';

export default function reducer(prevState: StateForm, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_INPUT: {
      return {
        ...prevState,
        form: {
          ...prevState.form,
          ...payload,
        },
      };
    }
    case AUTH: {
      return {
        ...prevState,
        loading: true,
        error: null,
      };
    }
    case AUTH_SUCCESS: {
      return {
        ...prevState,
        loading: false,
        error: null,
      };
    }
    case AUTH_ERROR: {
      return {
        ...prevState,
        loading: false,
        error: payload.error,
      };
    }
    default:
      throw new Error('Unexpected Action');
  }
}
