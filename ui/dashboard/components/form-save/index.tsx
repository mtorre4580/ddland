import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getLandingWithPath } from '../../services';
import { I18nContext } from '../../../shared/i18n-provider';
import i18n from './i18n';
import styles from './form-save.module.scss';

interface FormSaveProps {
  onSave: Function;
}

export default React.memo(function FormSave({ onSave }: FormSaveProps) {
  const [isExistsURL, setIsExistsURL] = useState(false);
  const [form, setForm] = useState({ path: '', title: '' });
  const locale = useContext(I18nContext);
  // @ts-ignore
  const texts = i18n[locale];

  /**
   * Handler onSubmit event to notify the save landing
   * @param event React.SyntheticEvent
   */
  const handleOnSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSave(form.path, form.title);
  };

  /**
   * Handler to change the current state of the inputs when user change...
   * @param event React.ChangeEvent<HTMLInputElement>
   */
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  /**
   * Handler to verify if the url exists, if the API respond with the status 404, is correct
   */
  const handleOnKeyUp = async () => {
    if (form.path.length > 2) {
      try {
        await getLandingWithPath(form.path);
        setIsExistsURL(true);
      } catch (err) {
        setIsExistsURL(false);
      }
    }
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Group controlId="formPath">
        <Form.Label>{texts.url}</Form.Label>
        <Form.Control
          required
          type="text"
          name="path"
          onChange={handleOnChange}
          onKeyUp={handleOnKeyUp}
          value={form.path}
        />
        {isExistsURL && <p className={styles.errorURLExists}>{texts.urlExits}</p>}
        {!isExistsURL && <p>{texts.hintURL}</p>}
      </Form.Group>
      <Form.Group controlId="formTitle">
        <Form.Label>{texts.title}</Form.Label>
        <Form.Control required type="text" name="title" onChange={handleOnChange} value={form.title} />
        <p>{texts.hintTitle}</p>
      </Form.Group>
      <Button variant="outline-light" type="submit">
        {texts.save}
      </Button>
    </Form>
  );
});
