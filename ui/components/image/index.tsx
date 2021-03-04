import React from 'react';
import Image from 'react-bootstrap/Image';
import styles from './image.module.scss';

interface ImageProps {
  src: string;
}

export default React.memo(function ImageWrapper({ src }: ImageProps) {
  return <Image className={styles.image} fluid thumbnail src={src} alt={`image from ${src}`} />;
});
