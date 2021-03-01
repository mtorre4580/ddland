import React from 'react';
import styles from './title.module.scss';

interface TitleProps {
  title: string;
  subtitle?: string;
}

export default React.memo(function TitleWrapper({ title, subtitle }: TitleProps) {
  return (
    <div className={styles.title}>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
});
