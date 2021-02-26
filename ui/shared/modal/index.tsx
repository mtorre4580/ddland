import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from './modal.module.scss';

interface ModalProps {
  title: string;
  children: JSX.Element;
  active: boolean;
  onClose: Function;
}

export default React.memo(function Modal({ title, children, active, onClose }: ModalProps) {
  const handleOnClose = () => onClose();

  return (
    <div className={styles.modal} style={{ visibility: active ? 'visible' : 'hidden' }}>
      <h2>{title}</h2>
      <Button className={styles.close} variant="danger" onClick={handleOnClose}>
        X
      </Button>
      {children}
    </div>
  );
});
