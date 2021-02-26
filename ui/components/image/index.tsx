import React from 'react';
import Image from 'react-bootstrap/Image';

interface ImageProps {
  src: string;
  rounded?: boolean;
  roundedCircle?: boolean;
  thumbnail?: boolean;
}

export default React.memo(function ImageWrapper(props: ImageProps) {
  return <Image fluid thumbnail {...props} />;
});
