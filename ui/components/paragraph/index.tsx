import React from 'react';

interface ParagraphProps {
  text: string;
}

export default React.memo(function ParagraphWrapper({ text }: ParagraphProps) {
  return <p>{text}</p>;
});
