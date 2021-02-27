import React, { useReducer } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import BlocksAvalaibles from '../blocks-avalaibles';
import Canva from '../canva';
import Preview from '../preview';
import ButtonFloat from '../../../shared/button-float';
import { saveLanding, updateLanding } from '../../services';
import { Reducer, InitialState, Actions, Models } from '../../effects';
import ILanding from '../../../../repository/models/web/landing';
import styles from './editor.module.scss';

interface EditorProps {
  landing: ILanding | object;
  firstEdit: boolean;
}

export default React.memo(function Editor({ landing = {}, firstEdit }: EditorProps) {
  const [{ blocks, path, title, error, isEdit }, dispatch] = useReducer(Reducer, {
    ...InitialState,
    ...landing,
    isEdit: firstEdit,
  });

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
   * Handler when user sort the block (up, down)
   * @param dragIndex number
   * @param hoverIndex number
   */
  const handleOnSort = (dragIndex: number, hoverIndex: number) => dispatch(Actions.sortBlock(dragIndex, hoverIndex));

  /**
   * Handler the current landing save or update
   */
  const handleSaveOrUpdate = async () => {
    try {
      dispatch(Actions.loading());
      if (isEdit) {
        await updateLanding(path, { title, blocks });
      } else {
        // TODO
        const title = 'landing-test-2';
        const path = 'testing-3';
        await saveLanding({ path, title, blocks });
        dispatch(Actions.saveLandingSuccess(title, path));
      }
    } catch (err) {
      const {
        data: { msg },
      } = err.response;
      dispatch(Actions.errorUpdatingOrSaving(msg));
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container fluid className={styles.container} as="section">
        <Alert className={styles.errorText} show={error !== null} variant="danger">
          {error}
        </Alert>
        <Row>
          <Col xs={12} md={12} lg={3}>
            <BlocksAvalaibles />
          </Col>
          <Col xs={12} md={12} lg={4}>
            <Canva
              onAdd={handleOnAdd}
              onRemove={handleOnRemove}
              onEdit={handleOnEdit}
              onSort={handleOnSort}
              blocks={blocks}
            />
          </Col>
          <Col xs={12} md={12} lg={5}>
            <Preview blocks={blocks} />
          </Col>
        </Row>
        {blocks.length > 0 && (
          <>
            <ButtonFloat style={{ bottom: '40px', right: '120px' }} onClick={handleSaveOrUpdate}>
              <img className={styles.icons} src="/save.svg" alt="save-action" />
            </ButtonFloat>
            <ButtonFloat style={{ bottom: '40px', right: '40px' }}>
              <img className={styles.icons} src="/preview.svg" alt="preview-action" />
            </ButtonFloat>
          </>
        )}
      </Container>
    </DndProvider>
  );
});
