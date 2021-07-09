import React, { ChangeEventHandler } from 'react';
import InputImage from '../input-image';
import InputText from '../input-text';

interface InputProps {
  name: string;
  label: string;
  value: string;
  onChange: ChangeEventHandler;
  texts: { [key: string]: string };
}

export default React.memo(function Input({ name, onChange, value, texts, label }: InputProps) {
  if (name === 'src') {
    return <InputImage texts={texts} name={name} label={label} value={value} onChange={onChange} />;
  }
  return <InputText name={name} value={value} label={label} onChange={onChange} />;
});
