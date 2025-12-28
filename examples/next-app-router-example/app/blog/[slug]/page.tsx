import type { Metadata } from 'next';
import { JsonLd } from 'rkk-next';
import Navigation from '@/components/Navigation';

type Props = {
    params: { slug: string };
};

// Mock blog posts
const blogPosts: Record<string, any> = {
    'getting-started-nextjs': {
        title: 'Getting Started with Next.js 14',
        description: 'Learn the basics of Next.js 14 and App Router',
        content: 'Next.js 14 introduces powerful features...',
        author: 'John Doe',
        publishedDate: '2025-01-15',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    },
    'seo-best-practices': {
        title: 'SEO Best Practices for Modern Web Apps',
        description: 'Essential SEO techniques for 2025',
        content: 'Search engine optimization has evolved...',
        author: 'Jane Smith',
        publishedDate: '2025-01-20',
        image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c8e4?w=800',
    },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = blogPosts[params.slug];

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: post.title,
        description: post.description,
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            publishedTime: post.publishedDate,
            authors: [post.author],
            images: [post.image],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description,
            images: [post.image],
        },
    };
}

export function generateStaticParams() {
    return Object.keys(blogPosts).map((slug) => ({
        slug,
    }));
}

export default function BlogPost({ params }: Props) {
    const post = blogPosts[params.slug];

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <>
            {/* Article Structured Data */}
            <JsonLd
                type="Article"
                data={{
                    headline: post.title,
                    description: post.description,
                    author: {
                        '@type': 'Person',
                        name: post.author,
                    },
                    datePublished: post.publishedDate,
                    image: post.image,
                }}
            />

            <header className="header">
                <div className="container">
                    <Navigation />
                </div>
            </header>

            <article className="container" style={{ padding: '60px 20px', maxWidth: '800px' }}>
                <header style={{ marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '48px', marginBottom: '16px', lineHeight: 1.2 }}>
                        {post.title}
                    </h1>
                    <div style={{ color: '#666', fontSize: '16px' }}>
                        <span>By {post.author}</span>
                        <span style={{ margin: '0 12px' }}>•</span>
                        <time>{new Date(post.publishedDate).toLocaleDateString()}</time>
                    </div>
                </header>

                <img
                    src={post.image}
                    alt={post.title}
                    style={{
                        width: '100%',
                        height: '400px',
                        objectFit: 'cover',
                        borderRadius: '12px',
                        marginBottom: '40px',
                    }}
                />

                <div style={{ fontSize: '18px', lineHeight: 1.8, color: '#333' }}>
                    <p>{post.content}</p>
                    <p style={{ marginTop: '20px' }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                    </p>
                    <p style={{ marginTop: '20px' }}>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </article>
        </>
    );
}
