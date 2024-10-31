import React, { useEffect, useRef } from 'react';

interface SpriteNodeProps {
  x: number;
  y: number;
  spritePath: string;
  size: number;
  isSelected: boolean;
}

export const SpriteNode: React.FC<SpriteNodeProps> = ({
  x,
  y,
  spritePath,
  size,
  isSelected,
}) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imageRef.current;
    if (img) {
      img.style.transform = `translate(${x - size / 2}px, ${y - size / 2}px)`;
    }
  }, [x, y, size]);

  return (
    <image
      ref={imageRef}
      href={spritePath}
      width={size}
      height={size}
      className={`transition-all duration-200 ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      }`}
      style={{
        clipPath: 'circle(50%)',
      }}
    />
  );
};