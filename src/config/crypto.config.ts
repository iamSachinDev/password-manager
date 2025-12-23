export const cryptoConfig = {
    version: process.env.CRYPTO_VERSION as 'v1',
  
    algorithm: process.env.CRYPTO_ALGORITHM || 'aes-256-gcm',
  
    keyLength: Number(process.env.CRYPTO_KEY_LENGTH || 32),
  
    ivLength: Number(process.env.CRYPTO_IV_LENGTH || 12),
  }
  