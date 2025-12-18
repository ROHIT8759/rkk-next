import { OptimizedImage, JsonLd } from "rkk-next";
import Link from "next/link";

export const metadata = {
    title: "Home | My App",
    description: "Welcome to our Next.js app powered by rkk-next SDK",
    openGraph: {
        title: "Home | My App",
        description: "SEO-optimized Next.js application",
        images: ["/og-home.png"],
    },
};

export default function HomePage() {
    return (
        <>
            {/* JSON-LD for rich results */}
            <JsonLd
                type="WebSite"
                data={{
                    name: "My Awesome App",
                    url: "https://myapp.com",
                    description: "A blazing fast Next.js application",
                }}
            />

            <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
                <h1>Welcome to rkk-next (App Router)</h1>
                <p>SEO-optimized Next.js with App Router support</p>

                {/* Optimized Image */}
                <OptimizedImage
                    src="/hero.jpg"
                    alt="Hero banner showcasing our app"
                    width={1200}
                    height={630}
                    priority
                />

                <Link href="/blog/getting-started">Read Our Blog</Link>
            </main>
        </>
    );
}
