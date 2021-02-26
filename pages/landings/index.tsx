import Head from 'next/head';
import withSession from '../../middlewares/session';
import Navigation from '../../ui/shared/navigation';
import Footer from '../../ui/shared/footer';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ILanding from '../../repository/models/web/landing';
import landingRepository from '../../repository/landing';
import styles from '../../styles/Landings.module.scss';
import axios from 'axios';
import fileDownload from 'js-file-download';

interface LandingsPageProps {
  landings: ILanding[];
}

export const getServerSideProps = withSession(async ({ req, res }) => {
  const user = req.session.get('user');

  if (user === undefined) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
  }

  try {
    const landings: any = await landingRepository.getAll(user.email);
    const landingsParse: any = JSON.parse(JSON.stringify(landings));
    return {
      props: {
        landings: landingsParse,
      },
    };
  } catch (err) {
    return {
      props: {},
    };
  }
});

const formatDate = (date: Date) => new Date(date).toLocaleDateString();

export default function Landings({ landings }: LandingsPageProps) {
  /**
   * Handler to download the web in .html with the current title
   * @param path string
   * @param title string
   */
  const handleOnDownload = async (path: string, title: string) => {
    try {
      const { data } = await axios.get(path, {
        responseType: 'blob',
      });
      fileDownload(data, `${title}.html`);
    } catch (err) {
      console.log('err', err);
    }
  };

  /**
   * Handler to delete the current web selected
   * @param path string
   */
  const handleOnDelete = async (path: string) => {
    try {
      const { data } = await axios.delete(`/api/landings${path}`);
      console.log('se elimino', data);
    } catch (err) {
      console.log('err', err);
    }
  };

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
        {landings.length > 0 && (
          <div className={styles.table}>
            <Table>
              <thead>
                <tr>
                  <th>URL</th>
                  <th>Título</th>
                  <th>Fecha de creación</th>
                  <th>Ultima modificación</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {landings.map((landing: ILanding, index: number) => {
                  return (
                    <tr key={index}>
                      <td>{landing.path}</td>
                      <td>{landing.title}</td>
                      <td>{formatDate(landing.created_at)}</td>
                      <td>{landing.updated_at ? formatDate(landing.updated_at) : 'Sin modificaciones'}</td>
                      <td className={styles.actions}>
                        <Button
                          href={`/dashboard?path=${landing.path}`}
                          className={styles.actionButton}
                          variant="danger"
                        >
                          Editar
                        </Button>
                        <Button
                          className={styles.actionButton}
                          variant="danger"
                          onClick={() => handleOnDelete(landing.path)}
                        >
                          Eliminar
                        </Button>
                        <Button
                          className={styles.actionButton}
                          variant="danger"
                          onClick={() => handleOnDownload(landing.path, landing.title)}
                        >
                          Descargar
                        </Button>
                        <Button
                          href={landing.path}
                          target="_blank"
                          className={styles.actionButton}
                          variant="danger"
                        >
                          Visualizar
                        </Button>
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
