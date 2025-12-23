import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { Db } from 'mongodb'
import { Inject, Injectable } from '@nestjs/common'
import { RegisterDTO } from './dto/auth.register.schema'

@Injectable()
export class AuthService {
    constructor(@Inject('MONGO_DB') private db: Db) { }

    async register(dto: RegisterDTO) {
        const exists = await this.db.collection('users').findOne({ email: dto.email })
        if (exists) throw new Error('User already exists')

        const userId = crypto.randomUUID()

        await this.db.collection('users').insertOne({
            _id: userId as any,
            email: dto.email,
            passwordHash: dto.passwordHash,
            createdAt: new Date(),
        })

        await this.db.collection('vaults').insertOne({
            userId,
            kdf: dto.kdf,
            vault: dto.encryptedVault,
            updatedAt: new Date(),
        })

        return { userId }
    }

    async login(email: string, password: string) {
        const user = await this.db.collection('users').findOne({ email })
        if (!user) throw new Error('Invalid credentials')

        const ok = await bcrypt.compare(password, user.passwordHash)
        if (!ok) throw new Error('Invalid credentials')

        const token = jwt.sign(
            { sub: user._id },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' },
        )

        return { accessToken: token }
    }

    async getKdf(userId: string) {
        const vault = await this.db.collection('vaults').findOne({ userId })
        if (!vault) throw new Error('User vault not found')
        return vault.kdf
    }
}
