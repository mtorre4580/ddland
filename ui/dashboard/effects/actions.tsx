import { ADD_BLOCK, REMOVE_BLOCK, EDIT_BLOCK, SORT_BLOCK, LOADING, SAVE_LANDING_SUCCESS, HAS_ERROR } from './constants';
import { Block } from './models';

export default {
  addBlock: (block: Block) => {
    return { type: ADD_BLOCK, payload: { block } };
  },
  removeBlock: (index: number) => {
    return { type: REMOVE_BLOCK, payload: { index } };
  },
  editBlock: (index: number, block: Block) => {
    return { type: EDIT_BLOCK, payload: { index, block } };
  },
  sortBlock: (dragIndex: number, hoverIndex: number) => {
    return { type: SORT_BLOCK, payload: { dragIndex, hoverIndex } };
  },
  loading: () => {
    return { type: LOADING, payload: {} };
  },
  saveLandingSuccess: (title: string, path: string) => {
    return { type: SAVE_LANDING_SUCCESS, payload: { title, path: `/${path}` } };
  },
  errorUpdatingOrSaving: (error: string) => {
    return { type: HAS_ERROR, payload: { error } };
  },
};
