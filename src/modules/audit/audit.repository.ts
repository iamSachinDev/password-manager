import { Inject, Injectable } from '@nestjs/common'
import { Db } from 'mongodb'
import { AuditEventType } from './audit.types'

@Injectable()
export class AuditRepository {
  constructor(@Inject('MONGO_DB') private readonly db: Db) {}

  async log(
    userId: string | null,
    event: AuditEventType,
    metadata: Record<string, any> = {},
  ) {
    await this.db.collection('audit_logs').insertOne({
      userId,
      event,
      metadata,
      createdAt: new Date(),
    })
  }
}
