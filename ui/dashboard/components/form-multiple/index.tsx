import React, { useState } from 'react';
import Image from 'next/image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FormEditionProps } from '../form-edit';
import Input from '../input';
import styles from './form-multiple.module.scss';

export default React.memo(function FormMultiple({ block, onEditApply, texts }: FormEditionProps) {
  const {
    id,
    values: { items },
  } = block;

  const totalItems = items.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formProperties, setFormProperties] = useState(items);

  /**
   * Handler onSubmit event to notify the edition of the current block
   * @param {React.SyntheticEvent} event
   */
  const handleOnSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onEditApply({ id, values: { items: formProperties } });
  };

  /**
   * Handler to change the current state of the inputs when user change...
   * @param {React.ChangeEvent<HTMLInputElement>} event
   * @param {number} index
   */
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = event.target;
    const copy = [...formProperties];
    copy[index] = {
      ...formProperties[index],
      [name]: value,
    };
    setFormProperties(copy);
  };

  /**
   * Handler the step form next
   */
  const handleNext = () => {
    const nextValue = currentIndex + 1;
    if (nextValue < totalItems) {
      setCurrentIndex(nextValue);
    }
  };

  /**
   * Handler the step form before
   */
  const handleBefore = () => {
    const beforeValue = currentIndex - 1;
    if (beforeValue >= 0) {
      setCurrentIndex(beforeValue);
    }
  };

  return (
    <Form onSubmit={handleOnSubmit} className={styles.formMultiple}>
      <div className={styles.stepperWrapper}>
        <Button variant="link" onClick={handleBefore}>
          <Image src="/left.svg" height={24} width={24} />
        </Button>
        <Button variant="link" onClick={handleNext}>
          <Image src="/right.svg" height={24} width={24} />
        </Button>
      </div>
      {formProperties.map((item: any, index: number) => (
        <div key={index} style={{ display: index === currentIndex ? 'block' : 'none' }}>
          <p className={styles.titleBlock}>
            {texts.block} {index + 1}
          </p>
          <p className={styles.titleBlock}>{texts.hintStepForm}</p>
          {Object.keys(item).map((key: string, position: number) => (
            <Input
              label={texts[key] ? texts[key] : key}
              name={key}
              texts={texts}
              key={position}
              value={formProperties[index][key]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnChange(e, index)}
            />
          ))}
        </div>
      ))}
      <Button variant="outline-light" type="submit">
        {texts.accept}
      </Button>
    </Form>
  );
});
