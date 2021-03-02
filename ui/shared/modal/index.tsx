import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import styles from './modal.module.scss';

interface ModalProps {
  title: string;
  children: JSX.Element;
  open: boolean;
  onClose: any;
}

export default React.memo(function Modal({ title, children, open, onClose }: ModalProps) {
  const [isBrowser, setIsBrowser] = useState(false);

  // Effect to detect is client side
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // Effect to detect when user click escape key, to close modal
  useEffect(() => {
    if (isBrowser) {
      document.addEventListener('keydown', handleEscapeEvent, false);
      return () => {
        window.removeEventListener('keydown', handleEscapeEvent, false);
      };
    }
  }, [isBrowser]);

  /**
   * Handler the event to close when user key the escape key
   * @param event KeyboardEvent
   */
  const handleEscapeEvent = (event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      onClose();
    }
  };

  if (isBrowser) {
    const modalRoot = document.getElementById('modal-root');
    if (modalRoot && open) {
      return ReactDOM.createPortal(
        <div className={styles.modal}>
          <h2>{title}</h2>
          <Button className={styles.close} variant="link" onClick={onClose}>
            x
          </Button>
          {children}
        </div>,
        modalRoot,
      );
    }
  }

  return null;
});
