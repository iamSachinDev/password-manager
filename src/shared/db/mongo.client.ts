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
