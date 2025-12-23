export const argon2Config = {
    type: process.env.ARGON2_TYPE || 'argon2id',

    memoryCost: Number(process.env.ARGON2_MEMORY || 65536),
    timeCost: Number(process.env.ARGON2_ITERATIONS || 3),
    parallelism: Number(process.env.ARGON2_PARALLELISM || 1),

    keyLength: Number(process.env.ARGON2_KEY_LENGTH || 32),
    saltLength: Number(process.env.ARGON2_SALT_LENGTH || 16),
}
