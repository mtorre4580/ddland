import React, { useReducer } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { useRouter } from 'next/router';
import { InitialState, Reducer, Actions, Models } from './effects';
import styles from './form.module.scss';

export default React.memo(({ redirect }: Models.FormProps) => {
  const [{ form, loading, error }, dispatch] = useReducer(Reducer, InitialState);
  const router = useRouter();

  /**
   * Handler the onChange for the inputs
   * @param event
   */
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch(Actions.changeInput({ [name]: value }));
  };

  /**
   * Handler the submit event form
   * @param event
   */
  const handleOnSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      dispatch(Actions.autenticate());

      const { status } = await axios.post('/api/login', {
        ...form,
      });

      if (status === 200) {
        dispatch(Actions.autenticateSucces());
        router.push(redirect);
      }
    } catch (err) {
      const { status } = err.response;
      const message = status === 400 ? 'Los datos ingresados no son válidos' : 'Error inesperado';
      dispatch(Actions.autenticateError(message));
    }
  };

  return (
    <>
      <Form className={styles.form} onSubmit={handleOnSubmit}>
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
        <Button variant="danger" type="submit">
          {!loading && <span>Acceder</span>}
          {loading && (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              <span className={styles.loading}>Accediendo...</span>
            </>
          )}
        </Button>
        <Alert className={styles.error} show={error !== null} variant="danger">
          {error}
        </Alert>
      </Form>
    </>
  );
});
