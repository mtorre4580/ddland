import Head from 'next/head';
import Reader from '../ui/dashboard/components/reader';
import cacheService from '../services/cache';
import landingRepository from '../repository/landing';
import styles from '../styles/Web.module.scss';
import IBlock from '../repository/models/web/block';

interface WebPageProps {
  title: string;
  blocks: IBlock[];
  notFound: boolean;
}

/**
 * Retrieve the current landing if exists with policy cache
 * @param url string
 * @return Promise<object>
 */
const getLanding = async (url: string) => {
  const landingFromCache: { path: string, title: string, blocks: IBlock[] } = cacheService.get(url);
  if (landingFromCache) {
    return landingFromCache;
  }
  const { path, title, blocks } = await landingRepository.get(url);
  const landing = {
    path,
    title,
    blocks,
  };
  cacheService.set(url, landing);
  return landing;
};

export async function getServerSideProps(context: any) {
  try {
    const landing = await getLanding(context.params.path);
    return {
      props: {
        ...landing,
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
