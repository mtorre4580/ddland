import React from 'react';
import Image from 'next/image';
import styles from './whatsapp.module.scss';

interface WhatsappProps {
  phone: string;
}

export default React.memo(function WhatsappWrapper({ phone }: WhatsappProps) {
  return (
    <a className={styles.whatsapp} href={`https://api.whatsapp.com/send?phone=${phone}`}>
      <Image width={52} height={52} src="/whatsapp.svg" alt="Contact me in Whatsapp" />
    </a>
  );
});
