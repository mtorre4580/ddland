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
import ButtonFloat from '../shared/button-float';
import { saveLanding } from './services';

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

  const handleOnEdit = (index: number, block: any) => {
    const newBlocks: any = [...blocks];
    newBlocks[index] = block;
    setBlocks(newBlocks);
  };

  const handleSave = async () => {
    const request = {
      path: 'mi-landing-1',
      title: 'mi primera pagina',
      blocks,
    };

    try {
      const { data } = await saveLanding(request);
      console.log('data', data);
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container fluid className={styles.container}>
        <Row>
          <Col lg={3}>
            <BlocksAvalaibles />
          </Col>
          <Col lg={4}>
            <Canva onAdd={handleOnAdd} onRemove={handleOnRemove} onEdit={handleOnEdit} blocks={blocks} />
          </Col>
          <Col lg={5}>
            <Preview blocks={blocks} />
          </Col>
        </Row>
        <ButtonFloat style={{ bottom: '40px', right: '120px' }} onClick={handleSave}>
          <img className={styles.icons} src="/save.svg" alt="save-action" />
        </ButtonFloat>
        <ButtonFloat style={{ bottom: '40px', right: '40px' }}>
          <img className={styles.icons} src="/preview.svg" alt="preview-action" />
        </ButtonFloat>
      </Container>
    </DndProvider>
  );
});
