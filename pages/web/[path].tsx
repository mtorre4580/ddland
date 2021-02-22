import Reader from '../../ui/editor/reader';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import { useEffect } from 'react';

// export async function getServerSideProps(context: any) {
//   const { path } = context.params;

//   try {
//     const { data } = await axios.get('/api/landings', {
//       params: {
//         path: `/${path}`,
//       },
//     });
//     return {
//       props: {
//         ...data,
//       },
//     };
//   } catch (err) {
//     console.log('que viene', err);
//     return {
//       props: {},
//     };
//   }
// }

export default function Web({ path = null, title = null, blocks = [] }: any) {
  return (
    <section>
      <Reader blocks={blocks} />
    </section>
  );
}
