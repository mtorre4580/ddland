import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import styles from './progress.module.scss';

interface ProgressProps {
  text: string;
}

export default React.memo(function Progress({ text }: ProgressProps) {
  return (
    <div className={styles.progress}>
      <p>{text}</p>
      <ProgressBar animated now={100} />
    </div>
  );
});
