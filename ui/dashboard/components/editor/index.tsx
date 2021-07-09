import React, { useContext } from 'react';
import { useReducer } from 'reinspect';
import Image from 'next/image';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import BlocksAvalaibles from '../blocks-avalaibles';
import Canva from '../canva';
import Preview from '../preview';
import ButtonFloat from '../../../shared/button-float';
import Progress from '../../../shared/progress';
import Spinner from 'react-bootstrap/Spinner';
import Modal from '../../../shared/modal';
import i18n from './i18n';
import { I18nContext } from '../../../shared/i18n-provider';
import { saveLanding, updateLanding } from '../../services';
import { Reducer, InitialState, Actions, Models } from '../../effects';
import ILanding from '../../../../repository/models/web/landing';
import styles from './editor.module.scss';
import FormSave from '../form-save';

interface EditorProps {
  landing: ILanding | any;
  firstEdit: boolean;
}

export default React.memo(function Editor({ landing = {}, firstEdit }: EditorProps) {
  const [{ blocks, path, title, error, isEdit, loading, isModalOpen }, dispatch] = useReducer(
    Reducer,
    {
      ...InitialState,
      ...landing,
      isEdit: firstEdit,
    },
    (basic) => basic,
    'DASHBOARD_PAGE',
  );
  const locale = useContext(I18nContext);
  const texts = i18n[locale];

  /**
   * Handler when user add block to the Dashboard
   * @param {Block} block
   */
  const handleOnAdd = (block: Models.Block) => dispatch(Actions.addBlock(block));

  /**
   * Handler when user remove block to the Dashboard
   * @param {number} index
   */
  const handleOnRemove = (index: number) => dispatch(Actions.removeBlock(index));

  /**
   * Handler when user edit success the block
   * @param {number} index
   * @param {Block} block
   */
  const handleOnEdit = (index: number, block: Models.Block) => dispatch(Actions.editBlock(index, block));

  /**
   * Handler when user sort the block (up, down)
   * @param {number} dragIndex
   * @param {number} hoverIndex
   */
  const handleOnSort = (dragIndex: number, hoverIndex: number) => dispatch(Actions.sortBlock(dragIndex, hoverIndex));

  /**
   * Handler the current landing save or update,
   * If the first save, modal to confirm the current action
   */
  const handleSaveOrUpdate = async () => {
    if (isEdit) {
      try {
        dispatch(Actions.loading());
        await updateLanding(path, { title, blocks });
        dispatch(Actions.updateLandingSuccess());
      } catch (err) {
        const {
          data: { msg },
        } = err.response;
        dispatch(Actions.errorUpdatingOrSaving(msg));
      }
    } else {
      dispatch(Actions.openModalSave());
    }
  };

  /**
   * Handler the user preview, redirect to show the landing created
   */
  const handlePreview = () => {
    window.open(path, '_blank');
  }

  /**
   * Handler the modal to cancel
   */
  const handleOnCloseModal = () => dispatch(Actions.closeModalSave());

  /**
   * Handler the modal to confirm the save
   * @param {string} pathSelected
   * @param {string} titleSelected
   */
  const handleOnSave = async (pathSelected: string, titleSelected: string) => {
    try {
      dispatch(Actions.loading());
      await saveLanding({ path: pathSelected, title: titleSelected, blocks });
      dispatch(Actions.saveLandingSuccess(titleSelected, pathSelected));
    } catch (err) {
      const {
        data: { msg },
      } = err.response;
      dispatch(Actions.errorUpdatingOrSaving(msg));
    }
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
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
            <ButtonFloat style={{ bottom: '40px', right: '120px' }} onClick={handleSaveOrUpdate} tooltip={texts.save}>
              {!loading && <Image height={24} width={24} className={styles.icons} src="/save.svg" alt="save-action" />}
              {loading && (
                <Spinner animation="grow" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              )}
            </ButtonFloat>
            {isEdit && (
              <ButtonFloat style={{ bottom: '40px', right: '40px' }} tooltip={texts.preview} onClick={handlePreview}>
                <Image height={24} width={24} className={styles.icons} src="/preview.svg" alt="preview-action" />
              </ButtonFloat>
            )}
          </>
        )}
      </DndProvider>
      <Modal title={texts.save} open={isModalOpen} onClose={handleOnCloseModal}>
        <>
          {!loading && <FormSave onSave={handleOnSave} />}
          {loading && <Progress text={texts.savingLanding} />}
        </>
      </Modal>
    </>
  );
});
