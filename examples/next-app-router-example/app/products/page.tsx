import type { Metadata } from 'next';
import { generateAppMetadata } from 'rkk-next';
import Navigation from '@/components/Navigation';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = generateAppMetadata({
    title: 'Products',
    description: 'Browse our collection of high-quality electronics and accessories',
    keywords: 'electronics, gadgets, tech products, online shopping',
    path: '/products',
    image: 'https://example.com/products-og.jpg',
});

const allProducts = [
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
        description: 'Ergonomic aluminum laptop stand',
        price: 89,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
    },
    {
        id: 4,
        name: 'Mechanical Keyboard',
        description: 'RGB mechanical keyboard with blue switches',
        price: 149,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
    },
    {
        id: 5,
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with precision tracking',
        price: 69,
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
    },
    {
        id: 6,
        name: 'USB-C Hub',
        description: '7-in-1 USB-C hub with HDMI and SD card reader',
        price: 79,
        image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500',
    },
];

export default function ProductsPage() {
    return (
        <>
            <header className="header">
                <div className="container">
                    <Navigation />
                </div>
            </header>

            <main className="container" style={{ padding: '40px 20px' }}>
                <h1 style={{ fontSize: '36px', marginBottom: '12px' }}>
                    Our Products
                </h1>
                <p style={{ color: '#666', marginBottom: '40px', fontSize: '18px' }}>
                    Discover our curated collection of premium tech products
                </p>

                <div className="grid">
                    {allProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </main>
        </>
    );
}
