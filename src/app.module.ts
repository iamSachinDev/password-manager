import { Module } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'
import { MongoModule } from './shared/db/mongo.module'
import { HealthModule } from './modules/health/health.module'

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined,
      },
    }),
    MongoModule,
    HealthModule,
  ],
})
export class AppModule { }
