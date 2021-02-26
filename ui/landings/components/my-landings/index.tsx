import React, { useReducer } from 'react';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Table from '../table';
import Modal from '../../../shared/modal';
import Progress from '../../../shared/progress';
import ILanding from '../../../../repository/models/web/landing';
import { removeLanding } from '../../services';
import { InitialState, Reducer, Actions } from '../../effects';
import styles from './my-landings.module.scss';

interface MyLandingsProps {
  items: ILanding[];
}

export default React.memo(function MyLandings({ items = [] }: MyLandingsProps) {
  const [{ landings, error, loading, showModal, landingSelected }, dispatch] = useReducer(Reducer, {
    ...InitialState,
    landings: items,
  });

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
      dispatch(Actions.deleteError('Se produjo un error al eliminar la landing elegida'));
    }
  };

  return (
    <>
      <Jumbotron fluid className={styles.presentation}>
        <Container>
          <h1>Mis landings</h1>
          <p>En esta sección podras encontrar todas tus landings, para que puedas visualizarlas y editarlas</p>
        </Container>
      </Jumbotron>
      <Alert className={styles.errorText} show={error !== null} variant="danger">
        {error}
      </Alert>
      {landings.length > 0 && <Table landings={landings} onRemove={handleOnRemove} />}
      {landings.length === 0 && (
        <div className={styles.container}>
          <Image className={styles.startImage} src="/start.svg" alt="Let's start to create landings" />
          <p className={styles.emptyLandings}>Todavía no creaste ninguna landing ¿Qué esperas?</p>
          <Button variant="link" href="/dashboard">
            Ir al dashboard
          </Button>
        </div>
      )}
      <Modal title="Eliminar" active={showModal} onClose={handleOnCloseModal}>
        <>
          {!loading && (
            <>
              <p>Una vez eliminada no podrás acceder a la landing, como tampoco a su edición</p>
              <p className="text-center">¿Estas seguro de eliminar la landing seleccionada?</p>
              <div className={styles.modalActions}>
                <Button className={styles.btn} variant="outline-light" onClick={handleOnCloseModal}>
                  Cancelar
                </Button>
                <Button className={styles.btn} variant="outline-light" onClick={handleOnConfirmRemove}>
                  Aceptar
                </Button>
              </div>
            </>
          )}
          {loading && <Progress text="Eliminando la landing, espere unos segundos" />}
        </>
      </Modal>
    </>
  );
});
