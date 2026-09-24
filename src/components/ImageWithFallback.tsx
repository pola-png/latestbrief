'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = '/images/tech_ai_cover.jpg',
  ...rest
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  return (
    <Image
      {...rest}
      src={hasError ? fallbackSrc : imgSrc}
      alt={alt}
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}
