import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { usersSerivce } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [usersSerivce]
})
export class UsersModule {}