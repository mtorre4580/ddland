import React, { useReducer } from 'react';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { InitialState, Reducer, Actions } from '../../effects';
import { registerUser } from '../../services';
import styles from './form.module.scss';

export default React.memo(function FormRegister() {
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
      dispatch(Actions.register());
      const { status } = await registerUser(form);
      if (status === 201) {
        dispatch(Actions.registerSuccess());
        router.push('/login');
      }
    } catch (err) {
      const {
        data: { msg },
      } = err.response;
      dispatch(Actions.registerError(msg));
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={12} lg={5}>
          <Image className={styles.logo} src="/page.svg" alt="Logo-App" />
          <h1 className={styles.title}>DDland</h1>
          <p className={styles.subtitle}>Crea landings de manera rápida y sencilla</p>
        </Col>
        <Col xs={12} lg={7}>
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
            <Button variant="outline-light" type="submit">
              {!loading && <span>Registrarse</span>}
              {loading && (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  <span className={styles.loadingText}>Registrando...</span>
                </>
              )}
            </Button>
            <Alert className={styles.errorText} show={error !== null} variant="danger">
              {error}
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
});