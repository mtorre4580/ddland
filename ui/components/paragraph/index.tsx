import React from 'react';
import styles from './paragraph.module.scss';

interface ParagraphProps {
  text: string;
}

export default React.memo(function ParagraphWrapper({ text }: ParagraphProps) {
  return <p className={styles.paragraph}>{text}</p>;
});
