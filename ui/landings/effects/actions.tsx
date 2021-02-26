import {
  DELETE,
  DELETE_ERROR,
  DELETE_INTENTION,
  DELETE_INTENTION_CANCEL,
  DELETE_INTENTION_CONFIRM,
  DELETE_SUCCESS,
} from './constants';

export default {
  delete: () => {
    return { type: DELETE, payload: {} };
  },
  deleteSuccess: (index: number) => {
    return { type: DELETE_SUCCESS, payload: { index } };
  },
  deleteError: (error: string) => {
    return { type: DELETE_ERROR, payload: { error } };
  },
  deleteIntention: (path: string, index: number) => {
    return { type: DELETE_INTENTION, payload: { path, index } };
  },
  deleteIntentionCancel: () => {
    return { type: DELETE_INTENTION_CANCEL, payload: {} };
  },
  deleteIntentionConfirm: () => {
    return { type: DELETE_INTENTION_CONFIRM, payload: {} };
  },
};
