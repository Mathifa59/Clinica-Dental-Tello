'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './CaseCarousel.module.css';

type CaseCarouselProps = {
  images: string[];
  alt: string;
};

export default function CaseCarousel({ images, alt }: CaseCarouselProps) {
  const [index, setIndex] = useState(0);
  const multi = images.length > 1;

  const go = (next: number) => setIndex((next + images.length) % images.length);

  return (
    <div className={styles.carousel}>
      <div className={styles.viewport}>
        {images.map((src, i) => (
          <div key={src} className={`${styles.slide} ${i === index ? styles.active : ''}`}>
            <Image
              src={src}
              alt={`${alt} — ${i + 1}/${images.length}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>

      {multi && (
        <>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowPrev}`}
            onClick={() => go(index - 1)}
            aria-label="Foto anterior"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowNext}`}
            onClick={() => go(index + 1)}
            aria-label="Foto siguiente"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
          <div className={styles.dots}>
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Ver foto ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
