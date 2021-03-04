import React from 'react';
import styles from './title.module.scss';

interface TitleProps {
  title: string;
  subtitle?: string;
  color: string;
}

export default React.memo(function TitleWrapper({ title, subtitle, color }: TitleProps) {
  return (
    <>
      <h2 className={styles.title} style={{ color }}>
        {title}
      </h2>
      {subtitle && (
        <p className={styles.subtitle} style={{ color }}>
          {subtitle}
        </p>
      )}
    </>
  );
});
