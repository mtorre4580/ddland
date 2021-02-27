import React from 'react';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import styles from './button-float.module.scss';

interface ButtonFloatProps {
  children: any;
  style: object;
  onClick?: any;
  tooltip?: string;
}

export default React.memo(function ButtonFloat({ children, style, onClick, tooltip }: ButtonFloatProps) {
  return (
    <OverlayTrigger placement="top" overlay={<Tooltip id={`tooltip-${tooltip}`}>{tooltip}</Tooltip>}>
      <button className={styles.buttonFloat} style={style} onClick={onClick}>
        {children}
      </button>
    </OverlayTrigger>
  );
});
