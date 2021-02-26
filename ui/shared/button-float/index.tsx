import React from 'react';
import styles from './button-float.module.scss';

interface ButtonFloatProps {
  children: any;
  style: object;
  onClick?: any;
}

export default React.memo(function ButtonFloat({ children, style, onClick }: ButtonFloatProps) {
  return (
    <button className={styles.buttonFloat} style={style} onClick={onClick}>
      {children}
    </button>
  );
});
