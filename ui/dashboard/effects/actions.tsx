import {
  ADD_BLOCK,
  REMOVE_BLOCK,
  EDIT_BLOCK,
  SORT_BLOCK,
  LOADING,
  SAVE_LANDING_SUCCESS,
  HAS_ERROR,
  UPDATE_LANDING_SUCCESS,
  OPEN_MODAL_SAVE,
  CLOSE_MODAL_SAVE,
} from './constants';
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
  updateLandingSuccess: () => {
    return { type: UPDATE_LANDING_SUCCESS, payload: {} };
  },
  errorUpdatingOrSaving: (error: string) => {
    return { type: HAS_ERROR, payload: { error } };
  },
  openModalSave: () => {
    return { type: OPEN_MODAL_SAVE, payload: {} };
  },
  closeModalSave: () => {
    return { type: CLOSE_MODAL_SAVE, payload: {} };
  },
};
