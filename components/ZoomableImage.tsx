'use client';

import type React from 'react';

import {cn} from '@/lib/utils';
import Image from 'next/image';
import {useRef, useState} from 'react';

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ZoomableImage({src, alt, className}: ZoomableImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current || !isZoomed) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({x, y});
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  return (
    <div
      ref={imageRef}
      className={cn('relative overflow-hidden cursor-zoom-in', className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <Image
        src={src || '/placeholder.svg'}
        alt={alt}
        width={600}
        height={600}
        className={cn(
          'w-full h-full object-cover transition-transform duration-300 ease-out',
          isZoomed ? 'scale-150' : 'scale-100'
        )}
        style={
          isZoomed
            ? {
                transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
              }
            : {}
        }
      />

      {isZoomed && <div className="absolute inset-0 bg-black/10 pointer-events-none" />}
    </div>
  );
}
