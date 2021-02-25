import React from 'react';
import styles from './video.module.scss';

interface VideoProps {
  url: string;
  title: string;
}

export default React.memo(function VideoWrapper({ url, title }: VideoProps) {
  return (
    <section className={styles.video}>
      <div className={styles.wrapper}>
        <iframe className={styles.iframe} src={url} allowFullScreen frameBorder="0" title={title} />
      </div>
    </section>
  );
});
