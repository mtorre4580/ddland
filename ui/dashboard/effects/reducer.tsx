import {
  ADD_BLOCK,
  REMOVE_BLOCK,
  EDIT_BLOCK,
  SORT_BLOCK,
  HAS_ERROR,
  LOADING,
  SAVE_LANDING_SUCCESS,
  UPDATE_LANDING_SUCCESS,
  OPEN_MODAL_SAVE,
  CLOSE_MODAL_SAVE,
} from './constants';
import { Action, StateEditor } from './models';

export default function reducer(prevState: StateEditor, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_BLOCK: {
      const { block } = payload;
      return {
        ...prevState,
        blocks: [...prevState.blocks, block],
      };
    }
    case REMOVE_BLOCK: {
      const { index } = payload;
      const blocksModified = [...prevState.blocks];
      blocksModified.splice(index, 1);
      return {
        ...prevState,
        blocks: blocksModified,
      };
    }
    case EDIT_BLOCK: {
      const { index, block } = payload;
      const blocksModified = [...prevState.blocks];
      blocksModified[index] = block;
      return {
        ...prevState,
        blocks: blocksModified,
      };
    }
    case SORT_BLOCK: {
      const { dragIndex, hoverIndex } = payload;
      const sortBlocks = [...prevState.blocks];
      const newBlock = sortBlocks[dragIndex];
      const oldBlock = sortBlocks[hoverIndex];
      sortBlocks[dragIndex] = oldBlock;
      sortBlocks[hoverIndex] = newBlock;
      return {
        ...prevState,
        blocks: sortBlocks,
      };
    }
    case OPEN_MODAL_SAVE: {
      return {
        ...prevState,
        isModalOpen: true,
      };
    }
    case CLOSE_MODAL_SAVE: {
      return {
        ...prevState,
        isModalOpen: false,
      };
    }
    case SAVE_LANDING_SUCCESS: {
      const { title, path } = payload;
      return {
        ...prevState,
        loading: false,
        isEdit: true,
        isModalOpen: false,
        title,
        path,
      };
    }
    case UPDATE_LANDING_SUCCESS: {
      return {
        ...prevState,
        loading: false,
      };
    }
    case LOADING: {
      return {
        ...prevState,
        loading: true,
        error: null,
      };
    }
    case HAS_ERROR: {
      const { error } = payload;
      return {
        ...prevState,
        loading: false,
        error,
      };
    }
    default:
      throw new Error('Unexpected Action');
  }
}
