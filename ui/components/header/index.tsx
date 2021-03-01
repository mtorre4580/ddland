import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import styles from './header.module.scss';

interface HeaderProps {
  title: string;
  subtitle: string;
}

export default React.memo(function HeaderWrapper({ title, subtitle }: HeaderProps) {
  return (
    <Jumbotron fluid className={styles.header}>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </Jumbotron>
  );
});
