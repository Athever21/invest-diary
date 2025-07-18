import { BadRequestException, Injectable } from "@nestjs/common";
import { UserCreate } from "./users.model";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import * as argon2 from "argon2";

@Injectable()
export class UsersSerivce {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

    public async register(userCreate: UserCreate) {
        const newUser = this.usersRepository.create();
        const hashedPassword = await argon2.hash(userCreate.password);

        newUser.username = userCreate.login;
        newUser.password = hashedPassword;

        const user = await this.usersRepository.save(newUser);

        return user;
    }

    public async getUserByUsername(username: string) {
        const user = await this.usersRepository.findOneBy({ username });

        if (!user) return null;

        return {
            userId: user.id,
            username: user.username
        }
    }
}