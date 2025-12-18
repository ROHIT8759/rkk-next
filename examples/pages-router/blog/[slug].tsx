import { GetStaticProps, GetStaticPaths } from "next";
import { MetaManager, JsonLd } from "rkk-next";

type BlogPost = {
    title: string;
    content: string;
    slug: string;
    publishedAt: string;
    author: string;
    image: string;
};

export default function BlogPost({ post }: { post: BlogPost }) {
    return (
        <>
            {/* SEO optimized for article */}
            <MetaManager
                title={post.title}
                description={post.content.substring(0, 160)}
                type="article"
                image={post.image}
                author={post.author}
            />

            {/* Article Schema for rich results */}
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

export const getStaticPaths: GetStaticPaths = async () => {
    // Fetch your blog posts
    const posts = [
        { slug: "getting-started" },
        { slug: "advanced-seo" },
    ];

    return {
        paths: posts.map((p) => ({ params: { slug: p.slug } })),
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    // Fetch blog post by slug
    const post: BlogPost = {
        title: "How to Optimize Next.js for SEO",
        content: "<p>Learn the best practices for SEO in Next.js...</p>",
        slug: params?.slug as string,
        publishedAt: "2025-01-15",
        author: "Rohit Kumar Kundu",
        image: "/blog/seo-guide.png",
    };

    return {
        props: { post },
        revalidate: 3600, // ISR: revalidate every hour
    };
};
