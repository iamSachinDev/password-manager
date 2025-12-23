#!/bin/bash
set -e

echo "🚀 Setting up MongoDB (Native Driver) for NestJS..."

# ---------- ENV ----------
cat <<EOF > .env.example
NODE_ENV=development
PORT=3000

MONGO_URI=mongodb://localhost:27017
MONGO_DB=password_manager
EOF

# ---------- CONFIG ----------
mkdir -p src/config
cat <<EOF > src/config/env.ts
export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 3000),

  mongo: {
    uri: process.env.MONGO_URI || '',
    db: process.env.MONGO_DB || '',
  },
}
EOF

# ---------- SHARED DB ----------
mkdir -p src/shared/db

cat <<EOF > src/shared/db/mongo.client.ts
import { MongoClient, Db } from 'mongodb'
import { env } from '../../config/env'

let client: MongoClient | null = null
let db: Db | null = null

export async function connectMongo(): Promise<Db> {
  if (db) return db

  if (!env.mongo.uri || !env.mongo.db) {
    throw new Error('Mongo environment variables not set')
  }

  client = new MongoClient(env.mongo.uri)
  await client.connect()

  db = client.db(env.mongo.db)
  return db
}

export function getDb(): Db {
  if (!db) {
    throw new Error('MongoDB not initialized')
  }
  return db
}

export async function closeMongo(): Promise<void> {
  if (client) {
    await client.close()
  }
}
EOF

cat <<EOF > src/shared/db/mongo.module.ts
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
EOF

# ---------- APP MODULE PATCH ----------
cat <<EOF > src/app.module.ts
import { Module } from '@nestjs/common'
import { MongoModule } from './shared/db/mongo.module'

@Module({
  imports: [MongoModule],
})
export class AppModule {}
EOF

# ---------- MAIN PATCH ----------
cat <<EOF > src/main.ts
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { closeMongo } from './shared/db/mongo.client'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

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

# ---------- SAMPLE USER REPO ----------
mkdir -p src/modules/user/domain
mkdir -p src/modules/user

cat <<EOF > src/modules/user/domain/user.entity.ts
export type User = {
  id: string
  email: string
  passwordHash: string
  createdAt: Date
}
EOF

cat <<EOF > src/modules/user/user.repository.ts
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
EOF

echo "✅ MongoDB native setup completed successfully."
echo "👉 Run: npm run start:dev"

