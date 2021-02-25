import React from 'react';
import styles from './footer.module.scss';

interface FooterProps {
  text: string;
}

export default React.memo(function FooterWrapper({ text }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <p className="text-muted text-center">{text}</p>
    </footer>
  );
});
