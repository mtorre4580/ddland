import React from 'react';

interface ParagraphProps {
  text: string;
}

export default React.memo(function Title({ text }: ParagraphProps) {
  return <p>{text}</p>;
});
