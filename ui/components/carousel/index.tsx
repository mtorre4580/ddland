import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Item } from '../items';
import styles from './carousel.module.scss';

interface CarouselProps {
  items: Item[];
}

export default React.memo(function CarouselWrapper({ items }: CarouselProps) {
  const [index, setIndex] = useState(0);

  /**
   * Handler to check the current slide
   * @param {number} selectedIndex
   */
  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <div className={styles.carousel}>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {items.map((item: Item, index: number) => {
          return (
            <Carousel.Item key={index}>
              <img className={styles.image} src={item.src} alt={item.title} />
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
