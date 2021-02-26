import { CHANGE_INPUT, CHANGE_PASSWORD, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_ERROR } from './constants';
import { StateForm, Action } from './models';

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
    case CHANGE_PASSWORD: {
      return {
        ...prevState,
        loading: true,
        error: null,
        updated: false,
      };
    }
    case CHANGE_PASSWORD_SUCCESS: {
      return {
        ...prevState,
        loading: false,
        error: null,
        updated: true,
      };
    }
    case CHANGE_PASSWORD_ERROR: {
      return {
        ...prevState,
        loading: false,
        error: payload.error,
        updated: false,
      };
    }
    default:
      throw new Error('Unexpected Action');
  }
}
