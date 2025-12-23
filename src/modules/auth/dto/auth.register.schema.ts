import { z } from 'zod'
import { EncryptedPayloadSchema } from '../../../shared/zod/encrypted-payload.schema'

export const RegisterSchema = z.object({
    email: z.string().email(),
    passwordHash: z.string(),
    kdf: z.object({
        salt: z.string(),
        memoryCost: z.number(),
        timeCost: z.number(),
        parallelism: z.number(),
        keyLength: z.number(),
    }),
    encryptedVault: EncryptedPayloadSchema,
})

export type RegisterDTO = z.infer<typeof RegisterSchema>
