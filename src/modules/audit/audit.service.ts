import { Injectable } from '@nestjs/common'
import { AuditRepository } from './audit.repository'
import { AuditEventType } from './audit.types'

@Injectable()
export class AuditService {
  constructor(private readonly repo: AuditRepository) {}

  log(
    userId: string | null,
    event: AuditEventType,
    metadata?: Record<string, any>,
  ) {
    // 🚫 NEVER log secrets, vaults, passwords
    return this.repo.log(userId, event, metadata)
  }
}
