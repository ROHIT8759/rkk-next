import { JsonLd } from "rkk-next";
import { Metadata } from "next";

type BlogPost = {
    title: string;
    content: string;
    slug: string;
    publishedAt: string;
    author: string;
    image: string;
};

// Dynamic metadata generation
export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const post = await getBlogPost(params.slug);

    return {
        title: post.title,
        description: post.content.substring(0, 160),
        openGraph: {
            title: post.title,
            description: post.content.substring(0, 160),
            images: [post.image],
            type: "article",
            publishedTime: post.publishedAt,
        },
    };
}

export default async function BlogPostPage({
    params,
}: {
    params: { slug: string };
}) {
    const post = await getBlogPost(params.slug);

    return (
        <>
            {/* Article Schema */}
            <JsonLd
                type="Article"
                data={{
                    headline: post.title,
                    image: post.image,
                    datePublished: post.publishedAt,
                    author: {
                        "@type": "Person",
                        name: post.author,
                    },
                }}
            />

            <article style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
                <h1>{post.title}</h1>
                <p style={{ color: "#666" }}>
                    By {post.author} • {new Date(post.publishedAt).toLocaleDateString()}
                </p>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
        </>
    );
}

async function getBlogPost(slug: string): Promise<BlogPost> {
    // Simulate fetching blog post
    return {
        title: "How to Optimize Next.js for SEO",
        content: "<p>Learn the best practices for SEO in Next.js...</p>",
        slug,
        publishedAt: "2025-01-15",
        author: "Rohit Kumar Kundu",
        image: "/blog/seo-guide.png",
    };
}

export async function generateStaticParams() {
    return [
        { slug: "getting-started" },
        { slug: "advanced-seo" },
    ];
}
