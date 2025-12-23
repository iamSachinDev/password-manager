#!/bin/bash
set -e

echo "🛡️ Installing and configuring Helmet..."

# -------------------------
# Install dependencies
# -------------------------
npm install helmet

# -------------------------
# Create helmet config
# -------------------------
mkdir -p src/security

cat <<EOF > src/security/helmet.config.ts
import helmet from 'helmet'

export function helmetMiddleware() {
  return helmet({
    // Prevent MIME sniffing
    noSniff: true,

    // Prevent clickjacking
    frameguard: { action: 'deny' },

    // Hide X-Powered-By
    hidePoweredBy: true,

    // XSS protection (still useful with modern browsers)
    xssFilter: true,

    // Referrer policy
    referrerPolicy: { policy: 'no-referrer' },

    // Content Security Policy
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'none'"],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'"],
        imgSrc: ["'self'"],
        styleSrc: ["'self'"],
        baseUri: ["'none'"],
        frameAncestors: ["'none'"],
      },
    },
  })
}
EOF

# -------------------------
# Patch main.ts
# -------------------------
cat <<EOF > src/main.ts
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { helmetMiddleware } from './security/helmet.config'
import { closeMongo } from './shared/db/mongo.client'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Helmet security headers
  app.use(helmetMiddleware())

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

echo "✅ Helmet configured successfully."
echo "👉 Run: npm run start:dev"
