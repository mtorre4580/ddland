import React, { useContext } from 'react';
import Reader from '../reader';
import i18n from './i18n';
import { I18nContext } from '../../../shared/i18n-provider';
import styles from './preview.module.scss';

interface PreviewProps {
  blocks: object[];
}

export default React.memo(function Preview({ blocks }: PreviewProps) {
  const locale = useContext(I18nContext);
  // @ts-ignore
  const texts = i18n[locale];
  return (
    <>
      <h2 className={styles.title}>{texts.title}</h2>
      <p className={styles.subtitle}>{texts.subtitle}</p>
      <section className={styles.preview}>
        <div className={styles.myWeb}>
          <Reader blocks={blocks} />
        </div>
      </section>
    </>
  );
});
