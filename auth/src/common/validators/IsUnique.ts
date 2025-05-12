import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { EntityManager } from "typeorm";

@ValidatorConstraint({ name: "IsUnique", async: true})
@Injectable()
export class IsUnique implements ValidatorConstraintInterface {
    constructor(private readonly entityManager: EntityManager) {}

    async validate(value: any, args?: ValidationArguments) {
        const [tableName, column] = args?.constraints as string[];

        const dataExists = await this.entityManager
            .getRepository(tableName)
            .createQueryBuilder(tableName)
            .where({ [column]: value })
            .getExists();

        return !dataExists;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        const value = validationArguments?.value;
        const [_, field, object] = validationArguments?.constraints as string[];
        
        return `${object} with ${field} ${value} already exists`;
    }
}