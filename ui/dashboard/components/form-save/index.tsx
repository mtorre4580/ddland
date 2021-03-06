import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getLandingWithPath } from '../../services';
import { I18nContext } from '../../../shared/i18n-provider';
import i18n from './i18n';
import styles from './form-save.module.scss';

type onSaveCallback = (path: string, title: string) => void;

interface FormSaveProps {
  onSave: onSaveCallback;
}

export default React.memo(function FormSave({ onSave }: FormSaveProps) {
  const [isExistsURL, setIsExistsURL] = useState(false);
  const [form, setForm] = useState({ path: '', title: '' });
  const locale = useContext(I18nContext);
  const texts = i18n[locale];

  /**
   * Handler onSubmit event to notify the save landing
   * @param {React.SyntheticEvent} event
   */
  const handleOnSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSave(form.path, form.title);
  };

  /**
   * Handler to change the current state of the inputs when user change...
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let formatValue = value;
    if (name === 'path') {
      formatValue = formatValue.replace(/[\/|#|.|$|@|%|?|¿]/, '').replace(/ /g, '-');
    }
    setForm({
      ...form,
      [name]: formatValue,
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
        <Form.Label className={styles.label}>{texts.url}</Form.Label>
        <Form.Control
          required
          type="text"
          name="path"
          onChange={handleOnChange}
          onKeyUp={handleOnKeyUp}
          value={form.path}
        />
        {isExistsURL && <p className={styles.errorURLExists}>{texts.urlExits}</p>}
        {!isExistsURL && (
          <p className={styles.hintUrl}>
            {texts.hintURL} https://ddland.app/{form.path}
          </p>
        )}
      </Form.Group>
      <Form.Group controlId="formTitle">
        <Form.Label className={styles.label}>{texts.title}</Form.Label>
        <Form.Control required type="text" name="title" onChange={handleOnChange} value={form.title} />
        <p>{texts.hintTitle}</p>
      </Form.Group>
      <Button variant="outline-light" type="submit">
        {texts.save}
      </Button>
    </Form>
  );
});
