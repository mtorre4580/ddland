import React from 'react';
import styles from './paragraph.module.scss';

interface ParagraphProps {
  text: string;
  color: string;
}

export default React.memo(function ParagraphWrapper({ text, color }: ParagraphProps) {
  return (
    <p style={{ color }} className={styles.paragraph}>
      {text}
    </p>
  );
});
