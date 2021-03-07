import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Link from 'next/link';
import styles from './navigation.module.scss';
import i18n from './i18n';
import { I18nContext } from '../i18n-provider';

interface NavigationProps {
  active: string;
  fullNav: boolean;
}

export default React.memo(function Navigation({ active = '/', fullNav }: NavigationProps) {
  const locale = useContext(I18nContext);
  const texts = i18n[locale];

  return (
    <Navbar collapseOnSelect expand="lg" fixed="top" className={styles.nav} variant="dark">
      <Link href="/" passHref>
        <Navbar.Brand>
          <img alt="logo-app" src="/page.svg" width="30" height="30" className="d-inline-block align-top" /> DDLand
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-ddland" />
      <Navbar.Collapse id="responsive-navbar-ddland">
        <Nav defaultActiveKey={active} className="ml-auto" as="ul">
          {!fullNav && (
            <>
              <Nav.Item as="li">
                <Link href="/register" passHref>
                  <Nav.Link>{texts.register}</Nav.Link>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link href="/login" passHref>
                  <Nav.Link>{texts.login}</Nav.Link>
                </Link>
              </Nav.Item>
            </>
          )}
          {fullNav && (
            <>
              <Nav.Item as="li">
                <Link href="/" passHref>
                  <Nav.Link>{texts.home}</Nav.Link>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link href="/dashboard" passHref>
                  <Nav.Link>Dashboard</Nav.Link>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link href="/landings" passHref>
                  <Nav.Link>Landings</Nav.Link>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link href="/profile" passHref>
                  <Nav.Link>{texts.profile}</Nav.Link>
                </Link>
              </Nav.Item>
            </>
          )}
          {active === '/' && (
            <>
              <Nav.Item as="li" className={styles.itemLang}>
                <Link href="/es" passHref>
                  <Nav.Link className={styles.btnLangEs}>ES</Nav.Link>
                </Link>
              </Nav.Item>
              <Nav.Item as="li" className={styles.itemLang}>
                <Link href="/en" passHref>
                  <Nav.Link className={styles.btnLangEn}>EN</Nav.Link>
                </Link>
              </Nav.Item>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
});
