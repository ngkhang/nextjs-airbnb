import Image from 'next/image';
import type { ImageProps as NextImageProps } from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Generate base64-encoded SVG placeholders
 *
 * @param {string} color - Hex color
 */
export const getPlaceholderBase64 = (color: string): string => {
  const svg = `
    <svg width="100%" height="100%" viewBox="0 0 1 1" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1" height="1" fill="${color}" />
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

export interface Props extends Omit<NextImageProps, 'src' | 'priority'> {
  src: string;
  alt: string;
  colorBlur?: string;
  type?: 'responsive' | 'background';
}

const ImageContainer = (props: Props) => {
  const { src, alt, type = 'responsive', colorBlur = '#e0e0e0', className, ...options } = props;

  return (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      fill={type === 'background'}
      loading='lazy'
      sizes='100vw'
      className={cn(type === 'background' ? 'object-cover' : 'h-auto w-full', className)}
      placeholder='blur'
      blurDataURL={getPlaceholderBase64(colorBlur)}
      {...options}
    />
  );
};

export default ImageContainer;
