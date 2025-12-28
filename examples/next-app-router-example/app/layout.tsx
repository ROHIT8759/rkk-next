import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { observeRoutes } from 'rkk-next';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    default: 'rkk-next Example - Next.js App Router',
    template: '%s | rkk-next Example',
  },
  description: 'Production-ready Next.js App Router example with rkk-next SDK integration',
  keywords: ['Next.js', 'React', 'TypeScript', 'SEO', 'Performance', 'rkk-next'],
  authors: [{ name: 'Rohit Kumar Kundu' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://example.com',
    title: 'rkk-next Example',
    description: 'Production-ready Next.js App Router example',
    siteName: 'rkk-next Example',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'rkk-next Example',
    description: 'Production-ready Next.js App Router example',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        
        {/* Route observation for analytics */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                // Initialize route observer
                const observer = ${observeRoutes.toString()}((event) => {
                  console.log('Route changed:', event);
                  // Send to analytics
                  if (window.gtag) {
                    window.gtag('event', 'page_view', {
                      page_path: event.to,
                    });
                  }
                });
                
                // Cleanup on unmount
                window.addEventListener('beforeunload', () => {
                  if (observer && observer.disconnect) {
                    observer.disconnect();
                  }
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
