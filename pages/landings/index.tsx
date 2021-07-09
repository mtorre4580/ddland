import Head from 'next/head';
import withSession from '../../middlewares/session';
import Navigation from '../../ui/shared/navigation';
import Footer from '../../ui/shared/footer';
import MyLandings from '../../ui/landings/components/my-landings';
import ILanding from '../../repository/models/web/landing';
import landingRepository from '../../repository/landing';
import styles from '../../styles/Landings.module.scss';

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
    const landings = await landingRepository.getAll(user.email);
    const landingsParse = JSON.parse(JSON.stringify(landings));
    return {
      props: {
        landings: landingsParse,
      },
    };
  } catch (err) {
    return {
      props: {
        landings: [],
      },
    };
  }
});

export default function Landings({ landings }: LandingsPageProps) {
  return (
    <>
      <Head>
        <title>Landings</title>
      </Head>
      <Navigation fullNav active="/landings" />
      <main className={styles.landings}>
        <MyLandings items={landings} />
      </main>
      <Footer />
    </>
  );
}
