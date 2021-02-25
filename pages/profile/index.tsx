import Head from 'next/head';
import withSession from '../../middlewares/session';
import styles from '../../styles/Profile.module.scss';
import Navigation from '../../ui/shared/navigation';
import Footer from '../../ui/shared/footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

export const getServerSideProps = withSession(async ({ req, res }) => {
  const user = req.session.get('user');

  if (user === undefined) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
  }

  return {
    props: {
      user,
    },
  };
});

export default function Profile({ user }: any) {
  return (
    <section className={styles.profile}>
      <Head>
        <title>Perfil</title>
      </Head>
      <Navigation active="/profile" />
      <div style={{ minHeight: '100vh', paddingTop: '56px' }}>
        <Container fluid className="my-4">
          <Row>
            <Col>
              <div className={styles.user}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <Image src="https://randomuser.me/api/portraits/women/75.jpg" rounded />
                  <Button style={{margin: '4px'}} variant="outline-danger">Editar</Button>
                </div>
                <div className={styles.info}>
                  <h2>{user.name}</h2>
                  <h3>{user.email}</h3>
                  <p>Usuario desde {new Date(user.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </section>
  );
}
