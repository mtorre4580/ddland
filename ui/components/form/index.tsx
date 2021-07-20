import React, { useState, useContext } from 'react';
import styles from './form.module.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { sendMail } from './service';
import i18n from './i18n';
import { I18nContext } from '../../shared/i18n-provider';

interface FormProps {
  emailResponse: string;
}

export default React.memo(function FormWrapper({ emailResponse }: FormProps) {
  const [requestForm, setRequestForm] = useState({ name: '', email: '', message: '', emailResponse });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const locale = useContext(I18nContext);
  const texts = i18n[locale];

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRequestForm({ ...requestForm, [name]: value });
  };

  const handleOnSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      await sendMail(requestForm);
      setError(null);
      setLoading(false);
    } catch (err) {
      const {
        data: { msg },
      } = err.response;
      setLoading(false);
      setError(msg);
    }
  };

  return (
    <Form className={styles.contactForm} onSubmit={handleOnSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>{texts.name}</Form.Label>
        <Form.Control type="text" name="name" onChange={handleOnChange} value={requestForm.name} />
      </Form.Group >
      <Form.Group controlId="formEmail">
        <Form.Label>{texts.email}</Form.Label>
        <Form.Control type="email" name="email" required onChange={handleOnChange} value={requestForm.email} />
      </Form.Group >
      <Form.Group controlId="formMessage">
        <Form.Label>{texts.message}</Form.Label>
        <Form.Control
          name="message"
          as="textarea"
          rows={5}
          required
          onChange={handleOnChange}
          value={requestForm.message}
        />
      </Form.Group >
      <Button type="submit">
        {!loading && <span>{texts.send}</span>}
        {loading && (
          <>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            <span className={styles.loadingText}>{texts.sending}</span>
          </>
        )}
      </Button>
      <Alert className={styles.errorText} show={error !== null} variant="danger">
        {error}
      </Alert>
    </Form>
  );
});
