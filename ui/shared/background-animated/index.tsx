import React from 'react';
import styles from './background-animated.module.scss';

export default React.memo(function BackgroundAnimated() {
  return (
    <ul className={styles.circles}>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  );
});
