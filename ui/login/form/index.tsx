import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'
import styles from './form.module.scss';

interface FormProps {
  redirect: string;
}

export default React.memo(({ redirect }: FormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;
  const router = useRouter();

  const handleOnChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOnSubmit = async (event: any) => {
    event.preventDefault();

    try {
      setHasError('');
      setIsLoading(true);
      const { status } = await axios.post('/api/login', {
        ...formData,
      });
      if (status === 200) {
        setHasError('');
        setIsLoading(false);
        router.push(redirect);
      }
    } catch (err) {
      const { status } = err.response;
      setIsLoading(false);
      if (status === 400) {
        setHasError('Datos inválidos');
      } else {
        setHasError('Error inesperado, intente en unos momentos');
      }
    }
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleOnSubmit}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input id="email" className={styles.input} type="email" name="email" onChange={handleOnChange} value={email} />
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          id="password"
          className={styles.input}
          type="password"
          name="password"
          onChange={handleOnChange}
          value={password}
        />
        <button className={styles.btn}>Acceder</button>
      </form>
      {isLoading && <p>carngao..</p>}
      {hasError && <p>{hasError}</p>}
    </div>
  );
});
