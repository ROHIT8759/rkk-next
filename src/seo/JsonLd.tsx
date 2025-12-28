import Head from "next/head";
import React from "react";

export type JsonLdProps<T extends object> = {
  /** Schema.org type (e.g. WebSite, Article, Product, FAQPage) */
  type: string;

  /** Schema data object */
  data: T;

  /** Optional ID for deduplication */
  id?: string;
};

/**
 * Generic JSON-LD injector for Next.js
 * Safe for SSR, SEO-compliant, and reusable
 */
export function JsonLd<T extends object>({
  type,
  data,
  id,
}: JsonLdProps<T>) {
  if (!data) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return (
    <Head>
      <script
        id={id}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </Head>
  );
}

export default JsonLd;
