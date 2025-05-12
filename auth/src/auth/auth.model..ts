import { IsNotEmpty } from "class-validator";

export class UserLogin {
    @IsNotEmpty()
    login: string;

    @IsNotEmpty()
    password: string;
}