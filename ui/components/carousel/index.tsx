import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Item } from '../items';
import styles from './carousel.module.scss';

interface CarouselProps {
  items: Item[];
}

export default React.memo(function CarouselWrapper({ items }: CarouselProps) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <div className={styles.carousel}>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {items.map((item: Item, index: number) => {
          return (
            <Carousel.Item key={index}>
              <img className="d-block" style={{ width: '100%', height: '300px' }} src={item.src} alt={item.title} />
              <Carousel.Caption>
                <h3>{item.title}</h3>
                {item.subtitle && <p>{item.subtitle}</p>}
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
});
