import React, { useContext, useCallback } from 'react';
import Block from '../block';
import { getBlocks } from '../../services';
import i18n from './i18n';
import { I18nContext } from '../../../shared/i18n-provider';
import styles from './blocks-avalaibles.module.scss';

export default React.memo(function BlocksAvalaibles() {
  const locale = useContext(I18nContext);
  // @ts-ignore
  const texts = i18n[locale];
  const blocks = useCallback(getBlocks(locale), [locale]);

  return (
    <aside className={styles.aside}>
      <h2 className={styles.title}>{texts.blocks}</h2>
      <p className={styles.subtitle}>{texts.hint}</p>
      {blocks.map((block: any, index: number) => (
        <Block key={index} {...block} />
      ))}
    </aside>
  );
});
