import { NextRequest, NextResponse } from 'next/server';
import {
  composeMiddleware,
  cors,
  rateLimit,
  logger,
  errorHandler,
  cacheResponse,
  jsonResponse,
  paginate,
  allowMethods,
} from 'rkk-next';

// Mock product database
const products = [
  { id: 1, name: 'Premium Headphones', price: 299, category: 'audio' },
  { id: 2, name: 'Smart Watch', price: 399, category: 'wearable' },
  { id: 3, name: 'Laptop Stand', price: 89, category: 'accessories' },
  { id: 4, name: 'Mechanical Keyboard', price: 149, category: 'peripherals' },
  { id: 5, name: 'Wireless Mouse', price: 69, category: 'peripherals' },
  { id: 6, name: 'USB-C Hub', price: 79, category: 'accessories' },
  { id: 7, name: 'Monitor Arm', price: 129, category: 'accessories' },
  { id: 8, name: 'Webcam HD', price: 89, category: 'peripherals' },
  { id: 9, name: 'Desk Lamp', price: 49, category: 'accessories' },
  { id: 10, name: 'Cable Management', price: 25, category: 'accessories' },
];

// GET /api/products - List products with pagination
export const GET = composeMiddleware(
  cors({ origin: '*', methods: ['GET'] }),
  rateLimit({ maxRequests: 200, windowMs: 60000 }),
  allowMethods(['GET']),
  cacheResponse({ ttl: 300 }), // Cache for 5 minutes
  logger(),
  errorHandler()
)(async (req: NextRequest) => {
  // Parse query parameters
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '5');
  const category = searchParams.get('category');

  // Filter by category if provided
  let filteredProducts = products;
  if (category) {
    filteredProducts = products.filter((p) => p.category === category);
  }

  // Apply pagination
  const paginatedData = paginate(filteredProducts, page, limit);

  return jsonResponse(NextResponse, {
    success: true,
    data: paginatedData.data,
    pagination: {
      page: paginatedData.page,
      limit: paginatedData.limit,
      total: paginatedData.total,
      totalPages: paginatedData.totalPages,
      hasNext: paginatedData.hasNext,
      hasPrev: paginatedData.hasPrev,
    },
  });
});
