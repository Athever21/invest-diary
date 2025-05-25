import { BadRequestException, ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";
import { Repository } from "typeorm";
import { UserLogin } from "./auth.model.";
import * as argon2 from "argon2";
import * as jwt from 'jsonwebtoken';
import { Request } from "express";
import { RabbitRPC } from "@golevelup/nestjs-rabbitmq";
import { Payload } from "@nestjs/microservices";
import { UsersSerivce } from "src/users/users.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @Inject() private readonly usersService: UsersSerivce,
        @Inject(CACHE_MANAGER) private readonly cache: Cache
    ) { }

    public async login(userLogin: UserLogin) {
        const user = await this.getUserForLogin(userLogin);

        const tokenPayload = {
            username: user.username
        };

        const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        const refreshToken = jwt.sign(tokenPayload, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '1d' });

        return [accessToken, refreshToken, tokenPayload];
    }

    public async refreshToken(req: Request) {
        const refreshToken = req.cookies['refreshToken'];

        if (!refreshToken) throw new ForbiddenException("Invalid token");

        try {
            const tokenVerify = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string);

            if (!tokenVerify) throw new ForbiddenException("Invalid token");

            const tokenPayload = {
                username: (tokenVerify as any).username
            }

            const accessToken = jwt.sign(tokenPayload as any, process.env.JWT_SECRET as string, { expiresIn: '1h' });

            return [accessToken, tokenPayload];
        } catch (err) {
            throw new ForbiddenException("Invalid token");
        }
    }

    @RabbitRPC({
        exchange: 'auth',
        routingKey: 'auth.verify',
        queue: 'auth'
    })
    async verify_token(@Payload() { token }: { token: string }) {
        const user = await this.verifyAccessToken(token);

        return { user };
    }

    private async verifyAccessToken(token: string) {
        try {
            const tokenPayload = jwt.verify(token, process.env.JWT_SECRET as string) as any;

            if (!tokenPayload) return null;

            const username = tokenPayload.username;
            const cacheKey = `user-${username}`;    
            
            const cachedUser = await this.cache.get(cacheKey);
            if (cachedUser) return cachedUser;
             
            const user = await this.usersService.getUserByUsername(username);
            await this.cache.set(cacheKey, user);
        } catch (err) {
            return null;
        }
    }

    private async getUserForLogin(userLogin: UserLogin) {
        const user = await this.userRepository.findOneBy({ username: userLogin.login });

        if (!user) throw new BadRequestException("User doesn't exists");

        const verify = await argon2.verify(user.password, userLogin.password);

        if (!verify) throw new BadRequestException("User doesn't exists");

        return user;
    }
}