import React, { useReducer } from 'react';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import { loginUser } from '../../services';
import { InitialState, Reducer, Actions } from '../../effects';
import styles from './form.module.scss';

export default React.memo(function FormLogin() {
  const [{ form, loading, error }, dispatch] = useReducer(Reducer, InitialState);
  const router = useRouter();

  /**
   * Handler the onChange event for the Inputs
   * @param event
   */
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch(Actions.changeInput({ [name]: value }));
  };

  /**
   * Handler the onSubmit event Form
   * @param event
   */
  const handleOnSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      dispatch(Actions.autenticate());
      const { status } = await loginUser(form);
      if (status === 200) {
        dispatch(Actions.autenticateSuccess());
        router.push('/dashboard');
      }
    } catch (err) {
      const {
        data: { msg },
      } = err.response;
      dispatch(Actions.autenticateError(msg));
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleOnSubmit}>
      <Image className={styles.logo} src="/page.svg" alt="logo-app" />
      <h1 className={styles.title}>DDland</h1>
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Ingresá tu email"
          onChange={handleOnChange}
          value={form.email}
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Ingresá tu contraseña"
          onChange={handleOnChange}
          value={form.password}
        />
      </Form.Group>
      <Button variant="outline-light" type="submit">
        {!loading && <span>Acceder</span>}
        {loading && (
          <>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            <span className={styles.loadingText}>Accediendo...</span>
          </>
        )}
      </Button>
      <Alert className={styles.errorText} show={error !== null} variant="danger">
        {error}
      </Alert>
    </Form>
  );
});
