#!/bin/bash
set -e

echo "🔐 Adding additional security headers..."

# -------------------------
# Create headers middleware
# -------------------------
mkdir -p src/security

cat <<EOF > src/security/headers.middleware.ts
import { Request, Response, NextFunction } from 'express'

export function securityHeaders(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  // Enforce HTTPS (safe even behind load balancer if terminated properly)
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  )

  // Prevent caching of sensitive data
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  )
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')

  // Disable DNS prefetch
  res.setHeader('X-DNS-Prefetch-Control', 'off')

  // Disable file download execution in IE
  res.setHeader('X-Download-Options', 'noopen')

  // Restrict powerful browser features (safe defaults)
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=()'
  )

  next()
}
EOF

# -------------------------
# Patch main.ts
# -------------------------
cat <<EOF > src/main.ts
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { helmetMiddleware } from './security/helmet.config'
import { securityHeaders } from './security/headers.middleware'
import { closeMongo } from './shared/db/mongo.client'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Helmet protections
  app.use(helmetMiddleware())

  // Extra security headers
  app.use(securityHeaders)

  // Graceful shutdown
  const shutdown = async () => {
    await closeMongo()
    process.exit(0)
  }

  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)

  await app.listen(3000)
}
bootstrap()
EOF

echo "✅ Additional security headers enabled."
echo "👉 Restart server: npm run start:dev"
