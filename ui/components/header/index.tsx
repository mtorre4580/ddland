import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

interface HeaderProps {
  title: string;
  subtitle: string;
}

export default React.memo(function HeaderWrapper({ title, subtitle }: HeaderProps) {
  return (
    <Jumbotron>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </Jumbotron>
  );
});
