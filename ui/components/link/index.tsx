import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from './link.module.scss';

interface LinkProps {
  href: string;
  text: string;
}

export default React.memo(function LinkWrapper(props: LinkProps) {
  return (
    <Button variant="link" className={styles.link} {...props}>
      {props.text}
    </Button>
  );
});
