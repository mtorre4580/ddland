import React from 'react';
import Image from 'react-bootstrap/Image';
import styles from './image.module.scss';

interface ImageProps {
  src: string;
  rounded?: boolean;
  roundedCircle?: boolean;
  thumbnail?: boolean;
}

export default React.memo(function ImageWrapper(props: ImageProps) {
  return <Image className={styles.image} fluid thumbnail {...props} />;
});
