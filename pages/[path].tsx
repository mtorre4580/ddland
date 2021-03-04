import Head from 'next/head';
import Reader from '../ui/dashboard/components/reader';
import landingRepository from '../repository/landing';
import styles from '../styles/Web.module.scss';
import IBlock from '../repository/models/web/block';

interface WebPageProps {
  title: string;
  blocks: IBlock[];
  notFound: boolean;
}

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

export default function Web({ title, blocks = [], notFound }: WebPageProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {notFound && <p className={styles.notFound}>La página que quiere acceder no esta disponible o no existe</p>}
      {!notFound && (
        <main className={styles.web}>
          <Reader blocks={blocks} />
        </main>
      )}
    </>
  );
}
