import Head from 'next/head';
import withSession from '../../middlewares/session';
import Navigation from '../../ui/shared/navigation';
import Footer from '../../ui/shared/footer';
import Editor from '../../ui/dashboard/components/editor';
import landingRepository from '../../repository/landing';
import styles from '../../styles/Dashboard.module.scss';

export const getServerSideProps = withSession(async ({ req, res, query }) => {
  const user = req.session.get('user');
  const { path = null } = query;

  if (user === undefined) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
  }

  if (path) {
    try {
      const [, pathWithoutSlash] = path.split('/');
      const landing = await landingRepository.get(pathWithoutSlash);
      const landingParse: any = JSON.parse(JSON.stringify(landing));
      return {
        props: {
          landing: landingParse,
          isEdit: true,
        },
      };
    } catch (err) {
      return {
        props: {
          landing: null,
          isEdit: false,
        },
      };
    }
  }

  return { props: {} };
});

export default function Dashboard({ landing, isEdit }: any) {
  return (
    <section className={styles.dashboard}>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Navigation active="/dashboard" />
      <div style={{ paddingTop: '56px' }}>
        <Editor landing={landing} isEdit={isEdit} />
      </div>
      <Footer />
    </section>
  );
}
