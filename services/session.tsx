import { Handler, withIronSession } from 'next-iron-session';

export default function withSession(handler: Handler) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD as string,
    cookieName: 'ddland/auth',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  });
}
