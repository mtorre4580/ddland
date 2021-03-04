import React from 'react';
import styles from './footer.module.scss';

interface FooterProps {
  text: string;
  color: string;
}

export default React.memo(function FooterWrapper({ text, color }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <p className={styles.text} style={{ color }}>
        {text}
      </p>
    </footer>
  );
});
