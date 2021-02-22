import Head from 'next/head';
import Reader from '../ui/dashboard/components/reader';
import ILanding from '../repository/models/web/landing';
import landingRepository from '../repository/landing';
import styles from '../styles/Web.module.scss';

export async function getServerSideProps(context: any) {
  try {
    const { path, title, blocks } = await landingRepository.get(context.params.path);
    return {
      props: {
        path,
        title,
        blocks,
      },
    };
  } catch (err) {
    return {
      props: {
        notFound: true,
      },
    };
  }
}

export default function Web({ title, blocks = [], notFound }: ILanding & { notFound: boolean }) {
  return (
    <section className={styles.web}>
      <Head>
        <title>{title}</title>
      </Head>
      {notFound && <p className={styles.notFound}>La página que quiere acceder no esta disponible o no existe</p>}
      {!notFound && <Reader blocks={blocks} />}
    </section>
  );
}
