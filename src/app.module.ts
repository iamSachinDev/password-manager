import { Module } from '@nestjs/common'
import { MongoModule } from './shared/db/mongo.module'

@Module({
  imports: [MongoModule],
})
export class AppModule {}
