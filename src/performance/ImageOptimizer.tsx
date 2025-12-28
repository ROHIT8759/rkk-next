import Image, { ImageProps } from "next/image";
import React from "react";

export type OptimizedImageProps = ImageProps & {
  /** Override default quality (1–100) */
  quality?: number;

  /** Enable priority loading (LCP images) */
  priority?: boolean;

  /** Fallback alt text (SEO safety) */
  alt: string;
};

/**
 * OptimizedImage
 * SEO-first wrapper around next/image
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  quality = 80,
  priority = false,
  alt,
  ...props
}) => {
  if (!alt) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[next-optimize-sdk] OptimizedImage requires alt text for SEO"
      );
    }
  }

  return (
    <Image
      {...props}
      alt={alt}
      quality={quality}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      sizes={
        props.sizes ||
        "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      }
      placeholder={props.placeholder || "empty"}
    />
  );
};

export default OptimizedImage;
