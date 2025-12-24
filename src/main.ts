import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Logger } from 'nestjs-pino'
import * as figlet from 'figlet'
import chalk from 'chalk'
import { AppModule } from './app.module'
import { helmetMiddleware } from './security/helmet.config'
import { securityHeaders } from './security/headers.middleware'
import { closeMongo } from './shared/db/mongo.client'
import { env } from './config/env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })
  app.useLogger(app.get(Logger))

  // Helmet protections
  app.use(helmetMiddleware())

  // Extra security headers
  app.use(securityHeaders)

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Password Manager API')
    .setDescription('Secure Password Manager API')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  // Graceful shutdown
  const shutdown = async () => {
    await closeMongo()
    process.exit(0)
  }

  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)

  await app.listen(env.port, '0.0.0.0')
  const url = await app.getUrl()

  const banner = figlet.textSync('Password Manager', { font: 'Big' })
  console.log(chalk.cyan(banner))
  console.log(chalk.green(`🚀 Server is running on ${url}`))
  console.log(chalk.blue(`📚 Swagger UI: ${url}/api`))
  console.log(chalk.yellow(`🩺 Health Check: ${url}/health`))
}
bootstrap()
