import React, { useReducer } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { changePasswordUser } from '../../services';
import { InitialState, Reducer, Actions } from '../../effects';
import Progress from '../../../shared/progress';
import styles from './form-password.module.scss';

interface FormPasswordProps {
  email: string;
}

export default React.memo(function FormPassword({ email }: FormPasswordProps) {
  const [{ form, loading, error, updated }, dispatch] = useReducer(Reducer, InitialState);

  /**
   * Handler the onChange event for the Inputs
   * @param event
   */
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch(Actions.changeInput({ [name]: value }));
  };

  /**
   * Handler the onSubmit event Form
   * @param event
   */
  const handleOnSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      dispatch(Actions.changePassword());
      await changePasswordUser(form, email);
      dispatch(Actions.changePasswordSuccess());
    } catch (err) {
      const {
        data: { msg },
      } = err.response;
      dispatch(Actions.changePasswordError(msg));
    }
  };

  return (
    <Form className={styles.formPassword} onSubmit={handleOnSubmit}>
      <Form.Group controlId="formOldPassword">
        <Form.Label>Contraseña Actual</Form.Label>
        <Form.Control
          type="password"
          name="oldPassword"
          placeholder="Ingresá tu contraseña actual"
          value={form.oldPassword}
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group controlId="formNewPassword">
        <Form.Label>Nueva Contraseña</Form.Label>
        <Form.Control
          type="password"
          name="newPassword"
          placeholder="Ingresá tu nueva contraseña"
          value={form.newPassword}
          onChange={handleOnChange}
        />
      </Form.Group>
      {updated && <p>Contraseña actualizada!</p>}
      {!loading && (
        <Button variant="link" type="submit">
          <span>Modificar</span>
        </Button>
      )}
      {loading && <Progress text="Actualizando contraseña" />}
      <Alert className={styles.errorText} show={error !== null} variant="danger">
        {error}
      </Alert>
    </Form>
  );
});
