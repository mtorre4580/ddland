import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { I18nContext } from '../../../shared/i18n-provider';
import i18n from './i18n';
import styles from './form-edit.module.scss';

export default React.memo(function FormEdit({ block, onEditApply }: any) {
  const { id, values } = block;
  const [formProperties, setFormProperties] = useState(values);
  const locale = useContext(I18nContext);
  // @ts-ignore
  const texts = i18n[locale];

  /**
   * Handler to change the current state of the inputs when user change...
   * @param event React.ChangeEvent<HTMLInputElement>
   */
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormProperties({
      ...formProperties,
      [name]: value,
    });
  };

  /**
   * Handler onSubmit event to notify the edition of the current block
   * @param event React.SyntheticEvent
   */
  const handleOnSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onEditApply({ id, values: formProperties });
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      {Object.keys(values).map((key: string, index: number) => {
        return (
          <Form.Group key={index} controlId={key}>
            <Form.Label className={styles.label}>{key}</Form.Label>
            <Form.Control type="text" name={key} value={formProperties[key]} onChange={handleOnChange} />
          </Form.Group>
        );
      })}
      <Button variant="outline-light" type="submit">
        {texts.accept}
      </Button>
    </Form>
  );
});
