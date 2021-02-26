import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BackgroundAnimated from '../../ui/shared/background-animated';
import styles from '../../styles/Register.module.scss';

export default function Register() {
  return (
    <>
      <Head>
        <title>Registrarse</title>
      </Head>
      <section className={styles.register}>
        <BackgroundAnimated />
        <Container>
          <Row>
            <Col xs={12} lg={5}>
              <Image className={styles.logo} src="/page.svg" alt="logo-app" />
              <h1 className={styles.title}>DDland</h1>
              <p className={styles.subtitle}>Crea landings de manera rápida y sencilla</p>
            </Col>
            <Col xs={12} lg={7}>
              <Form className={styles.form}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" placeholder="Ingresá tu email" />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Ingresá tu contraseña" />
                </Form.Group>
                <Button variant="danger" type="submit">
                  <span>Registrarse</span>
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
