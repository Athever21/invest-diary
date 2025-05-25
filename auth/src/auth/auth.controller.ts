import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserLogin } from "./auth.model.";
import { Request, Response } from "express";

@Controller({ path: '/auth' })
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/login')
    async login(@Body() userLogin: UserLogin, @Res() res: Response) {
        const [accessToken, refreshToken, tokenPayload] = await this.authService.login(userLogin);

        return res
            .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
            .json({ success: 'ok', accessToken, tokenPayload });
    }

    @Post('/refresh_token')
    async refreshToken(@Req() req: Request) {
        const [accessToken, tokenPayload] = await this.authService.refreshToken(req);

        return { success: 'ok', accessToken, tokenPayload };
    }

    @Post('/logout')
    async logout(@Res() res: Response) {
        return res
            .cookie('refreshToken', null, { httpOnly: true, sameSite: 'strict', maxAge: 0 })
            .json({ success: 'ok' })
    }
}