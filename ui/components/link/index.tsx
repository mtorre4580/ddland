import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from './link.module.scss';

interface LinkProps {
  href: string;
  text: string;
  color: string;
}

export default React.memo(function LinkWrapper({ text, href, color }: LinkProps) {
  return (
    <Button variant="link" href={href} target="_blank" className={styles.link} style={{ color }}>
      {text}
    </Button>
  );
});
