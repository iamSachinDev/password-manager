import { z } from 'zod'

export const EncryptedPayloadSchema = z.object({
    version: z.string(),
    algorithm: z.string(),
    iv: z.string(),
    authTag: z.string(),
    ciphertext: z.string(),
})

export type EncryptedPayload = z.infer<typeof EncryptedPayloadSchema>
