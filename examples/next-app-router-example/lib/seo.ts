import { defaultSEO } from 'rkk-next';

export const siteConfig = {
  name: 'rkk-next Example',
  description: 'Production-ready Next.js App Router with rkk-next SDK',
  url: 'https://example.com',
  ogImage: 'https://example.com/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/example',
    github: 'https://github.com/ROHIT8759/rkk-next',
  },
};

export const defaultMetadata = {
  ...defaultSEO,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Next.js',
    'React',
    'TypeScript',
    'SEO',
    'Performance',
    'rkk-next',
    'App Router',
    'Server Components',
  ],
  authors: [{ name: 'Rohit Kumar Kundu' }],
  creator: 'Rohit Kumar Kundu',
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@example',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
