import React, { useContext } from 'react';
import { useReducer } from 'reinspect';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { changePasswordUser } from '../../services';
import { InitialState, Reducer, Actions } from '../../effects';
import Progress from '../../../shared/progress';
import i18n from './i18n';
import { I18nContext } from '../../../shared/i18n-provider';
import styles from './form-password.module.scss';

interface FormPasswordProps {
  email: string;
}

export default React.memo(function FormPassword({ email }: FormPasswordProps) {
  const [{ form, loading, error, updated }, dispatch] = useReducer(
    Reducer,
    InitialState,
    (basic) => basic,
    'PROFILE_PAGE',
  );
  const locale = useContext(I18nContext);
  const texts = i18n[locale];

  /**
   * Handler the onChange event for the Inputs
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch(Actions.changeInput({ [name]: value }));
  };

  /**
   * Handler the onSubmit event Form
   * @param {React.SyntheticEvent} event
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
    <>
      <h2 className={styles.title}>{texts.title}</h2>
      <Form className={styles.formPassword} onSubmit={handleOnSubmit}>
        <Form.Group controlId="formOldPassword">
          <Form.Label className={styles.label}>{texts.currentPassword}</Form.Label>
          <Form.Control
            type="password"
            name="oldPassword"
            required
            placeholder={texts.placeholderCurrentPassword}
            value={form.oldPassword}
            onChange={handleOnChange}
            autoComplete="old password"
          />
        </Form.Group>
        <Form.Group controlId="formNewPassword">
          <Form.Label className={styles.label}>{texts.newPassword}</Form.Label>
          <Form.Control
            type="password"
            name="newPassword"
            required
            placeholder={texts.placeholderNewPassword}
            value={form.newPassword}
            onChange={handleOnChange}
            autoComplete="new password"
          />
        </Form.Group>
        {updated && <p>{texts.updatedPassword}</p>}
        {!loading && (
          <Button variant="outline-light" type="submit">
            <span>{texts.modify}</span>
          </Button>
        )}
        {loading && <Progress text={texts.updatingPassword} />}
        <Alert className={styles.errorText} show={error !== null} variant="danger">
          {error}
        </Alert>
      </Form>
    </>
  );
});
