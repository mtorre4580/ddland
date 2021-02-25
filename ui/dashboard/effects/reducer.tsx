import { ADD_BLOCK, REMOVE_BLOCK, EDIT_BLOCK } from './constants';
import { Action } from './models';

export default function reducer(prevState: any, action: Action) {
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
    default:
      throw new Error('Unexpected Action');
  }
}
