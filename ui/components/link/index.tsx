import React from 'react';
import Button from 'react-bootstrap/Button';

interface LinkProps {
  href: string;
  text: string;
}

export default React.memo(function LinkWrapper(props: LinkProps) {
  return <Button {...props}>{props.text}</Button>;
});
