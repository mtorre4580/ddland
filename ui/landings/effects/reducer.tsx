import {
  DELETE,
  DELETE_ERROR,
  DELETE_SUCCESS,
  DELETE_INTENTION,
  DELETE_INTENTION_CANCEL,
  DELETE_INTENTION_CONFIRM,
} from './constants';
import { StateLandings, Action } from './models';

export default function reducer(prevState: StateLandings, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case DELETE: {
      return {
        ...prevState,
        error: null,
        loading: true,
      };
    }
    case DELETE_SUCCESS: {
      const { index } = payload;
      const landingsModified = [...prevState.landings];
      landingsModified.splice(index, 1);
      return {
        ...prevState,
        error: null,
        loading: false,
        landings: landingsModified,
      };
    }
    case DELETE_ERROR: {
      const { error } = payload;
      return {
        ...prevState,
        error,
        loading: false,
      };
    }
    case DELETE_INTENTION: {
      const { index, path } = payload;
      return {
        ...prevState,
        showModal: true,
        landingSelected: {
          ...prevState.landingSelected,
          index,
          path,
        },
      };
    }
    case DELETE_INTENTION_CANCEL: {
      return {
        ...prevState,
        showModal: false,
        landingSelected: {
          index: null,
          path: null,
        },
      };
    }
    case DELETE_INTENTION_CONFIRM: {
      return {
        ...prevState,
        showModal: false,
        landingSelected: {
          index: null,
          path: null,
        },
      };
    }
    default:
      throw new Error('Unexpected Action');
  }
}
