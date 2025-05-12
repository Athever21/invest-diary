import { IsNotEmpty, Validate } from "class-validator";
import { IsUnique } from "src/common/validators/IsUnique";

export class UserCreate {
    @IsNotEmpty()
    @Validate(IsUnique, ['user', 'username', 'User'])
    login: string

    @IsNotEmpty()
    password: string
}