import { ADD_BLOCK, REMOVE_BLOCK, EDIT_BLOCK, SORT_BLOCK } from './constants';
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
    return { type: SORT_BLOCK, payload: { dragIndex, hoverIndex }};
  }
};
