import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BlocksAvalaibles from './blocks-avalaibles';
import Canva from './canva';
import Preview from './preview';
import styles from './editor.module.scss';

export default function Editor() {
  return (
    <Container fluid className={styles.container}>
      <Row>
        <Col lg={3}>
          <BlocksAvalaibles />
        </Col>
        <Col lg={4}>
          <Canva />
        </Col>
        <Col lg={5}>
          <Preview />
        </Col>
      </Row>
    </Container>
  );
}
