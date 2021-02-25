import Head from 'next/head';
import withSession from '../../middlewares/session';
import styles from '../../styles/Landings.module.scss';
import landingRepository from '../../repository/landing';
import Navigation from '../../ui/shared/navigation';
import Footer from '../../ui/shared/footer';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

export const getServerSideProps = withSession(async ({ req, res }) => {
  const user = req.session.get('user');

  if (user === undefined) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
  }

  try {
    const landings = await landingRepository.getAll(user.email);
    return {
      props: {},
    };
  } catch (err) {
    return {
      props: {},
    };
  }
});

export default function Landings() {
  const algo = [
    {
      path: '/mi-landing-1',
      title: 'mi primera pagina',
      blocks: [
        { id: 'Title', values: { title: 'Mi título', subtitle: 'Mi subtitulo...' } },
        { id: 'Paragraph', values: { text: 'Mi parráfo...' } },
        { id: 'Paragraph', values: { text: 'Mi parráfo...' } },
      ],
      author: 'mtorre4580@outlook.com',
      created_at: '2021-02-22T01:40:49.111Z',
      updated_at: null,
    },
    {
      path: '/mi-landing-1',
      title: 'mi primera pagina',
      blocks: [
        { id: 'Title', values: { title: 'Mi título', subtitle: 'Mi subtitulo...' } },
        { id: 'Paragraph', values: { text: 'Mi parráfo...' } },
        { id: 'Paragraph', values: { text: 'Mi parráfo...' } },
      ],
      author: 'mtorre4580@outlook.com',
      created_at: '2021-02-22T01:40:49.111Z',
      updated_at: null,
    },
    {
      path: '/mi-landing-1',
      title: 'mi primera pagina',
      blocks: [
        { id: 'Title', values: { title: 'Mi título', subtitle: 'Mi subtitulo...' } },
        { id: 'Paragraph', values: { text: 'Mi parráfo...' } },
        { id: 'Paragraph', values: { text: 'Mi parráfo...' } },
      ],
      author: 'mtorre4580@outlook.com',
      created_at: '2021-02-22T01:40:49.111Z',
      updated_at: null,
    },
    {
      path: '/mi-landing-1',
      title: 'mi primera pagina',
      blocks: [
        { id: 'Title', values: { title: 'Mi título', subtitle: 'Mi subtitulo...' } },
        { id: 'Paragraph', values: { text: 'Mi parráfo...' } },
        { id: 'Paragraph', values: { text: 'Mi parráfo...' } },
      ],
      author: 'mtorre4580@outlook.com',
      created_at: '2021-02-22T01:40:49.111Z',
      updated_at: null,
    },
    {
      path: '/mi-landing-1',
      title: 'mi primera pagina',
      blocks: [
        { id: 'Title', values: { title: 'Mi título', subtitle: 'Mi subtitulo...' } },
        { id: 'Paragraph', values: { text: 'Mi parráfo...' } },
        { id: 'Paragraph', values: { text: 'Mi parráfo...' } },
      ],
      author: 'mtorre4580@outlook.com',
      created_at: '2021-02-22T01:40:49.111Z',
      updated_at: null,
    },
    {
      path: '/mi-landing-1',
      title: 'mi primera pagina',
      blocks: [
        { id: 'Title', values: { title: 'Mi título', subtitle: 'Mi subtitulo...' } },
        { id: 'Paragraph', values: { text: 'Mi parráfo...' } },
        { id: 'Paragraph', values: { text: 'Mi parráfo...' } },
      ],
      author: 'mtorre4580@outlook.com',
      created_at: '2021-02-22T01:40:49.111Z',
      updated_at: null,
    },
    {
      path: '/mi-landing-1',
      title: 'mi primera pagina',
      blocks: [
        { id: 'Title', values: { title: 'Mi título', subtitle: 'Mi subtitulo...' } },
        { id: 'Paragraph', values: { text: 'Mi parráfo...' } },
        { id: 'Paragraph', values: { text: 'Mi parráfo...' } },
      ],
      author: 'mtorre4580@outlook.com',
      created_at: '2021-02-22T01:40:49.111Z',
      updated_at: null,
    },
    {
      path: '/mi-landing-1',
      title: 'mi primera pagina',
      blocks: [
        { id: 'Title', values: { title: 'Mi título', subtitle: 'Mi subtitulo...' } },
        { id: 'Paragraph', values: { text: 'Mi parráfo...' } },
        { id: 'Paragraph', values: { text: 'Mi parráfo...' } },
      ],
      author: 'mtorre4580@outlook.com',
      created_at: '2021-02-22T01:40:49.111Z',
      updated_at: null,
    },
  ];

  return (
    <section className={styles.landings}>
      <Head>
        <title>Landings</title>
      </Head>
      <Navigation active="/landings" />
      <div style={{ minHeight: '100vh', paddingTop: '56px' }}>
        <Jumbotron fluid>
          <Container>
            <h1>Mis landings</h1>
            <p>En esta sección podras encontrar todas tus landings, para que puedas visualizarlas y editarlas</p>
          </Container>
        </Jumbotron>

        {algo.length > 0 && (
          <div>
            <Table>
              <thead>
                <tr>
                  <th>Url</th>
                  <th>Título</th>
                  <th>Fecha de creación</th>
                  <th>Ultima modificación</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {algo.map((landing, index) => {
                  return (
                    <tr key={index}>
                      <td>{landing.path}</td>
                      <td>{landing.title}</td>
                      <td>{landing.created_at}</td>
                      <td>{landing.updated_at}</td>
                      <td>
                        
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        )}
      </div>
      <Footer />
    </section>
  );
}
