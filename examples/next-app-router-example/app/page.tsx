import { JsonLd } from 'rkk-next';
import Navigation from '@/components/Navigation';
import ProductCard from '@/components/ProductCard';

const products = [
    {
        id: 1,
        name: 'Premium Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 299,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    },
    {
        id: 2,
        name: 'Smart Watch',
        description: 'Feature-rich smartwatch with health tracking',
        price: 399,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    },
    {
        id: 3,
        name: 'Laptop Stand',
        description: 'Ergonomic aluminum laptop stand for better posture',
        price: 89,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
    },
];

export default function Home() {
    return (
        <>
            {/* Structured Data for Homepage */}
            <JsonLd
                type="Organization"
                data={{
                    name: 'rkk-next Example Store',
                    description: 'Your trusted online electronics store',
                    url: 'https://example.com',
                    logo: 'https://example.com/logo.png',
                    sameAs: [
                        'https://twitter.com/example',
                        'https://facebook.com/example',
                    ],
                }}
            />

            <header className="header">
                <div className="container">
                    <Navigation />
                </div>
            </header>

            <main>
                <section className="hero">
                    <div className="container">
                        <h1>Welcome to rkk-next Example</h1>
                        <p>
                            Production-ready Next.js App Router with SEO, Performance & Backend utilities
                        </p>
                    </div>
                </section>

                <section className="container">
                    <h2 style={{ padding: '40px 0 20px', fontSize: '32px' }}>
                        Featured Products
                    </h2>
                    <div className="grid">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}
