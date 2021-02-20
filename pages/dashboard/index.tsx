import withSession from '../../services/session';

export const getServerSideProps = withSession(async ({ req, res }) => {
  const user = req.session.get('user');

  if (user === undefined) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return {
    props: { user: req.session.get('user') },
  };
});

export default function Dashboard({ user }: any) {
  const datos = JSON.stringify(user);
  return (
    <div>
      estoy logueado
      <p>{datos}</p>
    </div>
  );
}
