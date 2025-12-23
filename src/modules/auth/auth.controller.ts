import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterSchema } from './dto/auth.register.schema'

@Controller('auth')
export class AuthController {
    constructor(private readonly auth: AuthService) { }

    @Post('register')
    async register(@Body() body: unknown) {
        const dto = RegisterSchema.parse(body)
        return this.auth.register(dto)
    }

    @Post('login')
    async login(@Body() body: any) {
        return this.auth.login(body.email, body.password)
    }

    @Get('kdf')
    async kdf(@Req() req: any) {
        return this.auth.getKdf(req.userId)
    }
}
