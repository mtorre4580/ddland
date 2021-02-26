import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Link from 'next/link';
import styles from './navigation.module.scss';

interface NavigationProps {
  active: string;
}

export default React.memo(function Navigation({ active = '/' }: NavigationProps) {
  return (
    <Navbar fixed="top" className={styles.nav} variant="dark">
      <Link href="/" passHref>
        <Navbar.Brand>
          <img alt="logo-app" src="/page.svg" width="30" height="30" className="d-inline-block align-top" /> DDLand
        </Navbar.Brand>
      </Link>
      <Nav defaultActiveKey={active} className="ml-auto" as="ul">
        <Nav.Item as="li">
          <Link href="/" passHref>
            <Nav.Link>Inicio</Nav.Link>
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
            <Nav.Link>Perfil</Nav.Link>
          </Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
});
