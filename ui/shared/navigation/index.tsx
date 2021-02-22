import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Link from 'next/link';

export default React.memo(function Navigation() {
  return (
    <Navbar fixed="top" bg="danger" variant="dark">
      <Navbar.Brand href="#home">
        <img alt="logo-app" src="/wblocks.svg" width="30" height="30" className="d-inline-block align-top" /> DDLand
      </Navbar.Brand>
      <Nav className="ml-auto">
        <Link href="/dashboard" passHref>
          <Nav.Link>Dashboard</Nav.Link>
        </Link>
        <Link href="/landings" passHref>
          <Nav.Link>Landings</Nav.Link>
        </Link>
        <Link href="/profile" passHref>
          <Nav.Link>Perfil</Nav.Link>
        </Link>
      </Nav>
    </Navbar>
  );
});
