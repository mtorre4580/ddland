import React, { useState } from 'react';
import Image from 'next/image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FormEditionProps } from '../form-edit';
import InputEdit from '../input-edit';
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
   * @param event React.SyntheticEvent
   */
  const handleOnSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onEditApply({ id, values: { items: formProperties } });
  };

  /**
   * Handler to change the current state of the inputs when user change...
   * @param event React.ChangeEvent<HTMLInputElement>
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
        <InputEdit
          key={index}
          index={index}
          activeIndex={currentIndex}
          item={item}
          values={formProperties}
          onChange={handleOnChange}
          texts={texts}
        />
      ))}
      <Button variant="outline-light" type="submit">
        {texts.accept}
      </Button>
    </Form>
  );
});
