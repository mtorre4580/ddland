import React from 'react';
import styles from './button-float.module.scss';

export default React.memo(function ButtonFloat({ children, style, onClick }: any) {
  return (
    <button className={styles.buttonFloat} style={style} onClick={onClick}>
      {children}
    </button>
  );
});
