'use client';

import { SmartLink } from 'rkk-next';

export default function Navigation() {
    return (
        <nav className="nav">
            <SmartLink href="/" prefetch>
                <strong style={{ fontSize: '20px' }}>🚀 rkk-next</strong>
            </SmartLink>

            <SmartLink href="/" prefetch>
                Home
            </SmartLink>

            <SmartLink href="/products" prefetch>
                Products
            </SmartLink>

            <SmartLink href="/blog/getting-started-nextjs" prefetch>
                Blog
            </SmartLink>

            <a
                href="https://github.com/ROHIT8759/rkk-next"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: 'auto' }}
            >
                GitHub →
            </a>
        </nav>
    );
}
