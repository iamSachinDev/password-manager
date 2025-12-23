import { randomBytes, createCipheriv, createDecipheriv, CipherGCM, DecipherGCM } from 'crypto'
import { cryptoConfig } from '../../config/crypto.config'

export type EncryptedPayload = {
  version: string
  algorithm: string
  iv: string
  authTag: string
  ciphertext: string
}

export class CryptoService {
  static encrypt(
    plaintext: string,
    key: Buffer,
  ): EncryptedPayload {
    if (key.length !== cryptoConfig.keyLength) {
      throw new Error('Invalid key length')
    }

    const iv = randomBytes(cryptoConfig.ivLength)
    const cipher = createCipheriv(
      cryptoConfig.algorithm,
      key,
      iv,
    )

    const encrypted = Buffer.concat([
      cipher.update(plaintext, 'utf8'),
      cipher.final(),
    ])

    const authTag = (cipher as CipherGCM).getAuthTag()

    return {
      version: cryptoConfig.version,
      algorithm: cryptoConfig.algorithm,
      iv: iv.toString('base64'),
      authTag: authTag.toString('base64'),
      ciphertext: encrypted.toString('base64'),
    }
  }

  static decrypt(
    payload: EncryptedPayload,
    key: Buffer,
  ): string {
    if (payload.version !== cryptoConfig.version) {
      throw new Error('Unsupported crypto version')
    }

    const iv = Buffer.from(payload.iv, 'base64')
    const authTag = Buffer.from(payload.authTag, 'base64')
    const ciphertext = Buffer.from(payload.ciphertext, 'base64')

    const decipher = createDecipheriv(
      payload.algorithm,
      key,
      iv,
    )

      ; (decipher as DecipherGCM).setAuthTag(authTag)

    const decrypted = Buffer.concat([
      decipher.update(ciphertext),
      decipher.final(),
    ])

    return decrypted.toString('utf8')
  }
}
