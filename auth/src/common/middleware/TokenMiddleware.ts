import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class TokenMiddleware implements NestMiddleware {
    use(req: Request, res: any, next: (error?: any) => void) {
        
        next();
    }
}