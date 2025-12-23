import { Body, Controller, Get, Put, Req } from '@nestjs/common'
import { Db } from 'mongodb'
import { Inject } from '@nestjs/common'
import { EncryptedPayloadSchema } from '../../shared/zod/encrypted-payload.schema'

@Controller('vault')
export class VaultController {
    constructor(@Inject('MONGO_DB') private db: Db) { }

    @Get()
    async get(@Req() req: any) {
        const record = await this.db.collection('vaults').findOne({ userId: req.userId })
        if (!record) {
            throw new Error('Vault not found')
        }
        return record.vault
    }

    @Put()
    async update(@Req() req: any, @Body() body: unknown) {
        const vault = EncryptedPayloadSchema.parse(body)

        await this.db.collection('vaults').updateOne(
            { userId: req.userId },
            { $set: { vault, updatedAt: new Date() } },
        )

        return { status: 'updated' }
    }
}

