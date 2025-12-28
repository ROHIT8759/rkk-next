'use client';

import { OptimizedImage, SmartLink } from 'rkk-next';

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
};

export default function ProductCard({ product }: { product: Product }) {
    return (
        <article className="card">
            <OptimizedImage
                src={product.image}
                alt={product.name}
                width={400}
                height={300}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="card-image"
                priority={false}
            />

            <div className="card-content">
                <h3 className="card-title">{product.name}</h3>
                <p className="card-description">{product.description}</p>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '16px'
                }}>
                    <span className="badge">${product.price}</span>
                    <SmartLink
                        href={`/products/${product.id}`}
                        prefetch
                        style={{
                            color: '#667eea',
                            fontWeight: 500,
                        }}
                    >
                        View Details →
                    </SmartLink>
                </div>
            </div>
        </article>
    );
}
