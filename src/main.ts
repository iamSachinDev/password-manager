import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import { Logger } from 'nestjs-pino'
import * as figlet from 'figlet'
import chalk from 'chalk'
import { AppModule } from './app.module'
import { helmetMiddleware } from './security/helmet.config'
import { securityHeaders } from './security/headers.middleware'
import { closeMongo } from './shared/db/mongo.client'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })
  app.useLogger(app.get(Logger))

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

  const banner = figlet.textSync('Password Manager', { font: 'Big' })
  console.log(chalk.cyan(banner))
  console.log(chalk.green('🚀 Server is running on http://localhost:3000'))
  console.log(chalk.blue('📚 Swagger UI: http://localhost:3000/api'))
  console.log(chalk.yellow('🩺 Health Check: http://localhost:3000/health'))
}
bootstrap()
