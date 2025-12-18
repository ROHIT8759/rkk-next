import { MetaManager, JsonLd, SmartLink, OptimizedImage } from "rkk-next";

export default function Home() {
    return (
        <>
            {/* SEO Meta Tags */}
            <MetaManager
                title="Home"
                description="Welcome to our Next.js app powered by rkk-next SDK"
                keywords="Next.js, SEO, Performance, React"
                image="/og-home.png"
                siteName="My Awesome App"
                twitterHandle="yourusername"
            />

            {/* JSON-LD Schema */}
            <JsonLd
                type="WebSite"
                data={{
                    name: "My Awesome App",
                    url: "https://myapp.com",
                    description: "A blazing fast Next.js application",
                }}
            />

            <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
                <h1>Welcome to rkk-next</h1>
                <p>SEO-optimized, performant Next.js SDK</p>

                {/* Optimized Image */}
                <OptimizedImage
                    src="/hero.jpg"
                    alt="Hero banner showcasing our app"
                    width={1200}
                    height={630}
                    priority
                />

                {/* Smart Link with prefetching */}
                <SmartLink href="/about" prefetchOnHover>
                    Learn More About Us
                </SmartLink>
            </main>
        </>
    );
}
