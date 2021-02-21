import { Handler, withIronSession } from 'next-iron-session';

/**
 * Middleware to handle the current session for the user
 * @param handler
 */
export default function withSession(handler: Handler) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD as string,
    cookieName: process.env.COOKIE_NAME as string,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  });
}
