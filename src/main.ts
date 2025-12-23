import 'dotenv/config'
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
