import React from 'react';

interface TitleProps {
  title: string;
  subtitle?: string;
}

export default React.memo(function TitleWrapper({ title, subtitle }: TitleProps) {
  return (
    <>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </>
  );
});
