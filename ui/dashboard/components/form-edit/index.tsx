import React, { useContext } from 'react';
import FormSingle from '../form-single';
import FormMultiple from '../form-multiple';
import { I18nContext } from '../../../shared/i18n-provider';
import i18n from './i18n';

export interface FormEditionProps {
  block: any;
  onEditApply: Function;
  texts: { [key: string]: string };
}

export default React.memo(function FormEdit({ block, onEditApply }: FormEditionProps) {
  const isSingle = !block.values.items;
  const locale = useContext(I18nContext);
  const texts = i18n[locale];

  if (isSingle) {
    return <FormSingle block={block} onEditApply={onEditApply} texts={texts} />;
  }
  return <FormMultiple block={block} onEditApply={onEditApply} texts={texts} />;
});
