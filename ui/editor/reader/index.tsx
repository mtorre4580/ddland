import React from 'react';
import * as Components from '../../components';

interface ReaderProps {
  blocks: object[];
}

export default React.memo(function Reader({ blocks }: ReaderProps) {
  return (
    <>
      {blocks.map((block: any, index: number) => {
        const Block = (Components as any)[block.id] || null;
        if (Block) {
          return <Block key={index} {...block.values} />;
        }
        return null;
      })}
    </>
  );
});
