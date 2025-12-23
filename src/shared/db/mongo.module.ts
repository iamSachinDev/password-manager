import { Module, Global } from '@nestjs/common'
import { connectMongo } from './mongo.client'

@Global()
@Module({
  providers: [
    {
      provide: 'MONGO_DB',
      useFactory: async () => connectMongo(),
    },
  ],
  exports: ['MONGO_DB'],
})
export class MongoModule {}
