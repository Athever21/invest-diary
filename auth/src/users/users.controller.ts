import { Controller, Body, Post  } from "@nestjs/common";
import { UsersSerivce } from "./users.service";
import { UserCreate } from "./users.model";

@Controller({
    path: '/user'
})
export class UsersController {
    constructor(private readonly usersSerivce: UsersSerivce) {}

    @Post()
    async register(@Body() userCreate: UserCreate) {
        await this.usersSerivce.register(userCreate);
        
        return { status: "success" };
    }
}
