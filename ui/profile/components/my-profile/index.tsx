import React from 'react';
import { useRouter } from 'next/router';
import { logoutUser } from '../../services';
import styles from './my-profile.module.scss';
import Button from 'react-bootstrap/Button';
import FormPassword from '../form-password';

interface MyProfileProps {
  user: any;
}

export default React.memo(function MyProfile({ user }: MyProfileProps) {
  const router = useRouter();

  /**
   * Format the current Dates to show the user
   * @param date Date
   */
  const formatDate = (date: Date) => new Date(date).toLocaleDateString();

  /**
   * Handler to logout the current user and redirect to the root
   */
  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <section className={styles.profileUser}>
        <h1 className={styles.title}>{user.email}</h1>
        <ol className={styles.list}>
          <li className={styles.li}>Usuario desde {formatDate(user.created_at)}</li>
        </ol>
        <Button className={styles.logout} variant="outline-light" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </section>
      <FormPassword email={user.email} />
    </>
  );
});
