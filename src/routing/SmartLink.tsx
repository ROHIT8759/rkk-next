import Link, { LinkProps } from "next/link";
import React, { AnchorHTMLAttributes, useCallback } from "react";
import { prefetchRoute, isFastConnection } from "./prefetch";

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export type SmartLinkProps = LinkProps &
  AnchorProps & {
    /** Enable intelligent prefetching */
    prefetchOnHover?: boolean;

    /** Delay before prefetch (ms) */
    prefetchDelay?: number;

    /** Disable prefetch completely */
    disablePrefetch?: boolean;
  };

/**
 * SmartLink
 * SEO-safe, accessibility-friendly, and performance-optimized
 */
export const SmartLink: React.FC<SmartLinkProps> = ({
  href,
  children,
  prefetchOnHover = true,
  prefetchDelay = 150,
  disablePrefetch = false,
  onMouseEnter,
  ...props
}) => {
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      onMouseEnter?.(e);

      if (disablePrefetch || !prefetchOnHover) return;

      if (typeof href === "string" && isFastConnection()) {
        prefetchRoute(href, {
          delay: prefetchDelay,
        });
      }
    },
    [href, disablePrefetch, prefetchOnHover, prefetchDelay, onMouseEnter]
  );

  return (
    <Link href={href} passHref legacyBehavior>
      <a {...props} onMouseEnter={handleMouseEnter}>
        {children}
      </a>
    </Link>
  );
};

export default SmartLink;
