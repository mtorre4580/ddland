import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Progress from '../../../shared/progress';
import { uploadImage } from '../../services';
import styles from './input-image.module.scss';

interface InputImageProps {
  texts: { [key: string]: string };
  value: string;
  name: string;
  onChange: any;
}

export default React.memo(function InputImage({ name, value, onChange, texts }: InputImageProps) {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(value);
  const [error, setError] = useState('');

  // Effect to update the current url when the value change
  useEffect(() => {
    setUrl(value);
  }, [value]);

  /**
   * Handler to upload the image when the file is change
   * @param event Evet
   */
  const handleOnChangeFile = async (event: any) => {
    try {
      const [fileSelected] = event.target.files;
      if (isValid(fileSelected.type)) {
        setError('');
        setLoading(true);
        const {
          data: { secure_url },
        } = await uploadImage(fileSelected);
        setLoading(false);
        setUrl(secure_url);
        const currentValue = {
          target: {
            name,
            value: secure_url,
          },
        };
        onChange(currentValue);
      } else {
        setError(texts.invalidFormat);
      }
    } catch (err) {
      setLoading(true);
      setError(err);
      setUrl('https://via.placeholder.com/150mage');
    }
  };

  /**
   * Validate the format type of the file
   * @param format string
   * @return boolean
   */
  const isValid = (format: string) => {
    const regex = /.(gif|jpe?g|bmp|png|webp)$/;
    return regex.test(format);
  };

  return (
    <Form.Group className={styles.formGroup} controlId={name}>
      <Form.Label className={styles.label}>{name}</Form.Label>
      <Form.Control className={styles.input} type="text" name={name} value={url} onChange={onChange} />
      {!loading && (
        <Form.File accept=".gif,.jpeg,.bmp,.png,.webp" label={texts.upload} custom onChange={handleOnChangeFile} />
      )}
      {loading && <Progress text={texts.loadingUpload} />}
      {error && <p className={styles.error}>{error}</p>}
    </Form.Group>
  );
});
