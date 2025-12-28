import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

export type MetaManagerProps = {
  /** Page title */
  title: string;

  /** Meta description (important for SEO) */
  description: string;

  /** Optional keywords */
  keywords?: string;

  /** Canonical URL (auto-generated if not provided) */
  canonicalUrl?: string;

  /** Open Graph image URL */
  image?: string;

  /** Open Graph type */
  type?: "website" | "article";

  /** Robots meta */
  noIndex?: boolean;

  /** Site name for Open Graph */
  siteName?: string;

  /** Author name */
  author?: string;

  /** Twitter username (without @) */
  twitterHandle?: string;
};

export const MetaManager: React.FC<MetaManagerProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  image,
  type = "website",
  noIndex = false,
  siteName = "My Website",
  author,
  twitterHandle,
}) => {
  const router = useRouter();

  // Auto canonical URL fallback
  const canonical =
    canonicalUrl ||
    (typeof window !== "undefined"
      ? `${window.location.origin}${router.asPath}`
      : "");

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}

      {/* Robots */}
      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />

      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      {canonical && <meta property="og:url" content={canonical} />}
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {twitterHandle && (
        <meta name="twitter:site" content={`@${twitterHandle}`} />
      )}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
    </Head>
  );
};

export default MetaManager;
