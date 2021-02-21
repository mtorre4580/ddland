import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BlocksAvalaibles from './blocks-avalaibles';
import Canva from './canva';
import Preview from './preview';
import styles from './editor.module.scss';

export default React.memo(function Editor() {
  const [blocks, setBlocks] = useState([]);

  const handleOnAdd = (block: any) => {
    const newBlocks: any = [...blocks, block];
    setBlocks(newBlocks);
  };

  const handleOnRemove = (index: number) => {
    const copyBlocks = [...blocks];
    copyBlocks.splice(index, 1);
    setBlocks(copyBlocks);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container fluid className={styles.container}>
        <Row>
          <Col lg={3}>
            <BlocksAvalaibles />
          </Col>
          <Col lg={4}>
            <Canva onAdd={handleOnAdd} onRemove={handleOnRemove} blocks={blocks} />
          </Col>
          <Col lg={5}>
            <Preview blocks={blocks} />
          </Col>
        </Row>
      </Container>
    </DndProvider>
  );
});
