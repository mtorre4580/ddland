import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { logoutUser } from '../../services';
import styles from './my-profile.module.scss';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import FormPassword from '../form-password';
import i18n from './i18n';
import { I18nContext } from '../../../shared/i18n-provider';

interface MyProfileProps {
  user: any;
}

export default React.memo(function MyProfile({ user }: MyProfileProps) {
  const locale = useContext(I18nContext);
  const texts = i18n[locale];
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
      <Jumbotron fluid className={styles.presentation}>
        <Container>
          <h1>{user.email}</h1>
          <p>
            {texts.userSince} {formatDate(user.created_at)}
          </p>
          <Button variant="outline-light" onClick={handleLogout}>
            {texts.logout}
          </Button>
        </Container>
      </Jumbotron>
      <FormPassword email={user.email} />
    </>
  );
});
