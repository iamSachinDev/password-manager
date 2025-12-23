import { Injectable, Inject } from '@nestjs/common'
import { Db } from 'mongodb'
import { User } from './domain/user.entity'

@Injectable()
export class UserRepository {
  constructor(
    @Inject('MONGO_DB') private readonly db: Db,
  ) {}

  private collection() {
    return this.db.collection<User>('users')
  }

  async findById(id: string): Promise<User | null> {
    return this.collection().findOne({ id })
  }

  async create(user: User): Promise<void> {
    await this.collection().insertOne(user)
  }
}
