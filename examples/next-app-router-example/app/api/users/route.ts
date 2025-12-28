import { NextRequest, NextResponse } from 'next/server';
import {
  composeMiddleware,
  cors,
  rateLimit,
  validateRequest,
  logger,
  errorHandler,
  jsonResponse,
} from 'rkk-next';

// Mock user database
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
];

// GET /api/users - List all users
export const GET = composeMiddleware(
  cors({ origin: '*', methods: ['GET'] }),
  rateLimit({ maxRequests: 100, windowMs: 60000 }),
  logger(),
  errorHandler()
)(async (req: NextRequest) => {
  // Simulate database query
  await new Promise((resolve) => setTimeout(resolve, 100));

  return jsonResponse(NextResponse, {
    success: true,
    data: users,
    meta: {
      total: users.length,
      page: 1,
    },
  });
});

// POST /api/users - Create new user
export const POST = composeMiddleware(
  cors({ origin: '*', methods: ['POST'] }),
  rateLimit({ maxRequests: 20, windowMs: 60000 }),
  validateRequest((req) => {
    const contentType = req.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return 'Content-Type must be application/json';
    }
  }),
  logger(),
  errorHandler()
)(async (req: NextRequest) => {
  const body = await req.json();

  // Validation
  if (!body.name || !body.email) {
    return jsonResponse(
      NextResponse,
      {
        success: false,
        error: 'Name and email are required',
      },
      { status: 400 }
    );
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) {
    return jsonResponse(
      NextResponse,
      {
        success: false,
        error: 'Invalid email format',
      },
      { status: 400 }
    );
  }

  // Create user
  const newUser = {
    id: users.length + 1,
    name: body.name,
    email: body.email,
  };

  users.push(newUser);

  return jsonResponse(
    NextResponse,
    {
      success: true,
      data: newUser,
      message: 'User created successfully',
    },
    { status: 201 }
  );
});
