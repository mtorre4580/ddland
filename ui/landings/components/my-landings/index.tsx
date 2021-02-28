import React, { useContext } from 'react';
import { useReducer } from 'reinspect';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Table from '../table';
import Modal from '../../../shared/modal';
import Progress from '../../../shared/progress';
import { I18nContext } from '../../../shared/i18n-provider';
import i18n from './i18n';
import ILanding from '../../../../repository/models/web/landing';
import { removeLanding } from '../../services';
import { InitialState, Reducer, Actions } from '../../effects';
import styles from './my-landings.module.scss';

interface MyLandingsProps {
  items: ILanding[];
}

export default React.memo(function MyLandings({ items = [] }: MyLandingsProps) {
  const [{ landings, error, loading, showModal, landingSelected }, dispatch] = useReducer(
    Reducer,
    {
      ...InitialState,
      landings: items,
    },
    (basic) => basic,
    'LANDINGS_PAGE',
  );
  const locale = useContext(I18nContext);
  // @ts-ignore
  const texts = i18n[locale];

  /**
   * Handler to show the user confirmation to proceed to delete the current landing
   * @param path string
   * @param index number
   */
  const handleOnRemove = (path: string, index: number) => dispatch(Actions.deleteIntention(path, index));

  /**
   * Handler to close the current modal
   */
  const handleOnCloseModal = () => dispatch(Actions.deleteIntentionCancel());

  /**
   * Handler to delete the current web selected if the user confirm
   * @param path string
   */
  const handleOnConfirmRemove = async () => {
    try {
      const { path, index } = landingSelected;
      dispatch(Actions.delete());
      await removeLanding(path);
      dispatch(Actions.deleteSuccess(index));
      dispatch(Actions.deleteIntentionConfirm());
    } catch (err) {
      dispatch(Actions.deleteError(texts.errorGeneric));
    }
  };

  return (
    <>
      <Jumbotron fluid className={styles.presentation}>
        <Container>
          <h1>{texts.title}</h1>
          <p>{texts.subtitle}</p>
        </Container>
      </Jumbotron>
      <Alert className={styles.errorText} show={error !== null} variant="danger">
        {error}
      </Alert>
      {landings.length > 0 && <Table landings={landings} onRemove={handleOnRemove} />}
      {landings.length === 0 && (
        <div className={styles.container}>
          <Image height={128} width={128} className={styles.startImage} src="/start.svg" alt="Let's start to create landings" />
          <p className={styles.emptyLandings}>{texts.emptyLandings}</p>
          <Button variant="link" href="/dashboard">
            {texts.goDashboard}
          </Button>
        </div>
      )}
      <Modal title={texts.delete} active={showModal} onClose={handleOnCloseModal}>
        <>
          {!loading && (
            <>
              <p>{texts.removeLanding}</p>
              <p className="text-center">{texts.confirmRemove}</p>
              <div className={styles.modalActions}>
                <Button className={styles.btn} variant="outline-light" onClick={handleOnCloseModal}>
                  {texts.cancel}
                </Button>
                <Button className={styles.btn} variant="outline-light" onClick={handleOnConfirmRemove}>
                  {texts.accept}
                </Button>
              </div>
            </>
          )}
          {loading && <Progress text={texts.deletingLanding} />}
        </>
      </Modal>
    </>
  );
});
