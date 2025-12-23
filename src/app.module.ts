import { Module } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'
import { MongoModule } from './shared/db/mongo.module'
import { HealthModule } from './modules/health/health.module'

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined,
        redact: {
          paths: ['req.headers.authorization', 'req.body.password', 'req.body.confirmPassword', 'req.body.token', 'req.body.oldPassword', 'req.body.newPassword'],
          censor: '[Redacted]',
        },
      },
    }),
    MongoModule,
    HealthModule,
  ],
})
export class AppModule { }
