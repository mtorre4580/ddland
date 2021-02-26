import { StateForm, Action } from '../../login/effects/models';
import { CHANGE_INPUT, REGISTER, REGISTER_SUCCESS, REGISTER_ERROR } from './constants';

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
    case REGISTER: {
      return {
        ...prevState,
        loading: true,
        error: null,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...prevState,
        loading: false,
        error: null,
      };
    }
    case REGISTER_ERROR: {
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
