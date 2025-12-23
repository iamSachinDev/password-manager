import { Module } from '@nestjs/common'
import { MongoModule } from './shared/db/mongo.module'
import { HealthModule } from './modules/health/health.module'

@Module({
  imports: [MongoModule, HealthModule],
})
export class AppModule { }
