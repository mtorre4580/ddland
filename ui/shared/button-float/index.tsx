import React from 'react';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import styles from './button-float.module.scss';

type onClickCallback = () => void;

interface ButtonFloatProps {
  children: React.ReactNode;
  style: { [key: string]: string };
  onClick?: onClickCallback;
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
