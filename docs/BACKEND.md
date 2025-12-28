# Backend Utilities Guide

Complete backend utilities for Next.js API routes with Express-like middleware support.

## Table of Contents

- [Middleware](#middleware)
- [Caching](#caching)
- [Optimization](#optimization)
- [Examples](#examples)

---

## Middleware

Express-style middleware for Next.js API routes.

### Compose Middleware

Combine multiple middleware functions:

```typescript
import { composeMiddleware, cors, rateLimit, logger } from "rkk-next";

export default composeMiddleware(
  cors(),
  rateLimit({ max: 100 }),
  logger()
)(async (req, res) => {
  res.json({ message: "Hello World" });
});
```

### CORS

Cross-Origin Resource Sharing middleware:

```typescript
import { cors } from "rkk-next";

// Allow all origins
const handler = composeMiddleware(cors())(myHandler);

// Specific origins
const handler = composeMiddleware(
  cors({
    origin: ["https://example.com", "https://app.example.com"],
    methods: ["GET", "POST"],
    credentials: true,
  })
)(myHandler);
```

### Rate Limiting

Protect your API from abuse:

```typescript
import { rateLimit } from "rkk-next";

const handler = composeMiddleware(
  rateLimit({
    windowMs: 60000, // 1 minute
    max: 60, // 60 requests per minute
    message: "Too many requests",
  })
)(myHandler);
```

### Request Validation

Validate incoming requests:

```typescript
import { validateRequest } from "rkk-next";

const handler = composeMiddleware(
  validateRequest({
    body: (data) => {
      return (
        typeof data.email === "string" && typeof data.password === "string"
      );
    },
  })
)(myHandler);
```

### Logger

Log API requests:

```typescript
import { logger } from "rkk-next";

const handler = composeMiddleware(
  logger({
    verbose: true,
    includeBody: true,
  })
)(myHandler);
```

### Error Handler

Catch and handle errors:

```typescript
import { errorHandler } from "rkk-next";

const handler = composeMiddleware(errorHandler())(myHandler);
```

---

## Caching

Server-side caching for API responses.

### Cache Response

Automatically cache GET requests:

```typescript
import { cacheResponse } from "rkk-next";

export default composeMiddleware(
  cacheResponse({
    ttl: 300, // 5 minutes
    shouldCache: (req) => req.method === "GET",
  })
)(async (req, res) => {
  const data = await fetchData();
  res.json(data);
});
```

### Manual Cache Control

```typescript
import { cache } from "rkk-next";

// Store data
cache.set("user:123", userData, 3600); // 1 hour TTL

// Retrieve data
const user = cache.get("user:123");

// Check existence
if (cache.has("user:123")) {
  // ...
}

// Delete
cache.delete("user:123");

// Clear all
cache.clear();
```

### Memoization

Cache function results:

```typescript
import { memoize } from "rkk-next";

const expensiveFunction = memoize(
  async (userId: string) => {
    return await database.getUser(userId);
  },
  { ttl: 300 } // 5 minutes
);

// First call - executes function
const user1 = await expensiveFunction("123");

// Second call - returns cached result
const user2 = await expensiveFunction("123");
```

### Cache Invalidation

```typescript
import { invalidateCache } from "rkk-next";

// Clear all cache
invalidateCache();

// Clear by pattern
invalidateCache("user:*");
```

---

## Optimization

Performance optimization utilities.

### Compression

Compress responses:

```typescript
import { compress } from "rkk-next";

export default composeMiddleware(
  compress({ threshold: 1024 }) // Compress if > 1KB
)(myHandler);
```

### Response Time

Track response times:

```typescript
import { responseTime } from "rkk-next";

export default composeMiddleware(responseTime())(myHandler);
// Adds X-Response-Time header
```

### Pagination

Paginate large datasets:

```typescript
import { paginate, getPaginationParams } from "rkk-next";

export default async function handler(req, res) {
  const allData = await database.getAllItems();
  const params = getPaginationParams(req);

  const result = paginate(allData, params);

  res.json(result);
}
```

Response format:

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### JSON Response Helper

Consistent response format:

```typescript
import { jsonResponse } from "rkk-next";

export default async function handler(req, res) {
  try {
    const data = await fetchData();
    return jsonResponse(res, {
      data,
      message: "Success",
    });
  } catch (error) {
    return jsonResponse(res, {
      status: 500,
      error: "Internal error",
    });
  }
}
```

### Format Response

Auto-format all responses:

```typescript
import { formatResponse } from 'rkk-next';

export default composeMiddleware(
  formatResponse()
)(myHandler);

// All responses will be formatted:
{
  "success": true,
  "statusCode": 200,
  "data": {...},
  "timestamp": "2025-12-28T12:00:00.000Z"
}
```

### Timeout

Prevent long-running requests:

```typescript
import { timeout } from "rkk-next";

export default composeMiddleware(
  timeout(5000) // 5 seconds
)(myHandler);
```

### Body Size Limit

Limit request body size:

```typescript
import { bodyLimit } from "rkk-next";

export default composeMiddleware(
  bodyLimit(1024 * 1024) // 1MB
)(myHandler);
```

### Method Filter

Only allow specific HTTP methods:

```typescript
import { allowMethods } from "rkk-next";

export default composeMiddleware(allowMethods(["GET", "POST"]))(myHandler);
```

---

## Examples

### Complete API Route

```typescript
// pages/api/users/[id].ts
import {
  composeMiddleware,
  cors,
  rateLimit,
  logger,
  errorHandler,
  cacheResponse,
  jsonResponse,
  allowMethods,
} from "rkk-next";

async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const user = await database.getUser(id);
    return jsonResponse(res, { data: user });
  }

  if (req.method === "PUT") {
    const updated = await database.updateUser(id, req.body);
    return jsonResponse(res, { data: updated });
  }
}

export default composeMiddleware(
  errorHandler(),
  cors({ origin: ["https://example.com"] }),
  rateLimit({ max: 100, windowMs: 60000 }),
  logger({ verbose: process.env.NODE_ENV === "development" }),
  allowMethods(["GET", "PUT"]),
  cacheResponse({ ttl: 60 })
)(handler);
```

### Protected Route

```typescript
import { composeMiddleware, validateRequest } from "rkk-next";

function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  // Verify token
  const user = verifyToken(token);
  if (!user) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }

  req.user = user;
  next();
}

export default composeMiddleware(
  authMiddleware,
  validateRequest({
    body: (data) => typeof data.message === "string",
  })
)(async (req, res) => {
  // req.user is available here
  const result = await createMessage(req.user.id, req.body.message);
  res.json(result);
});
```

### Cached Database Query

```typescript
import { memoize } from "rkk-next";

const getUserById = memoize(
  async (userId: string) => {
    return await database.users.findOne({ id: userId });
  },
  { ttl: 300 } // Cache for 5 minutes
);

export default async function handler(req, res) {
  const user = await getUserById(req.query.id);
  res.json(user);
}
```

### Paginated List

```typescript
import { paginate, getPaginationParams, jsonResponse } from "rkk-next";

export default async function handler(req, res) {
  const allUsers = await database.users.findAll();
  const params = getPaginationParams(req);

  const result = paginate(allUsers, params);

  return jsonResponse(res, {
    data: result.data,
    meta: result.pagination,
  });
}
```

---

## TypeScript Support

All utilities are fully typed:

```typescript
import type { Middleware, NextApiHandler } from "rkk-next";

const customMiddleware: Middleware = (req, res, next) => {
  // Your logic
  next();
};

const handler: NextApiHandler = async (req, res) => {
  res.json({ message: "Hello" });
};
```

---

## Best Practices

1. **Order matters**: Place error handler first, CORS second
2. **Rate limiting**: Adjust based on your API needs
3. **Caching**: Only cache GET requests, set appropriate TTL
4. **Validation**: Always validate user input
5. **Logging**: Use verbose mode only in development
6. **Compression**: Enable for responses > 1KB
7. **Pagination**: Set reasonable default limits (10-50)

---

## Performance Tips

- Use caching for expensive operations
- Enable compression for large responses
- Set appropriate rate limits
- Use pagination for large datasets
- Monitor response times with responseTime middleware
- Use memoization for pure functions

---

## Testing

All backend utilities include comprehensive tests. See `__tests__/backend/` for examples.

```bash
npm test backend
```
