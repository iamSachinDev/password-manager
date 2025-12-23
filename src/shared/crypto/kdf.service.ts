import * as argon2 from 'argon2'
import { randomBytes } from 'crypto'
import { argon2Config } from '../../config/argon2.config'

export type KdfParams = {
    salt: string
    memoryCost: number
    timeCost: number
    parallelism: number
    keyLength: number
}

export class KdfService {
    /**
     * Generate a new salt + params (run during registration)
     */
    static generateParams(): KdfParams {
        const salt = randomBytes(argon2Config.saltLength)

        return {
            salt: salt.toString('base64'),
            memoryCost: argon2Config.memoryCost,
            timeCost: argon2Config.timeCost,
            parallelism: argon2Config.parallelism,
            keyLength: argon2Config.keyLength,
        }
    }

    /**
     * Derive encryption key from master password
     */
    static async deriveKey(
        masterPassword: string,
        params: KdfParams,
    ): Promise<Buffer> {
        const salt = Buffer.from(params.salt, 'base64')

        const key = await argon2.hash(masterPassword, {
            type: argon2.argon2id,
            memoryCost: params.memoryCost,
            timeCost: params.timeCost,
            parallelism: params.parallelism,
            hashLength: params.keyLength,
            salt,
            raw: true,
        })

        return Buffer.from(key)
    }
}
