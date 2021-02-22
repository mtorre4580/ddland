import React, { useReducer } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BlocksAvalaibles from '../blocks-avalaibles';
import Canva from '../canva';
import Preview from '../preview';
import ButtonFloat from '../../../shared/button-float';
import { saveLanding } from '../../services';
import { Reducer, InitialState, Actions, Models } from '../../effects';
import styles from './editor.module.scss';

export default React.memo(function Editor() {
  const [{ blocks }, dispatch] = useReducer(Reducer, InitialState);

  /**
   * Handler when user add block to the Dashboard
   * @param block Block
   */
  const handleOnAdd = (block: Models.Block) => dispatch(Actions.addBlock(block));

  /**
   * Handler when user remove block to the Dashboard
   * @param index number
   */
  const handleOnRemove = (index: number) => dispatch(Actions.removeBlock(index));

  /**
   * Handler when user edit success the block
   * @param index number
   * @param block Block
   */
  const handleOnEdit = (index: number, block: Models.Block) => dispatch(Actions.editBlock(index, block));

  /**
   * Handler the current landing
   */
  const handleSave = async () => {
    const request = {
      path: 'mi-landing-1',
      title: 'mi primera pagina',
      blocks,
    };
    try {
      await saveLanding(request);
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
