import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import styles from './header.module.scss';

interface HeaderProps {
  title: string;
  subtitle: string;
  color: string;
}

export default React.memo(function HeaderWrapper({ title, subtitle, color }: HeaderProps) {
  return (
    <Jumbotron fluid className={styles.header} as="header">
      <h1 style={{ color }}>{title}</h1>
      {subtitle && <p style={{ color }}>{subtitle}</p>}
    </Jumbotron>
  );
});
